"use server";

import { FormDataComment } from "@/schemas/schema-comment";
import { createComment, isCommentedByUser } from "@/services/comment-service";
import { authOptions } from "@/shared/lib/auth";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function createCommentAction(data: FormDataComment) {
  const cookieStore = await cookies();
  const cookieName = `has_commented_${data.consultationId}`;

  if (!data.consultationId) {
    return { error: "No se proporcionó un ID de consulta." };
  }

  if (cookieStore.has(cookieName)) {
    return { error: "Ya has dejado un comentario en esta consulta." };
  }
  if (data.isAnonymous) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Usuario no autenticado o ID inválido" };
    }
    data.userId = session.user.id;
    const commented = await isCommentedByUser(
      session.user.id,
      data.consultationId,
    );
    if (commented) {
      return { error: "Ya has dejado un comentario en esta consulta." };
    }
  }

  // const headerList = await headers();
  // const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

  try {
    await createComment(data, data.consultationId);
    cookieStore.set(cookieName, "true", {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/", // Disponible en toda la web
    });

    return { success: true };
  } catch (error) {
    return { error: "Error al guardar el comentario." + error };
  }
}
