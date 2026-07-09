// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/admin/auth", "/client/auth"];
//const PRIVATE_ROUTES_PREFIX = "/admin/dashboard";
const PRIVATE_ROUTES_PREFIX = ["/admin/dashboard", "/client/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;

  const typeUser = pathname.split("/")[1];

  // 🔒 Usuário logado tentando acessar login
  if (accessToken && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(
      new URL(`/${typeUser}/dashboard/home`, req.url),
    );
  }

  // 🚫 Usuário não logado tentando acessar admin
  if (!accessToken && PRIVATE_ROUTES_PREFIX.includes(pathname)) {
    return NextResponse.redirect(new URL(`/${typeUser}/auth`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};
