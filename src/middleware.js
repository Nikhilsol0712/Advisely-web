import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  let isLogin = request.cookies.get("x-access-token");
  let userType = request.cookies.get("userType");

  console.log("islogin===", isLogin);
  console.log("userType===", userType);

  if (!isLogin) {
    if (
      request.nextUrl.pathname.startsWith("/user") ||
      request.nextUrl.pathname.startsWith("/mentors")
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  } else {
    if (request.nextUrl.pathname === "/" && userType.value === "customer") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    } else if (request.nextUrl.pathname === "/" && userType.value === "SME") {
      return NextResponse.redirect(new URL("/mentors", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}
