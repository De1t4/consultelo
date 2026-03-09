"use server";

import { FormDataConsultation } from "../schemas/schema-consultation";
import {
  createConsultation,
  deleteConsultation,
  getConsultationById,
  updateConsultation,
} from "../services/consultation-service";
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
    return {
      data: null,
      error: "User not authenticated or session expired",
      success: false as const,
    };
  }

  const bodyParsed: InputJsonValue = JSON.parse(data.body);

  const res = await executeAction({
    actionFn: async () => {
      const consultation = await createConsultation(data, userId, bodyParsed);
      return {
        consultationId: consultation.id,
        title: consultation.title,
      };
    },
  });

  if (res.success) {
    revalidatePath("/dashboard");
  }
  return res;
}

export async function deleteConsultationAction(idConsultation: string) {
  const res = await executeAction({
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
    },
  });

  if (res.success) {
    revalidatePath("/my-consultations");
  }
  return res;
}

export async function updateConsultationAction(
  idConsultation: string,
  data: FormDataConsultation,
) {
  const res = await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      const userId = session?.user?.id;
      const bodyParsed: InputJsonValue = JSON.parse(data.body);

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

      await updateConsultation(idConsultation, data, bodyParsed);
    },
  });

  if (res.success) {
    revalidatePath("/my-consultations");
  }
  return res;
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
