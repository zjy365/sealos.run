import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '../i18n/fumadocs';

export function baseOptions(_locale: string): BaseLayoutProps {
	return {
		i18n: i18n,
		// [TODO] Return layout props based on locale
		nav: {
			title: 'Sealos Docs',
		},
	};
}
