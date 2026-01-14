/**
 * A component for rendering mono-color SVG icons using the current text color.
 */

import type React from 'react';
import type { InlinedSvgData } from '@/libs/types';

type ScalingMode = 'scaling' | 'non-scaling';

type IconProps = Omit<React.ComponentProps<'img'>, 'src'> & {
	src: InlinedSvgData;
	/** Pick a stroke-width variant if available. */
	strokeWidth?: number;
	/** Pick a scaling variant if available. */
	scaling?: ScalingMode;
};

const EMPTY_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E`;

function buildKey(sw: number, scaling: ScalingMode) {
	return `sw=${sw};scaling=${scaling}`;
}

function pickClosest(list: number[], target: number) {
	let best = list[0];
	if (!best) return undefined;

	for (const v of list) {
		if (Math.abs(v - target) < Math.abs(best - target)) best = v;
	}
	return best;
}

function resolveVariantSrc(
	data: InlinedSvgData,
	opts: { strokeWidth?: number; scaling?: ScalingMode },
): { uri: string; chosen?: { strokeWidth?: number; scaling?: ScalingMode } } {
	const { strokeWidth, scaling } = opts;

	// no variant request -> use default src
	if (strokeWidth == null && scaling == null) return { uri: data.src };

	const variants = data.variants;
	if (!variants?.map) {
		// If caller tries to use variants but data doesn't support it.
		const msg = `[Icon] This SVG does not provide variants, but strokeWidth/scaling was requested.`;
		if (process.env.NODE_ENV !== 'production') throw new Error(msg);
		return { uri: data.src };
	}

	const swList = variants.strokeWidth ?? [];
	const scList = variants.scaling ?? [];

	// determine chosen strokeWidth
	let chosenSw: number | undefined;
	if (strokeWidth != null) {
		if (!swList.length) {
			const msg = `[Icon] strokeWidth=${strokeWidth} requested but this SVG has no strokeWidth variants.`;
			if (process.env.NODE_ENV !== 'production') throw new Error(msg);
		} else {
			chosenSw = swList.includes(strokeWidth) ? strokeWidth : pickClosest(swList, strokeWidth);
		}
	} else {
		// not provided -> use defaults if present, else first
		chosenSw = data.defaults?.strokeWidth ?? swList[0];
	}

	// determine chosen scaling
	let chosenScaling: ScalingMode | undefined;
	if (scaling != null) {
		if (!scList.length) {
			const msg = `[Icon] scaling=${scaling} requested but this SVG has no scaling variants.`;
			if (process.env.NODE_ENV !== 'production') throw new Error(msg);
		} else {
			if (!scList.includes(scaling)) {
				const msg = `[Icon] scaling=${scaling} requested but supported scaling variants are: ${scList.join(', ')}.`;
				if (process.env.NODE_ENV !== 'production') throw new Error(msg);
				chosenScaling = scList[0] as ScalingMode;
			} else {
				chosenScaling = scaling;
			}
		}
	} else {
		chosenScaling = (data.defaults?.scaling as ScalingMode | undefined) ?? (scList[0] as ScalingMode | undefined);
	}

	// If any axis still missing, fallback safely.
	if (chosenSw == null || chosenScaling == null) return { uri: data.src };

	const key = buildKey(chosenSw, chosenScaling);
	const uri = variants.map[key];
	if (!uri) {
		const msg = `[Icon] Variant not found for key="${key}". Available keys: ${Object.keys(variants.map).slice(0, 10).join(', ')}${Object.keys(variants.map).length > 10 ? ', ...' : ''}`;
		if (process.env.NODE_ENV !== 'production') throw new Error(msg);
		return { uri: data.src };
	}

	return { uri, chosen: { strokeWidth: chosenSw, scaling: chosenScaling } };
}

export function Icon({ src, width, height, style, strokeWidth, scaling, ...props }: IconProps) {
	if (src.flags?.colorful) {
		if ((strokeWidth != null || scaling != null) && process.env.NODE_ENV !== 'production') {
			throw new Error('[Icon] strokeWidth/scaling props are not supported for colorful icons.');
		}
		return (
			// biome-ignore lint/a11y/useAltText: this is for icon only.
			// biome-ignore lint/performance/noImgElement: SVGs are inlined here.
			<img
				width={width ?? src.width}
				height={height ?? src.height}
				src={src.src}
				{...props}
			/>
		);
	}

	const { uri } = resolveVariantSrc(src, { strokeWidth, scaling });

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
				mask: `url("${uri}") no-repeat center / contain`,
			}}
			{...props}
		/>
	);
}
