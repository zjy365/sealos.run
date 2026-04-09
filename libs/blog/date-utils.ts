import { getPrimaryLocale } from '@/libs/i18n/routing';

/**
 * Format date string based on locale.
 *
 * @param dateString - The date string to format
 * @param locale - The locale for formatting
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string): string {
	const date = new Date(dateString);
	const resolvedLocale = getPrimaryLocale(locale);

	return new Intl.DateTimeFormat(resolvedLocale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
}
