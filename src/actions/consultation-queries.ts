"use server";

import {
  getConsultationById,
  getMyConsultations,
  getPublicConsultations,
  getUserStats,
} from "@/services/consultation-service";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/utils/execution-action-db";
import { ResponseConsultDetail } from "@/shared/types/response-consult";
import { isValidId } from "@/shared/utils/validates";
import { getServerSession } from "next-auth";

export async function getMyConsultationsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("User not authenticated or invalid ID");
  }
  try {
    return await getMyConsultations(session.user.id);
  } catch (error) {
    console.error("Error getting consultations:", error);
    throw new Error("Could not load your consultations.");
  }
}

export async function getConsultationByIdAction(
  id: string,
): Promise<ResponseConsultDetail | null> {
  return await executeAction({
    actionFn: async () => {
      isValidId(id);
      const consultation = await getConsultationById(id);
      return consultation;
    },
  });
}

export async function getPublicConsultationsAction() {
  try {
    const consultations = await getPublicConsultations();
    return consultations;
  } catch (error) {
    console.error("Error getting public consultations:", error);
    throw new Error("Could not load public consultations.");
  }
}

export async function getUserStatsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  try {
    return await getUserStats(session.user.id);
  } catch (error) {
    console.error("Error getting user stats:", error);
    throw new Error("Could not load your statistics.");
  }
}
