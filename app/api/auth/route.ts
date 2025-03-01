"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const authData = { username: "mm", password: "1234" };

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;
  const cookieStore = await cookies();

  if (username === authData.username && password === authData.password) {
    cookieStore.set({
      name: "user",
      value: JSON.stringify({ username }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // یک هفته (به ثانیه)
      path: "/",
    });

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, message: "نام کاربری یا رمز عبور اشتباه است" },
      { status: 401 }
    );
  }
}
