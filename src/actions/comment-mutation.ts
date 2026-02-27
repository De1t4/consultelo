"use server";

import { FormDataComment } from "@/schemas/schema-comment";
import { createComment, isCommentedByUser } from "@/services/comment-service";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/types/executionAction";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function createCommentAction(data: FormDataComment) {
  return await executeAction({
    actionFn: async () => {
      if (!data.consultationId) {
        throw new Error("No consultation ID was provided.");
      }

      const cookieStore = await cookies();
      const cookieName = `has_commented_${data.consultationId}`;

      if (cookieStore.get(cookieName)) {
        throw new Error(
          "You have already left a comment on this consultation.",
        );
      }

      try {
        if (data.isAnonymous) {
          const session = await getServerSession(authOptions);
          if (!session?.user?.id) {
            throw new Error("User not authenticated or invalid ID");
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

        await createComment(data, data.consultationId);
        cookieStore.set(cookieName, "true", {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 30,
          path: "/", // Available on the entire web
        });
      } catch (error) {
        throw error;
      }
    },
  });
}
