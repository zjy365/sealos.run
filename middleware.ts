import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { i18n } from '@/lib/i18n';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const i18nMiddleware = createI18nMiddleware(i18n);

  return i18nMiddleware(request, event);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images/|icons/|favicon/|favicon.ico|logo.svg|Deploy-on-Sealos.svg|sitemap.xml|llms.txt|rss.xml).*)/',
  ],
};
