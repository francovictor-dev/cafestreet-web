// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/admin/auth", "/client/auth"];
//const PRIVATE_ROUTES_PREFIX = "/admin/dashboard";
const PRIVATE_ROUTES_PREFIX = ["/admin/dashboard", "/client/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;

  // 🔒 Usuário logado tentando acessar login
  if (accessToken && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/admin/dashboard/home", req.url));
  }

  // 🚫 Usuário não logado tentando acessar admin
  if (!accessToken && PRIVATE_ROUTES_PREFIX.includes(pathname)) {
    return NextResponse.redirect(new URL("/admin/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};
