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
			<g clipPath='url(#clip0_343_506)'>
				<mask
					id='mask0_343_506'
					maskUnits='userSpaceOnUse'
					x='0'
					y='0'
					width='28'
					height='28'
				>
					<path
						d='M28 0.5H0V27.5H28V0.5Z'
						fill='white'
					/>
				</mask>
				<g mask='url(#mask0_343_506)'>
					<path
						d='M28 0.5H0V27.5H28V0.5Z'
						fill='url(#paint0_linear_343_506)'
					/>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M16.5681 13.0148C17.0092 13.0148 17.367 13.3597 17.367 13.7852V16.0964C17.367 16.5218 17.0093 16.8667 16.5681 16.8667H11.988C11.5993 16.8826 11.2832 17.1653 11.2314 17.5303V19.4757C11.2314 19.9012 10.8737 20.2461 10.4325 20.2461H8.03575C7.59453 20.2461 7.23689 19.9012 7.23682 19.4757V17.1646C7.23682 16.7391 7.59453 16.3942 8.03575 16.3942H9.97224C10.3945 16.3737 10.7305 16.038 10.7305 15.6258V13.7852C10.7305 13.3597 11.0882 13.0148 11.5294 13.0148H16.5681Z'
						fill='url(#paint1_linear_343_506)'
					/>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M18.7619 7.75391C19.203 7.75391 19.5607 8.09892 19.5608 8.52431V10.3156C19.5678 10.7351 19.9223 11.073 20.359 11.0731H22.1753C22.6164 11.0732 22.9741 11.4182 22.9742 11.8435V14.1547C22.9741 14.5801 22.6164 14.925 22.1753 14.9251H19.7785C19.3374 14.925 18.9796 14.5801 18.9796 14.1547V12.3533C18.969 11.9569 18.6487 11.6357 18.243 11.6059H9.7756C9.36726 11.6259 9.04063 11.9409 9.01978 12.3347V14.1547C9.01971 14.5801 8.66202 14.9251 8.22084 14.9251H5.82408C5.38304 14.9249 5.02522 14.58 5.02515 14.1547V11.8435C5.02522 11.4182 5.38304 11.0733 5.82408 11.0731H7.79772C8.18545 11.0446 8.4956 10.7499 8.53146 10.3778V8.52431C8.53154 8.09895 8.88929 7.75401 9.33036 7.75391H18.7619Z'
						fill='url(#paint2_linear_343_506)'
					/>
				</g>
			</g>
			<defs>
				<linearGradient
					id='paint0_linear_343_506'
					x1='28'
					y1='0.500001'
					x2='1.01784'
					y2='28.4815'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#636363' />
					<stop
						offset='1'
						stopColor='#111114'
					/>
				</linearGradient>
				<linearGradient
					id='paint1_linear_343_506'
					x1='14.0484'
					y1='7.75368'
					x2='14.0484'
					y2='20.2878'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='white' />
					<stop
						offset='1'
						stopColor='#A9A9A9'
					/>
				</linearGradient>
				<linearGradient
					id='paint2_linear_343_506'
					x1='14.0484'
					y1='7.75373'
					x2='14.0484'
					y2='20.2879'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='white' />
					<stop
						offset='1'
						stopColor='#A9A9A9'
					/>
				</linearGradient>
				<clipPath id='clip0_343_506'>
					<path
						d='M0 8.5C0 4.08172 3.58172 0.5 8 0.5H20C24.4183 0.5 28 4.08172 28 8.5V19.5C28 23.9183 24.4183 27.5 20 27.5H8C3.58172 27.5 0 23.9183 0 19.5V8.5Z'
						fill='white'
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
