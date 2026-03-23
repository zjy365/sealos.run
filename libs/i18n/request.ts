import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async () => {
	return {
		locale: routing.defaultLocale,
		messages: (await import(`./messages/${routing.defaultLocale}.json`)).default,
	};
});
