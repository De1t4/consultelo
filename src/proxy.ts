import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./shared/lib/auth";

const PUBLIC_PATHS = ["/login", "/register"];
const PRIVATE_PATHS = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/consultation", "/profile"],
};
