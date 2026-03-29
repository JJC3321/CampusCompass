import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (
    !process.env.WORKOS_API_KEY ||
    !process.env.WORKOS_CLIENT_ID ||
    !process.env.WORKOS_COOKIE_PASSWORD
  ) {
    return NextResponse.next();
  }

  try {
    const { authkitMiddleware } = await import("@workos-inc/authkit-nextjs");
    const handler = authkitMiddleware({
      middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ["/api/auth/callback", "/api/auth/sign-out"],
      },
    });
    return handler(request, event);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
