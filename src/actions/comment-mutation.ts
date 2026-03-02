"use server";

import { FormDataComment } from "@/schemas/schema-comment";
import { createComment, isCommentedByUser } from "@/services/comment-service";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/types/executionAction";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function createCommentAction(data: FormDataComment) {
  const cookieStore = await cookies();
  const cookieName = `has_commented_${data.consultationId}`;

  const newComment = await executeAction({
    actionFn: async () => {
      if (!data.consultationId) {
        throw new Error("No consultation ID was provided.");
      }

      if (cookieStore.get(cookieName)) {
        throw new Error(
          "You have already left a comment on this consultation.",
        );
      }

      if (!data.isAnonymous) {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
          throw new Error("You must be logged in to comment.");
        }

        data.userId = session.user.id;
        const commented = await isCommentedByUser(
          session.user.id,
          data.consultationId,
        );

        if (commented) {
          throw new Error(
            "You have already left a comment on this consultation.",
          );
        }
      }

      return await createComment(data, data.consultationId);
    },
  });

  cookieStore.set(cookieName, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });

  return newComment;
}
