import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("next-auth.session-token")?.value;

  console.log(accessToken);
  return NextResponse.json({ message: "Hello" });
}
