import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isValidLocale } from "@/i18n/i18n";

const WRITE_METHODS = new Set(["POST", "PUT", "DELETE"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // Protect API write operations: must be signed in
  if (pathname.startsWith("/api/")) {
    if (WRITE_METHODS.has(req.method)) {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
    return NextResponse.next();
  }

  // Protect admin pages: must be signed in
  const isAdminRoute = locales.some((locale) =>
    pathname.startsWith(`/${locale}/admin`)
  );
  if (isAdminRoute) {
    const { userId } = await auth();
    if (!userId) {
      const locale =
        locales.find((l) => pathname.startsWith(`/${l}/`)) ?? defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/sign-in`, req.url));
    }
  }

  // Check if pathname is missing locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocaleFromRequest(req);

    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  return NextResponse.next();
});

function getLocaleFromRequest(request: NextRequest): string {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    // Simple parsing: just check if header contains our supported languages
    if (acceptLanguage.includes("en")) return "en";
    if (acceptLanguage.includes("zh")) return "zh";
    if (acceptLanguage.includes("fr")) return "fr";
  }

  return defaultLocale;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
