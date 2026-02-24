import { UserCreateInput } from "@/generated/prisma/models/User";
import prisma from "@/shared/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

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
        { error: "The user already exists or the email is already in use" },
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
      { userWithoutPassword, message: "User created successfully" },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Error creating user " + e },
      { status: 500 },
    );
  }
}
