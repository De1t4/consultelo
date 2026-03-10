import "server-only";
import { z } from "zod";
import {
  ConsultationCategory,
  ConsultationStatus,
} from "@/generated/prisma/enums";
import { FormDataConsultation } from "../schemas/schema-consultation";
import prisma from "@/shared/lib/prisma";
import {
  ConsultationDetailDTO,
  ConsultationDetailSchema,
  ConsultationListDTO,
  ConsultationListSchema,
  UserStatsDTO,
  UserStatsSchema,
} from "../schemas/output-dto";
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

export const getMyConsultations = async (
  userId: string,
): Promise<ConsultationListDTO[]> => {
  const res = await prisma.consultation.findMany({
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

  return z.array(ConsultationListSchema).parse(res);
};

export const getConsultationById = async (
  id: string,
): Promise<ConsultationDetailDTO | null> => {
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

  if (!res) return null;
  return ConsultationDetailSchema.parse(res);
};

export const getPublicConsultations = async (): Promise<
  ConsultationListDTO[]
> => {
  const res = await prisma.consultation.findMany({
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

  return z.array(ConsultationListSchema).parse(res);
};

export const getUserStats = async (userId: string): Promise<UserStatsDTO> => {
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

  const stats = {
    activeConsultations,
    totalResponses: totalComments,
    communityImpact: "Top 10%",
  };

  return UserStatsSchema.parse(stats);
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
