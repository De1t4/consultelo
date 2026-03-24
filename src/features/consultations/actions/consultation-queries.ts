"use server";

import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/utils/execution-action-db";
import { isValidId } from "@/shared/utils/validates";
import { getServerSession } from "next-auth";
import { STATUS_MESSAGE } from "@/shared/constants/status-response";
import {
  getConsultationById,
  getMyConsultations,
  getPublicConsultations,
  getRelatedConsultations,
  getUserStats,
} from "../services/consultation-queries";

export async function getMyConsultationsAction() {
  return await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        throw new Error(STATUS_MESSAGE.UNAUTHORIZED);
      }
      return await getMyConsultations(session.user.id);
    },
  });
}

export async function getConsultationByIdAction(idConsultation: string) {
  return await executeAction({
    actionFn: async () => {
      if (!isValidId(idConsultation)) {
        throw new Error(STATUS_MESSAGE.VALIDATION_ERROR);
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
  return await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        throw new Error(STATUS_MESSAGE.UNAUTHORIZED);
      }
      return await getUserStats(session.user.id);
    },
  });
}

interface RelatedConsultation {
  idConsultation: string;
  idUser: string;
  category: string;
}

export async function getRelatedConsultationsAction(
  relatedConsultation: RelatedConsultation,
) {
  return await executeAction({
    actionFn: async () => {
      if (!isValidId(relatedConsultation.idConsultation)) {
        throw new Error(STATUS_MESSAGE.VALIDATION_ERROR);
      }
      return await getRelatedConsultations(relatedConsultation);
    },
  });
}
