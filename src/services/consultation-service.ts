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

export const deleteConsultation = async (idConsultation: string) => {
  return await prisma.consultation.delete({
    where: {
      id: idConsultation,
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
          authorName: true,
          message: true,
          createdAt: true,
          userId: true,
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return res as ResponseConsultDetail;
};

export const getPublicConsultations = async () => {
  const res: ResponseConsultList[] = await prisma.consultation.findMany({
    where: {
      settings: {
        privacy: "public",
      },
      status: "active",
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
    take: 6,
  });

  return res;
};

export const getUserStats = async (userId: string) => {
  const [activeConsultations, totalComments] = await Promise.all([
    prisma.consultation.count({
      where: {
        userId: userId,
        status: "active",
      },
    }),
    prisma.comment.count({
      where: {
        consultation: {
          userId: userId,
        },
      },
    }),
  ]);

  return {
    activeConsultations,
    totalResponses: totalComments,
    communityImpact: "Top 10%",
  };
};
