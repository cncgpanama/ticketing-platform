import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";

  if (acceptLanguage.includes("es")) {
    return "es";
  }

  if (acceptLanguage.includes("en")) {
    return "en";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return;
  }

  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next|payments|.*\\..*).*)",
  ],
};
