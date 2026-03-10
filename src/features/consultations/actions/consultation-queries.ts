"use server";

import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/utils/execution-action-db";
import { isValidId } from "@/shared/utils/validates";
import { getServerSession } from "next-auth";
import {
  getConsultationById,
  getMyConsultations,
  getPublicConsultations,
  getUserStats,
} from "../services/consultation-service";

export async function getMyConsultationsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      data: null,
      error: "User not authenticated",
      success: false as const,
    };
  }
  return await executeAction({
    actionFn: async () => await getMyConsultations(session.user.id),
  });
}

export async function getConsultationByIdAction(idConsultation: string) {
  return await executeAction({
    actionFn: async () => {
      if (!isValidId(idConsultation)) {
        throw new Error("The consultation ID format is invalid.");
      }
      return await getConsultationById(idConsultation);
    },
  });
}

export async function getPublicConsultationsAction() {
  return await executeAction({
    actionFn: async () => await getPublicConsultations(),
  });
}

export async function getUserStatsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      data: null,
      error: "User not authenticated",
      success: false as const,
    };
  }
  return await executeAction({
    actionFn: async () => await getUserStats(session.user.id),
  });
}
