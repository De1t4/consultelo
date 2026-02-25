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
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res;
};

export const getConsultationById = async (
  id: string,
): Promise<ResponseConsultDetail | null> => {
  const isExist = await prisma.consultation.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExist) {
    return isExist;
  }

  const res = await prisma.consultation.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
        },
      },
      settings: true,
      comments: {
        select: {
          id: true,
          message: true,
          createdAt: true,
          userId: true,
          authorName: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return res as ResponseConsultDetail;

  // } catch (error) {
  //   // If it's an error we already handled, rethrow it
  //   if (
  //     error instanceof Error &&
  //     (error.message.includes("does not exist") ||
  //       error.message.includes("is invalid"))
  //   ) {
  //     throw error;
  //   }

  //   throw new Error("An error occurred while processing your request.");
  // }
};
