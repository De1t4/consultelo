"use server";

import { FormDataConsultation } from "@/schemas/schema-consultation";
import { authOptions } from "@/shared/lib/auth";
import prisma from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

function validateBody(body: string) {
  try {
    const parsed = JSON.parse(body);
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
    const consultation = await prisma.$transaction(async (tx) => {
      // Crear Consulta
      const newConsultation = await tx.consultation.create({
        data: {
          title: data.title,
          body: bodyObj,
          categories: data.categories, // Asegúrate que data sea seguro
          userId: session.user.id,
        },
      });
      // Crear Settings asociados usando la misma transacción (tx)
      const settings = await tx.settings.create({
        data: {
          consultationId: newConsultation.id,
          privacy: data.privacy,
          allowAnonymous: data.allowAnonymous,
          viewComments: data.viewComments,
        },
      });

      await tx.consultation.update({
        where: {
          id: newConsultation.id,
        },
        data: {
          settingsId: settings.id,
        },
      });
      return newConsultation;
    });
    revalidatePath(`/consultation/${consultation.id}`);

    // Opcional: Retornar el objeto creado o un success: true
    return { success: true, consultationId: consultation.id };
  } catch (error) {
    console.error("Error creating consultation:", error);
    // 3. Manejo de errores seguro (no exponer error interno al cliente)
    throw new Error(
      "Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.",
    );
  }
}
