/**
 * Format date string based on locale.
 *
 * @param dateString - The date string to format
 * @param locale - The locale for formatting ('zh' or 'en')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string = 'zh'): string {
	const date = new Date(dateString);

	if (locale === 'zh') {
		return date.toLocaleDateString('zh-CN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	}

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
