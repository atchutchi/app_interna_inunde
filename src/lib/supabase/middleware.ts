import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database.types";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Public routes — no auth required
  const publicRoutes = ["/login", "/forgot-password"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Protect dashboard routes
  const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/finance") || pathname.startsWith("/operations") || pathname.startsWith("/call-center") || pathname.startsWith("/riders") || pathname.startsWith("/partners") || pathname.startsWith("/reports") || pathname.startsWith("/settings") || pathname.startsWith("/hr");

  // Protect rider portal
  const isRiderRoute = pathname.startsWith("/my-");

  if (!user) {
    if (!isPublicRoute && (isDashboardRoute || isRiderRoute || pathname === "/")) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // Authenticated user on login page → redirect to dashboard
  if (user && isPublicRoute) {
    const url = request.nextUrl.clone();

    // Get profile to determine role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "motorbike") {
      url.pathname = "/my-deliveries";
    } else {
      url.pathname = "/dashboard";
    }

    return NextResponse.redirect(url);
  }

  // Rider trying to access dashboard → redirect to portal
  if (user && isDashboardRoute) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "motorbike") {
      const url = request.nextUrl.clone();
      url.pathname = "/my-deliveries";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
