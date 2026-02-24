"use server";

import { FormDataConsultation } from "@/schemas/schema-consultation";
import { createConsultation } from "@/services/consultation-service";
import { authOptions } from "@/shared/lib/auth";
import { InputJsonValue } from "@prisma/client/runtime/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createConsultationAction(data: FormDataConsultation) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Usuario no autenticado o ID inválido");
  }
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
