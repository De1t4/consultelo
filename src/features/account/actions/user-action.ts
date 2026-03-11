"use server";
import { authOptions } from "@/shared/lib/auth";
import { getServerSession } from "next-auth";
import { deleteUser, getUserById } from "../services/user-service";
import { revalidatePath } from "next/cache";
import { STATUS_MESSAGE } from "@/shared/constants/status-response";
import { executeAction } from "@/shared/utils/execution-action-db";

export const deleteUserAction = async () => {
  return await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      const userId = session?.user.id;

      if (!session || !userId) {
        throw new Error(STATUS_MESSAGE.UNAUTHORIZED);
      }

      await isRegisteredUser(userId);

      await deleteUser(userId);
      revalidatePath("/my-consultations");
      
      return {
        success: true,
      };
    },
  });
};

const isRegisteredUser = async (userId: string) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error(STATUS_MESSAGE.NOT_FOUND);
  }

  return user;
};
