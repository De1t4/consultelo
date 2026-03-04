"use server";

import { FormDataComment } from "@/schemas/schema-comment";
import { createComment, isCommentedByUser } from "@/services/comment-service";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/utils/execution-action-db";
import {
  ServerActionError,
  createServerAction,
} from "@/shared/utils/execution-action-server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export const createCommentAction = createServerAction(
  async (data: FormDataComment) => {
    if (data.consultationId === undefined) {
      throw new ServerActionError("No consultation ID was provided.");
    }
    const cookieStore = await cookies();
    const cookieName = `has_commented_${data.consultationId}`;
    const session = await getServerSession(authOptions);

    if (cookieStore.get(cookieName)) {
      throw new ServerActionError(
        "You have already left a comment on this consultation.",
      );
    }

    if (!data.isAnonymous) {
      if (!session?.user?.id) {
        throw new ServerActionError("You must be logged in to comment.");
      }
      data.userId = session.user.id;
      const commented = await isCommentedByUser(
        session.user.id,
        data.consultationId,
      );
      if (commented) {
        throw new ServerActionError(
          "You have already left a comment on this consultation.",
        );
      }
    }

    const newComment = await executeAction({
      actionFn: async () => {
        return await createComment(data, data.consultationId!);
      },
    });

    if (session) {
      return newComment;
    }

    cookieStore.set(cookieName, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });

    return newComment;
  },
);
