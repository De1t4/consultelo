import prisma from "@/shared/lib/prisma";

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

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
