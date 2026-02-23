import { FormDataConsultation } from "@/schemas/schema-consultation";
import prisma from "@/shared/lib/prisma";
import {
  ResponseConsultDetail,
  ResponseConsultList,
} from "@/shared/types/response-consult";
import { InputJsonValue } from "@prisma/client/runtime/client";

export const createConsultation = async (
  data: FormDataConsultation,
  userId: string,
  body: InputJsonValue,
) => {
  return await prisma.consultation.create({
    data: {
      title: data.title,
      body: body,
      categories: data.categories,
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

export const getMyConsultations = async (userId: string) => {
  const res: ResponseConsultList[] = await prisma.consultation.findMany({
    where: {
      userId: userId,
    },
    include: {
      settings: true,
    },
  });

  return res;
};

export const getConsultationById = async (id: string) => {
  const res = await prisma.consultation.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      settings: true,
      comments: true,
    },
  });
  return res as ResponseConsultDetail;
};
