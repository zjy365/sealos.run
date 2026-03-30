'use client';

import React from 'react';
import { AppIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { cn } from '@/libs/utils/styling';

type AppStoreIconProps = {
	alt: string;
	className?: string;
	fallbackClassName?: string;
	src?: string;
	imageClassName?: string;
};

export function AppStoreIcon({ alt, className, fallbackClassName, src, imageClassName }: AppStoreIconProps) {
	const [failedSrc, setFailedSrc] = React.useState<string | null>(null);

	if (!src || failedSrc === src) {
		return (
			<div className={cn('text-foreground', fallbackClassName)}>
				<Icon
					src={AppIcon}
					className='size-full'
				/>
			</div>
		);
	}

	return (
		// biome-ignore lint/performance/noImgElement: app icons are remote images from content frontmatter.
		<img
			alt={alt}
			className={cn(className, imageClassName)}
			onError={() => setFailedSrc(src)}
			src={src}
		/>
	);
}
