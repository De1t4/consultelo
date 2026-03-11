"use server";

import { FormDataComment } from "@/schemas/schema-comment";
import { createComment, isCommentedByUser } from "@/services/comment-service";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/utils/execution-action-db";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { STATUS_MESSAGE } from "@/shared/constants/status-response";

const COMMENT_COOKIE_PREFIX = "has_commented_";

export async function createCommentAction(data: FormDataComment) {
  const result = await executeAction({
    actionFn: async () => {
      if (!data.consultationId) {
        throw new Error(STATUS_MESSAGE.BAD_REQUEST);
      }

      const session = await getServerSession(authOptions);
      const userId = session?.user?.id;

      // 1. Validation for non-anonymous comments
      if (!data.isAnonymous && !userId) {
        throw new Error(STATUS_MESSAGE.UNAUTHORIZED);
      }

      // 2. Check for existing comments (Cookie or DB)
      await checkExistentComment(data.consultationId, userId);

      // 3. Prepare data
      if (!data.isAnonymous && userId) {
        data.userId = userId;
      }

      // 4. Persistence
      const newComment = await createComment(data, data.consultationId!);

      // 5. Success side effects (set cookie for anonymous or track for all)
      await setCommentCookie(data.consultationId);

      return newComment;
    },
  });

  return result;
}

async function checkExistentComment(consultationId: string, userId?: string) {
  const cookieStore = await cookies();
  const cookieName = `${COMMENT_COOKIE_PREFIX}${consultationId}`;

  // Check cookie (for guest users or as a first line of defense)
    if (cookieStore.get(cookieName)) {
    throw new Error(STATUS_MESSAGE.ALREADY_EXISTS);
  }

  // Check database if user is logged in
  if (userId) {
    const isCommented = await isCommentedByUser(userId, consultationId);
    if (isCommented) {
      throw new Error(STATUS_MESSAGE.ALREADY_EXISTS);
    }
  }
}

async function setCommentCookie(consultationId: string) {
  const cookieStore = await cookies();
  const cookieName = `${COMMENT_COOKIE_PREFIX}${consultationId}`;

  cookieStore.set(cookieName, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "lax",
  });
}
