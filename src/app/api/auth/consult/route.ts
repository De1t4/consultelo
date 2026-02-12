import { authOptions } from "@/shared/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    console.log("User ID on server:", session.user.id);
  }

  return NextResponse.json({
    message: "Hello",
    session,
  });
}
