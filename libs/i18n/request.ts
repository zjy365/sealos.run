import { getRequestConfig } from 'next-intl/server';
import { getPrimaryLocale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
	// Typically corresponds to the `[locale]` segment
	const requested = await requestLocale;
	const locale = getPrimaryLocale(requested);

	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default,
	};
});
