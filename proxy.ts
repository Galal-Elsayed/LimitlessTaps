import { type NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n.config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a valid locale
  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale, redirect to default locale path
  if (!pathnameHasLocale) {
    // Redirect / to /en/home
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/en/home', request.url));
    }
    // Redirect other paths like /about to /en/about
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/"],
};
