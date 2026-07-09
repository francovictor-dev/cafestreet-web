import { createClient } from "@/api/client.api";
import { createProfile } from "@/api/profile.api";
import { createUser } from "@/api/users.api";
import { RegisterClientFormData } from "@/schemas/register-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name, password } =
    (await req.json()) as RegisterClientFormData;
  try {
    const userData = await createUser({ email, password });

    await createProfile({
      userName: name,
      userType: "client",
      userId: userData.id,
    });

    await createClient({ userId: userData.id });

    return NextResponse.json({ message: "ok" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(e);
  }
}
