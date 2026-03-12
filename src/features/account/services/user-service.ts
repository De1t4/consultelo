import prisma from "@/shared/lib/prisma";
import { FormDataAccount } from "../schemas/schema-account";

export async function deleteUser(userId: string) {
  await prisma.consultation.deleteMany({
    where: {
      userId: userId,
    },
  });

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive: false,
    },
  });
}

export async function updateUser(userId: string, data: FormDataAccount) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...data,
    },
  });
}

export async function updatePassword(userId: string, password: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
    },
  });
}

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
