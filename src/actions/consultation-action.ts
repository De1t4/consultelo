"use server";

import { FormDataConsultation } from "@/schemas/schema-consultation";
import {
  createConsultation,
  getConsultationById,
  getMyConsultations,
} from "@/services/consultation-service";
import { authOptions } from "@/shared/lib/auth";
import { InputJsonValue } from "@prisma/client/runtime/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createConsultationAction(data: FormDataConsultation) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Usuario no autenticado o ID inválido");
  }

  // Ahora el body está validado por Zod antes de llegar aquí,
  // pero lo parseamos para Prisma
  const bodyParsed: InputJsonValue = JSON.parse(data.body);

  try {
    const consultation = await createConsultation(
      data,
      session.user.id,
      bodyParsed,
    );
    revalidatePath("/dashboard");
    return {
      success: true,
      consultationId: consultation.id,
      title: consultation.title,
    };
  } catch (error) {
    console.error("Error creating consultation:", error);
    throw new Error(
      "Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.",
    );
  }
}

export async function getMyConsultationsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Usuario no autenticado o ID inválido");
  }
  try {
    return await getMyConsultations(session.user.id);
  } catch (error) {
    console.error("Error getting consultations:", error);
    throw new Error("No se pudieron cargar tus consultas.");
  }
}

export async function getConsultationByIdAction(id: string) {
  try {
    return await getConsultationById(id);
  } catch (error) {
    console.error("Error getting consultation:", error);
    throw new Error("No se pudo cargar la consulta.");
  }
}
