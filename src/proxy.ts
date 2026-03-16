import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./shared/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/account?auth=login", request.url));
  }

  // if (session && PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/consultation",
    "/my-consultations",
    "/settings",
  ],
};
