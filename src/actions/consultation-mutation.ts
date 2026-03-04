"use server";

import { FormDataConsultation } from "@/schemas/schema-consultation";
import {
  createConsultation,
  deleteConsultation,
  getConsultationById,
} from "@/services/consultation-service";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/utils/execution-action-db";
import { isValidId } from "@/shared/utils/validates";
import { InputJsonValue } from "@prisma/client/runtime/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createConsultationAction(data: FormDataConsultation) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated or session expired");
  }

  const bodyParsed: InputJsonValue = JSON.parse(data.body);

  const consultation = await executeAction({
    actionFn: async () => {
      return await createConsultation(data, userId, bodyParsed);
    },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    consultationId: consultation.id,
    title: consultation.title,
  };
}

export async function deleteConsultationAction(idConsultation: string) {
  return await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      const userId = session?.user?.id;
      if (!userId) {
        throw new Error("User not authenticated or session expired");
      }

      if (!idConsultation) {
        throw new Error("No consultation ID was provided.");
      }

      if (!isValidId(idConsultation)) {
        throw new Error("The consultation ID format is invalid.");
      }

      await checkConsultationOwner(idConsultation, userId);

      await deleteConsultation(idConsultation);

      revalidatePath("/my-consultations");
    },
  });
}

const checkConsultationOwner = async (
  idConsultation: string,
  userId: string,
) => {
  const getConsultation = await getConsultationById(idConsultation);

  if (!getConsultation) {
    throw new Error("Consultation not found.");
  }

  if (getConsultation.userId !== userId) {
    throw new Error("You are not authorized to delete this consultation.");
  }
};
