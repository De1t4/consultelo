"use server";

import { FormDataConsultation } from "@/schemas/schema-consultation";
import {
  createConsultation,
  getMyConsultations,
} from "@/services/consultation-service";
import { authOptions } from "@/shared/lib/auth";
import { JsonValue } from "@prisma/client/runtime/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

function validateBody(body: string) {
  try {
    const parsed: JsonValue = JSON.parse(body);
    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("El cuerpo no es un objeto JSON válido");
    }
    return parsed;
  } catch (error) {
    console.error("Error al parsear el JSON de Tiptap", error);
    throw new Error("El cuerpo no es un objeto JSON válido");
  }
}

export async function createConsultationAction(data: FormDataConsultation) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Usuario no autenticado o ID inválido");
  }
  const bodyObj = validateBody(data.body);

  try {
    // Esto asegura que si falla settings, NO se crea la consulta
    const consultation = await createConsultation(
      data,
      session.user.id,
      bodyObj,
    );
    revalidatePath(`/consultation/${consultation.id}`);
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
    const consultations = await getMyConsultations(session.user.id);
    return consultations;
  } catch (error) {
    console.error("Error getting consultations:", error);
    throw new Error(
      "Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.",
    );
  }
}
