import type React from 'react';
import { cn } from '@/libs/utils/styling';

type MdxImageSource =
	| React.ImgHTMLAttributes<HTMLImageElement>['src']
	| {
			src: string;
			width?: number;
			height?: number;
	  };

function isMdxImageSource(src: MdxImageSource): src is { src: string; width?: number; height?: number } {
	return typeof src === 'object' && src !== null && 'src' in src;
}

export function ProseImage({
	alt,
	className,
	loading = 'lazy',
	src,
	style,
	...props
}: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src?: MdxImageSource }) {
	const imageSrc = isMdxImageSource(src) ? src.src : src;
	const width = isMdxImageSource(src) ? (props.width ?? src.width) : props.width;
	const height = isMdxImageSource(src) ? (props.height ?? src.height) : props.height;

	return (
		// biome-ignore lint/performance/noImgElement: MDX image sources can be local relative assets without known dimensions.
		<img
			alt={alt ?? ''}
			className={cn('mx-auto my-6 h-auto max-w-full rounded-lg border border-border object-contain', className)}
			src={imageSrc}
			width={width}
			height={height}
			loading={loading}
			decoding='async'
			style={{
				maxWidth: 'min(100%, 880px)',
				maxHeight: 'min(560px, 70vh)',
				...style,
			}}
			{...props}
		/>
	);
}
