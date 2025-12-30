import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { i18n } from "./i18n.config";

const proxyHandler = createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
});

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Redirect bare root to default locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/en${search ?? ""}`, request.url));
  }

  return proxyHandler(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
