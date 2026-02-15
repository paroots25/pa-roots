import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  /* 🛡 Only protect /admin routes */
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return res;
  }

  /* Allow login page itself */
  if (req.nextUrl.pathname === "/admin/login") {
    return res;
  }

  /* 🔐 Create Supabase server client using request cookies */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
      },
    }
  );

  /* 🔍 Check session */
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /* ❌ Not logged in → redirect to login */
  if (!session) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

/* 📍 Apply middleware only to admin routes */
export const config = {
  matcher: ["/admin/:path*"],
};