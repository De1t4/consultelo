"use server";

import { STATUS_MESSAGE } from "@/shared/constants/status-response";
import { authOptions } from "@/shared/lib/auth";
import { executeAction } from "@/shared/utils/execution-action-db";
import { getServerSession } from "next-auth";
import { getUserById } from "../services/user-service";

export const getProfileAction = async () => {
  return await executeAction({
    actionFn: async () => {
      const session = await getServerSession(authOptions);
      const userId = session?.user.id;

      if (!session || !userId) {
        throw new Error(STATUS_MESSAGE.UNAUTHORIZED);
      }

      const user = await isRegisteredUser(userId);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;

      return {
        success: true,
        user: userWithoutPassword,
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
