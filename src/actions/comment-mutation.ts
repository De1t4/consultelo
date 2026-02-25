"use server";

import { FormDataComment } from "@/schemas/schema-comment";
import { createComment, isCommentedByUser } from "@/services/comment-service";
import { authOptions } from "@/shared/lib/auth";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function createCommentAction(data: FormDataComment) {
  const cookieStore = await cookies();
  const cookieName = `has_commented_${data.consultationId}`;

  // const headerList = await headers();
  // const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  if (!data.consultationId) {
    throw new Error("No consultation ID was provided.");
  }

  try {
    if (cookieStore.has(cookieName)) {
      throw new Error("You have already left a comment on this consultation.");
    }

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

    return { success: true };
  } catch (error) {
    throw error;
  }
}
