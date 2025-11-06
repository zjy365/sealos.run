import Image from 'next/image';
import { getTRich } from '@/libs/i18n/server';
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
	const t = await getTRich('components.logo');
	return (
		<div
			{...{ ...props, withLogotype: undefined }}
			className={cn('flex h-[1.5em] items-center', props.className?.wrapper)}
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
