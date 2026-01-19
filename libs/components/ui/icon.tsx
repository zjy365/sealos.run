/**
 * A component for rendering SVG icons using the current text color.
 * Fully static: patch data-uri placeholders in-place using build-time ranges.
 */

import type React from 'react';
import type { InlinedSvgData, Range, ScalingMode, VectorEffectInput } from '@/libs/types';

type IconProps = Omit<React.ComponentProps<'img'>, 'src'> & {
	src: InlinedSvgData;
	strokeWidth?: number;
	vectorEffect?: VectorEffectInput;
	/** Convenience alias (used only when vectorEffect not provided). */
	scaling?: ScalingMode;
};

const EMPTY_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E`;

function applyPatches(base: string, patches: Array<Range & { value: string }>) {
	const sorted = patches.slice().sort((a, b) => b.start - a.start);
	let out = base;
	for (const p of sorted) out = out.slice(0, p.start) + p.value + out.slice(p.end);
	return out;
}

function normalizeVectorEffectInput(v?: VectorEffectInput): string | undefined {
	if (v == null) return undefined;

	const parts = Array.isArray(v) ? v.flatMap((x) => String(x).split(/[,\s]+/)) : String(v).split(/[,\s]+/);

	const uniq: string[] = [];
	const seen = new Set<string>();

	for (const raw of parts) {
		const s = raw.trim();
		if (!s) continue;
		if (!seen.has(s)) {
			seen.add(s);
			uniq.push(s);
		}
	}

	if (!uniq.length) return undefined;

	if (uniq.includes('none') && uniq.length > 1) {
		return uniq.filter((x) => x !== 'none').join(' ');
	}

	return uniq.join(' ');
}

function devPath(data: InlinedSvgData) {
	return data.meta?.path ? ` (${data.meta.path})` : '';
}

function resolveVectorEffectValue(
	data: InlinedSvgData,
	vectorEffect?: VectorEffectInput,
	scaling?: ScalingMode,
): string {
	const veNorm = normalizeVectorEffectInput(vectorEffect);
	if (veNorm) return veNorm;

	if (scaling) return scaling === 'non-scaling' ? 'non-scaling-stroke' : 'none';

	return data.defaults?.vectorEffect ?? 'none';
}

function hasOverrides(strokeWidth?: number, vectorEffect?: VectorEffectInput, scaling?: ScalingMode) {
	return strokeWidth != null || vectorEffect != null || scaling != null;
}

/**
 * Always try to patch if overrides are present OR vars exist.
 * Colorful icons are allowed to patch too.
 */
function resolveUri(
	data: InlinedSvgData,
	strokeWidth?: number,
	vectorEffect?: VectorEffectInput,
	scaling?: ScalingMode,
) {
	const requested = hasOverrides(strokeWidth, vectorEffect, scaling);

	// No vars -> cannot patch
	const vars = data.vars;
	const swRanges = vars?.strokeWidth?.ranges;
	const veRanges = vars?.vectorEffect?.ranges;

	const patchable = !!swRanges?.length && !!veRanges?.length;

	if (!patchable) {
		if (requested && process.env.NODE_ENV !== 'production') {
			throw new Error(`[Icon] Missing vars patch info, but overrides were requested.${devPath(data)}`);
		}
		return data.src;
	}

	const sw = strokeWidth ?? data.defaults?.strokeWidth ?? 1.5;
	const ve = resolveVectorEffectValue(data, vectorEffect, scaling);

	return applyPatches(data.src, [
		...swRanges!.map((r) => ({ ...r, value: String(sw) })),
		...veRanges!.map((r) => ({ ...r, value: ve })),
	]);
}

export function Icon({ src, width, height, style, strokeWidth, vectorEffect, scaling, ...props }: IconProps) {
	const uri = resolveUri(src, strokeWidth, vectorEffect, scaling);

	// colorful: render actual image src (but patched)
	if (src.flags?.colorful) {
		return (
			// biome-ignore lint/a11y/useAltText: this is for icon only.
			// biome-ignore lint/performance/noImgElement: SVGs are inlined here.
			<img
				width={width ?? src.width}
				height={height ?? src.height}
				src={uri}
				{...props}
			/>
		);
	}

	// mono-color mask: use patched uri as mask
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
