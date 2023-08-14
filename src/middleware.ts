import { NextResponse, NextRequest } from 'next/server';

import { locales, defaultLocale } from '../i18n';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(locales);

export const cookieName = 'i18next';

export function middleware(req: NextRequest) {
  let lng;

  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = defaultLocale;

  const { pathname, href, origin } = req.nextUrl;
  const pathPrefix = href.split(origin)[1];

  // Redirect if lng in path is not supported
  if (!locales.some((loc) => pathPrefix.startsWith(`/${loc}`))) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|lottie).*)',
    // Optional: only run on root (/) URL
    '/',
  ],
};
