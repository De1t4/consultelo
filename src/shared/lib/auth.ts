import prisma from "@/shared/lib/prisma";
import bcrypt from "bcrypt";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) throw new Error("Usuario o contraseña incorrectos");
        const isPasswordValid = await bcrypt.compare(
          credentials?.password || "",
          user.password || "",
        );
        if (!isPasswordValid)
          throw new Error("Usuario o contraseña incorrectos");
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          phone: user.phone,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
