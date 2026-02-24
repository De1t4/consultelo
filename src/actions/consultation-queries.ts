"use server";

import {
  getConsultationById,
  getMyConsultations,
} from "@/services/consultation-service";
import { authOptions } from "@/shared/lib/auth";
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

export async function getConsultationByIdAction(id: string) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    throw new Error("The consultation ID format is invalid.");
  }

  try {
    const consultation = await getConsultationById(id);
    return consultation;
  } catch (error) {
    console.error("Error getting consultation:", error);
    throw new Error("Could not retrieve the consultation.");
  }
}
