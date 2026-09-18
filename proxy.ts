import { NextResponse, type NextRequest } from "next/server";

// Cheap first line of defence: bounce requests to /admin/* that carry no
// session cookie at all. The real check (cookie -> DB session) happens in
// lib/auth.ts `requireAdmin`, which every admin page and action calls.
const SESSION_COOKIE = "admin_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (!isLoginPage && !request.cookies.has(SESSION_COOKIE)) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
