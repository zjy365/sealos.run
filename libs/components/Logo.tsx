/** biome-ignore-all lint/correctness/useUniqueElementIds: SVG */

import { getTranslations } from 'next-intl/server';
import type React from 'react';

export async function Logo(props: React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>) {
	const t = await getTranslations('components.logo');
	return (
		<svg
			width='28'
			height='28'
			viewBox='0 0 28 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<title>{t('title')}</title>
		</svg>
	);
}
