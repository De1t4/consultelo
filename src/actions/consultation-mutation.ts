"use server";

import { FormDataConsultation } from "@/schemas/schema-consultation";
import {
  createConsultation,
  deleteConsultation,
  getConsultationById,
} from "@/services/consultation-service";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/types/executionAction";
import { isValidId } from "@/shared/utils/validates";
import { InputJsonValue } from "@prisma/client/runtime/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createConsultationAction(data: FormDataConsultation) {
  return await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        throw new Error("User not authenticated");
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
          "There was an error processing your request. Please try again.",
        );
      }
    },
  });
}

export async function deleteConsultationAction(idConsultation: string) {
  return await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        throw new Error("User not authenticated");
      }

      if (!idConsultation) {
        throw new Error("No consultation ID was provided.");
      }

      isValidId(idConsultation);

      const getConsultation = await getConsultationById(idConsultation);

      if (!getConsultation) {
        throw new Error("Consultation not found.");
      }

      if (getConsultation.userId !== session.user.id) {
        throw new Error("You are not authorized to delete this consultation.");
      }

      await deleteConsultation(idConsultation);
      revalidatePath("/my-consultations");
      return {
        success: true,
      };
    },
  });
}
