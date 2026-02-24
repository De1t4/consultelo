"use server";

import { FormDataConsultation } from "@/schemas/schema-consultation";
import { createConsultation } from "@/services/consultation-service";
import { authOptions } from "@/shared/lib/auth";
import { InputJsonValue } from "@prisma/client/runtime/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createConsultationAction(data: FormDataConsultation) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("User not authenticated or invalid ID");
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
}
