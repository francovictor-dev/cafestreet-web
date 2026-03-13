import { httpClient } from "@/configs/api/http-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const data = await httpClient("auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).single();

    const response = NextResponse.json(data);

    response.cookies.set("access_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    /* if (users.length > 0) {
    } */

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ error }, { status: 401 });
  }
}
