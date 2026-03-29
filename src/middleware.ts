import { authkitMiddleware } from "@workos-inc/authkit-nextjs";
import { NextResponse } from "next/server";

// Check if WorkOS credentials are configured
const hasWorkosConfig = process.env.WORKOS_API_KEY && process.env.WORKOS_CLIENT_ID;

const middleware = hasWorkosConfig
  ? authkitMiddleware({
      middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ["/api/auth/callback", "/api/auth/sign-out"],
      },
    })
  : () => NextResponse.next();

export default middleware;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
