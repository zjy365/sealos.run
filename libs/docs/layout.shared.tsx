import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(_locale: string): BaseLayoutProps {
	return {
		// [TODO] Return layout props based on locale
		nav: {
			title: '文档中心',
		},
	};
}
