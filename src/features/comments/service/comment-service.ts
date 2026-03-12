import { FormDataComment } from "@/features/comments/schemas/schema-comment";
import prisma from "@/shared/lib/prisma";

export const createComment = async (
  data: FormDataComment,
  consultationId: string,
) => {
  return await prisma.comment.create({
    data: {
      message: data.message,
      userId: data.userId ?? null,
      consultationId: consultationId,
    },
  });
};

export const isCommentedByUser = async (
  userId: string,
  consultationId: string,
) => {
  return await prisma.comment.findFirst({
    where: {
      consultationId: consultationId,
      userId: userId,
    },
  });
};
