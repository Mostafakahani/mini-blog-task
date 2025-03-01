import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // دریافت کوکی کاربر
  const userCookie = request.cookies.get("user");
  // مسیر درخواست فعلی
  const path = request.nextUrl.pathname;

  if (userCookie && path.startsWith("/auth")) {
    // هدایت به صفحه اصلی
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!userCookie && path.startsWith("/create")) {
    // هدایت به صفحه ورود
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // در غیر این صورت، اجازه ادامه مسیر
  return NextResponse.next();
}

// تعیین مسیرهایی که میدلور باید روی آنها اعمال شود
export const config = {
  matcher: ["/auth/:path*", "/create/:path*"],
};
