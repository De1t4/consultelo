import { ConsultationCategory, ConsultationStatus } from "@/generated/prisma/enums";
import prisma from "@/shared/lib/prisma";
import { InputJsonValue } from "@prisma/client/runtime/client";
import "server-only";
import { FormDataConsultation } from "../schemas/schema-consultation";

export const createConsultation = async (
  data: FormDataConsultation,
  userId: string,
  body: InputJsonValue,
) => {
  return await prisma.consultation.create({
    data: {
      title: data.title,
      body: body,
      categories: data.categories as ConsultationCategory,
      userId: userId,
      settings: {
        create: {
          privacy: data.privacy,
          allowAnonymous: data.allowAnonymous,
          viewComments: data.viewComments,
        },
      },
    },
    include: {
      settings: true,
    },
  });
};

export const deleteConsultation = async (consultationId: string) => {
  return await prisma.consultation.delete({
    where: {
      id: consultationId,
    },
  });
};

export const updateConsultation = async (
  consultationId: string,
  data: FormDataConsultation,
  body: InputJsonValue,
) => {
  return await prisma.consultation.update({
    where: {
      id: consultationId,
    },
    data: {
      title: data.title,
      body: body,
      categories: data.categories as ConsultationCategory,
      status: data.status as ConsultationStatus,
      settings: {
        update: {
          privacy: data.privacy,
          allowAnonymous: data.allowAnonymous,
          viewComments: data.viewComments,
        },
      },
    },
  });
};
