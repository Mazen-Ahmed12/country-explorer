import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const isLogged = !!req.auth;
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/");

  if (isProtectedRoute && !isLogged) {
    return NextResponse.redirect(new URL("/authPage", req.url));
  }

  if (req.nextUrl.pathname === "/authPage" && isLogged) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/*", "/authPage"],
};
