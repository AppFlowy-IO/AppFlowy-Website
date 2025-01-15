import { NextResponse, NextRequest } from 'next/server';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_APP || 'https://app.appflowy.com';

const EXCLUDED_PATHS = [
  '/',
  '/api',
  '/_next',
  '/static',
  '/images',
  '/favicon.ico',
  '/appflowy.ico',
  '/appflowy.svg',
  '/appflowy-rss-logo.png',
  '/blog-og-image.png',
  '/privacy.docx',
  '/robots.txt',
  '/sitemap.xml',
  '/terms.docx',
  '/.well-known',
  '/about',
  '/appflowy-blocks',
  '/blog',
  '/compare',
  '/contact',
  '/contributors',
  '/download',
  '/downloaded',
  '/invitation',
  '/join',
  '/pricing',
  '/privacy',
  '/subscribe-newsletter',
  '/templates',
  '/terms',
  '/what-is-new',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const shouldExclude = EXCLUDED_PATHS.some((path) => pathname === path || pathname.startsWith(path + '/'));

  if (!pathname || shouldExclude) {
    return NextResponse.next();
  }

  const search = request.nextUrl.search;
  const redirectUrl = `${WEB_URL}${pathname}${search}`;

  return NextResponse.redirect(redirectUrl, {
    status: 301,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}

export const config = {
  matcher: ['/:path*'],
};
