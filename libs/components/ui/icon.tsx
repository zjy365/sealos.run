/**
 * A component for rendering mono-color SVG icons using the current text color.
 */

import type { StaticImageData } from 'next/image';
import type React from 'react';

type IconProps = Omit<React.ComponentProps<'img'>, 'src'> & {
	src: StaticImageData;
};

const EMPTY_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E`;

export function Icon({ src, width, height, style, ...props }: IconProps) {
	return (
		// biome-ignore lint/a11y/useAltText: this is for icon only.
		// biome-ignore lint/performance/noImgElement: SVGs are inlined here.
		<img
			width={width ?? src.width}
			height={height ?? src.height}
			src={EMPTY_SVG}
			style={{
				...style,
				backgroundColor: 'currentcolor',
				mask: `url("${src.src}") no-repeat center / contain`,
			}}
			{...props}
		/>
	);
}
