"use server";
import { STATUS_MESSAGE } from "@/shared/constants/status-response";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/utils/execution-action-db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { FormDataAccount } from "../schemas/schema-account";
import {
  deleteUser,
  getUserById,
  updatePassword,
  updateUser,
} from "../services/user-service";

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

export const updateProfileAction = async (data: FormDataAccount) => {
  return await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      const userId = session?.user.id;

      if (!session || !userId) {
        throw new Error(STATUS_MESSAGE.UNAUTHORIZED);
      }

      await isRegisteredUser(userId);

      await updateUser(userId, data);
      revalidatePath("/profile");

      return {
        success: true,
      };
    },
  });
};

export const resetPasswordAction = async (
  oldPassword: string,
  newPassword: string,
) => {
  return await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      const userId = session?.user.id;

      if (!session || !userId) {
        throw new Error(STATUS_MESSAGE.UNAUTHORIZED);
      }

      const user = await isRegisteredUser(userId);

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        user.password || "",
      );

      if (!isPasswordValid)
        throw new Error("Invalid old password. Please try again.");

      const hashPassword = await bcrypt.hash(newPassword, 10);

      await updatePassword(userId, hashPassword);

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
