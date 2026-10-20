import { NextResponse, type NextRequest } from 'next/server';

/**
 * Every page lives under `app/[lang]`. Public URLs:
 *
 *   English  /about        → served from /en/about (rewrite, the URL is unchanged)
 *   Arabic   /ar/about     → served as is
 *   /en/...                → 308 to the unprefixed URL, so English has one address
 *
 * No language detection: visitors switch with the EN/AR toggle, and crawlers
 * always see the page the URL names.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/ar' || pathname.startsWith('/ar/')) return NextResponse.next();

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    // Generated metadata images are addressed with their real /en path.
    if (pathname.includes('/opengraph-image')) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: skip Next internals, API routes and anything with a file
  // extension (icons, sitemap.xml, robots.txt, llms.txt, images).
  matcher: ['/((?!api/|_next/|.*\\..*).*)'],
};
