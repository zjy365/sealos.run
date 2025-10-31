import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type React from 'react';
import { cn } from '@/libs/utils/styling';
import SealosLogoImage from './assets/sealos.svg';

export async function Logo(
	props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		withLogotype?: boolean;
		className?: {
			wrapper?: string;
			image?: string;
			text?: string;
		};
	},
) {
	const t = await getTranslations('components.logo');
	return (
		<div
			{...{ ...props, withLogotype: undefined }}
			className={cn('h-[1.5em] flex items-center', props.className?.wrapper)}
		>
			<Image
				src={SealosLogoImage}
				alt={t('alt')}
				className={cn('size-[1.5em]', props.className?.image)}
			/>
			{props.withLogotype && (
				<span className={cn('ml-2 text-lg font-semibold', props.className?.text)}>{t('title')}</span>
			)}
		</div>
	);
}
