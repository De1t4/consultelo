import { UserCreateInput } from "@/generated/prisma/models/User";
import prisma from "@/shared/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const data: UserCreateInput = await request.json();

    const userEmailFound = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const userUsernameFound = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userEmailFound || userUsernameFound) {
      return NextResponse.json(
        { error: "El usuario ya existe o el email ya esta en uso" },
        { status: 400 },
      );
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        phone: data.phone as string,
        password: hashPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(
      { userWithoutPassword, message: "Usuario creado exitosamente" },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Error al crear el usuario " + e },
      { status: 500 },
    );
  }
}
