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
    return { error: "Usuario no autenticado o ID inválido" };
  }
  try {
    return await getMyConsultations(session.user.id);
  } catch (error) {
    console.error("Error getting consultations:", error);
    return { error: "No se pudieron cargar tus consultas." };
  }
}

export async function getConsultationByIdAction(id: string) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    throw new Error("El formato del ID de la consulta no es válido.");
  }

  try {
    const consultation = await getConsultationById(id);
    return consultation;
  } catch (error) {
    console.error("Error getting consultation:", error);
    throw error;
  }
}
