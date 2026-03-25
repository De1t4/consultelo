"use server";

import {
  STATUS_CODE,
  STATUS_MESSAGE,
} from "@/shared/constants/status-response";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/utils/execution-action-db";
import { isValidId } from "@/shared/utils/validates";
import { InputJsonValue } from "@prisma/client/runtime/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { FormDataConsultation } from "../schemas/schema-consultation";
import {
  createConsultation,
  deleteConsultation,
  updateConsultation,
} from "../services/consultation-mutations";
import {
  getActiveConsultationsCount,
  getConsultationById,
  getUserStats,
} from "../services/consultation-queries";

const MAX_CONSULTATIONS = 5;

export async function createConsultationAction(data: FormDataConsultation) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return {
      data: null,
      error: STATUS_MESSAGE.UNAUTHORIZED,
      success: false as const,
      status: STATUS_CODE.UNAUTHORIZED,
    };
  }

  const countConsultations = await getUserStats(userId);

  if (countConsultations.activeConsultations >= MAX_CONSULTATIONS) {
    return {
      data: null,
      error: `You have reached the maximum number of consultations allowed. (${MAX_CONSULTATIONS})`,
      success: false as const,
      status: STATUS_CODE.LIMIT_CONSULTATIONS,
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
        throw new Error(STATUS_MESSAGE.UNAUTHORIZED);
      }

      if (!idConsultation) {
        throw new Error(STATUS_MESSAGE.BAD_REQUEST);
      }

      if (!isValidId(idConsultation)) {
        throw new Error(STATUS_MESSAGE.VALIDATION_ERROR);
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
        throw new Error(STATUS_MESSAGE.UNAUTHORIZED);
      }

      if (!idConsultation) {
        throw new Error(STATUS_MESSAGE.BAD_REQUEST);
      }

      if (!isValidId(idConsultation)) {
        throw new Error(STATUS_MESSAGE.VALIDATION_ERROR);
      }

      const activeConsultationsCount =
        await getActiveConsultationsCount(userId);

      const consultation = await checkConsultationOwner(idConsultation, userId);

      if (
        activeConsultationsCount >= MAX_CONSULTATIONS &&
        data.status === "active" &&
        consultation.status !== "active"
      ) {
        throw new Error(
          `You have reached the maximum number of active consultations allowed. (${MAX_CONSULTATIONS})`,
        );
      }

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
    throw new Error(STATUS_MESSAGE.NOT_FOUND);
  }

  if (getConsultation.userId !== userId) {
    throw new Error(STATUS_MESSAGE.FORBIDDEN);
  }

  return getConsultation;
};
