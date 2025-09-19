import createNextIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/libs/i18n/routing';

export default createNextIntlMiddleware(routing);

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|images/|icons/|favicon/|favicon.ico|logo.svg|sitemap.xml|llms.txt|rss.xml).*)',
	],
};
