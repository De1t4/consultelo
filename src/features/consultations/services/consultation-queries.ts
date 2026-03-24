import { ConsultationCategory } from "@/generated/prisma/enums";
import prisma from "@/shared/lib/prisma";
import "server-only";
import { z } from "zod";
import {
  ConsultationDetailDTO,
  ConsultationDetailSchema,
  ConsultationListDTO,
  ConsultationListSchema,
  RelatedConsultationListDTO,
  RelatedConsultationListSchema,
  UserStatsDTO,
  UserStatsSchema,
} from "../schemas/output-dto";

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
          bio: true,
          phone: true,
          profession: true,
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

export const getActiveConsultationsCount = async (userId: string) => {
  return await prisma.consultation.count({
    where: {
      userId: userId,
      status: "active",
    },
  });
};

export const getUserStats = async (userId: string): Promise<UserStatsDTO> => {
  const date30DaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days
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
        createdAt: {
          gte: date30DaysAgo,
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

export const getRelatedConsultations = async ({
  idConsultation,
  idUser,
  category,
}: {
  idConsultation: string;
  idUser: string;
  category: string;
}): Promise<RelatedConsultationListDTO[]> => {
  const res = await prisma.consultation.findMany({
    where: {
      id: {
        not: idConsultation,
      },
      status: "active",
      settings: {
        privacy: "public",
      },
      OR: [
        { categories: category as ConsultationCategory },
        { userId: idUser },
      ],
    },
    include: {
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

  return z.array(RelatedConsultationListSchema).parse(res);
};
