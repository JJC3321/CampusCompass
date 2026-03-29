import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (
    !process.env.WORKOS_API_KEY ||
    !process.env.WORKOS_CLIENT_ID ||
    !process.env.WORKOS_COOKIE_PASSWORD
  ) {
    return NextResponse.json(
      { error: "Auth not configured" },
      { status: 503 }
    );
  }

  try {
    const { handleAuth } = await import("@workos-inc/authkit-nextjs");
    const handler = handleAuth();
    return handler(request);
  } catch {
    return NextResponse.json(
      { error: "Auth unavailable" },
      { status: 503 }
    );
  }
}
