import { ConsultationCreateInput } from "@/generated/prisma/models/Consultation";
import prisma from "@/shared/lib/prisma";

export const createConsultation = async (
  userId: string,
  data: ConsultationCreateInput,
) => {
  return await prisma.consultation.create({
    data: {
      title: data.title,
      body: data.body,
      categories: data.categories,
      userId: userId,
    },
  });
};
