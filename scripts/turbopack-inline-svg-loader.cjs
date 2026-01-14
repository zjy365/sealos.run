// Modified from: https://github.com/vitalets/turbopack-inline-svg-loader
// Copyright (c) 2025 Vitaliy Potapov, licensed under MIT License.

/**
 * Turbopack loader: SVG -> optimized data URI + dimensions.
 *
 * Default export (non-icon):
 *   { src, width, height }
 *
 * Icon mode (root <svg data-type="icon">) additionally exports:
 *   { src, width, height, flags, defaults, variants }
 *
 * Root SVG build directives (icon mode only):
 * - data-colorful="true": mark as colorful (consumer may render <img src> directly)
 * - data-variants-stroke-width="true" | "0.5,1,1.5,2": generate strokeWidth variants
 * - data-default-stroke-width="<number>": default strokeWidth for exported `src`
 * - data-variants-scaling="scaling,non-scaling": generate scaling-mode variants
 * - data-default-scaling="scaling|non-scaling": default scaling for exported `src`
 */

const { optimize } = require('svgo');
const svgToMiniDataURI = require('mini-svg-data-uri');
const { imageSize } = require('image-size');

const DEFAULT_STROKE_WIDTHS = [0.5, 1, 1.5, 2];
const DEFAULT_SCALING = ['scaling'];

/** @param {string} s */
function escapeRegExp(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get root <svg ...> open tag only.
 * @param {string} svg
 */
function getRootSvgOpenTag(svg) {
	const m = svg.match(/<svg\b[\s\S]*?>/i);
	return m ? m[0] : '';
}

/**
 * Read attribute from root <svg> open tag only.
 * @param {string} svg
 * @param {string} name
 * @returns {string|undefined}
 */
function readAttrFromRoot(svg, name) {
	const openTag = getRootSvgOpenTag(svg);
	if (!openTag) return undefined;
	const re = new RegExp(`\\b${escapeRegExp(name)}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i');
	const m = openTag.match(re);
	return m ? m[2] : undefined;
}

/** @param {unknown} v */
function truthy(v) {
	if (v == null) return false;
	const s = String(v).trim().toLowerCase();
	return s === 'true' || s === '1' || s === 'yes' || s === 'on';
}

/**
 * Parse "0.5,1,1.5" -> number[].
 * @param {string} v
 */
function parseNumberList(v) {
	return String(v)
		.split(',')
		.map((s) => Number(s.trim()))
		.filter((n) => Number.isFinite(n) && n > 0);
}

/**
 * Parse "scaling,non-scaling" -> ("scaling"|"non-scaling")[].
 * @param {string} v
 */
function parseScalingList(v) {
	const items = String(v)
		.split(',')
		.map((s) => s.trim().toLowerCase())
		.filter(Boolean);
	const out = [];
	for (const it of items) if (it === 'scaling' || it === 'non-scaling') out.push(it);
	return [...new Set(out)];
}

/**
 * Pick closest number in list.
 * @param {number[]} list @param {number} target
 */
function pickClosest(list, target) {
	if (!list.length || !Number.isFinite(target)) return undefined;
	let best = list[0];
	for (const v of list) if (Math.abs(v - target) < Math.abs(best - target)) best = v;
	return best;
}

/**
 * Strip build directives before SVGO to avoid leaking metadata into output.
 * @param {string} svg
 */
function stripBuildAttrs(svg) {
	return svg
		.replace(/\sdata-type=(['"])[\s\S]*?\1/gi, '')
		.replace(/\sdata-colorful=(['"])[\s\S]*?\1/gi, '')
		.replace(/\sdata-variants-stroke-width=(['"])[\s\S]*?\1/gi, '')
		.replace(/\sdata-default-stroke-width=(['"])[\s\S]*?\1/gi, '')
		.replace(/\sdata-variants-scaling=(['"])[\s\S]*?\1/gi, '')
		.replace(/\sdata-default-scaling=(['"])[\s\S]*?\1/gi, '');
}

/** Inject root stroke-width.
 * @param {string} svg
 * @param {number} sw
 */
function setRootStrokeWidth(svg, sw) {
	let out = svg.replace(/\sstroke-width=(['"])[\s\S]*?\1/gi, '');
	out = out.replace(/<svg\b([^>]*)>/i, (_m, attrs) => `<svg${attrs} stroke-width="${sw}">`);
	return out;
}

/**
 * Inject vector-effect="non-scaling-stroke" into common shape elements.
 * Keeps the original closing (`>` or `/>`) intact.
 * @param {string} svg
 */
function injectNonScalingStroke(svg) {
	const tags = ['path', 'line', 'rect', 'circle', 'ellipse', 'polyline', 'polygon'];
	// Capture: <tag (attrs) (optional self-close slash) >
	const re = new RegExp(`<(${tags.join('|')})\\b([^>]*?)(\\s*\\/?)>`, 'gi');

	return svg.replace(re, (m, tag, attrs, slash) => {
		// already has vector-effect
		if (/\bvector-effect\s*=/i.test(attrs)) return m;

		// ensure spacing before injected attribute
		const sep = attrs && !/\s$/.test(attrs) ? ' ' : '';
		return `<${tag}${attrs}${sep}vector-effect="non-scaling-stroke"${slash}>`;
	});
}

/** Variant map key format.
 * @param {number} sw
 * @param {"scaling"|"non-scaling"} scaling
 */
function buildKey(sw, scaling) {
	return `sw=${sw};scaling=${scaling}`;
}

module.exports = function (content) {
	this.cacheable?.();

	const { width, height } = imageSize(Buffer.from(content));

	// Gate: only data-type="icon" participates in variant generation.
	const dataType = (readAttrFromRoot(content, 'data-type') || '').trim().toLowerCase();
	const isIcon = dataType === 'icon';

	// Non-icon: keep minimal output.
	if (!isIcon) {
		const optimized = optimize(content, { multipass: true });
		return `export default ${JSON.stringify({
			src: svgToMiniDataURI(optimized.data),
			width,
			height,
		})};`;
	}

	// Icon mode: parse directives from root tag (before SVGO).
	const colorful = truthy(readAttrFromRoot(content, 'data-colorful'));

	const strokeWidthsRaw = readAttrFromRoot(content, 'data-variants-stroke-width');
	const defaultStrokeWidthRaw = readAttrFromRoot(content, 'data-default-stroke-width');
	const defaultStrokeWidth = defaultStrokeWidthRaw == null ? undefined : Number(defaultStrokeWidthRaw);

	const scalingRaw = readAttrFromRoot(content, 'data-variants-scaling');
	const scalingModes = scalingRaw == null ? DEFAULT_SCALING.slice() : parseScalingList(scalingRaw);

	const defaultScalingRaw = (readAttrFromRoot(content, 'data-default-scaling') || '').trim().toLowerCase();
	const defaultScaling =
		defaultScalingRaw === 'scaling' || defaultScalingRaw === 'non-scaling' ? defaultScalingRaw : undefined;

	// strokeWidths variants:
	// - If data-variants-stroke-width is provided:
	//   - "true" => DEFAULT_STROKE_WIDTHS
	//   - list   => parsed list
	// - If not provided:
	//   - If defaults are present, still generate a minimal variant set so defaults can affect `src`.
	//   - Otherwise, no variants (single optimized src).
	let strokeWidths;
	if (strokeWidthsRaw != null) {
		strokeWidths = truthy(strokeWidthsRaw) ? DEFAULT_STROKE_WIDTHS.slice() : parseNumberList(strokeWidthsRaw);
	} else if (Number.isFinite(defaultStrokeWidth) || defaultScaling) {
		// minimal variant set so defaults can influence `src`
		strokeWidths = Number.isFinite(defaultStrokeWidth) ? [defaultStrokeWidth] : [DEFAULT_STROKE_WIDTHS[0] ?? 1.5];
	}

	// Optimize after stripping build directives.
	const cleaned = stripBuildAttrs(content);
	const optimizedSvg = optimize(cleaned, { multipass: true }).data;

	// Build variants map (strokeWidth × scaling).
	let variants;
	if (strokeWidths?.length) {
		const swList = [...new Set(strokeWidths)].sort((a, b) => a - b);
		const scList = scalingModes.length ? scalingModes : DEFAULT_SCALING;

		const map = {};
		for (const sw of swList) {
			const base = setRootStrokeWidth(optimizedSvg, sw);
			for (const scaling of scList) {
				const svgVariant = scaling === 'non-scaling' ? injectNonScalingStroke(base) : base;
				map[buildKey(sw, scaling)] = svgToMiniDataURI(svgVariant);
			}
		}

		variants = { strokeWidth: swList, scaling: scList, map };
	}

	// Pick default src from variants; fallback to single optimized src.
	let src;
	let chosenDefaults = { strokeWidth: undefined, scaling: undefined };

	if (variants?.map) {
		const swList = variants.strokeWidth;
		const scList = variants.scaling;

		const chosenSw = Number.isFinite(defaultStrokeWidth)
			? swList.includes(defaultStrokeWidth)
				? defaultStrokeWidth
				: pickClosest(swList, defaultStrokeWidth)
			: (swList[0] ?? 1.5);

		const chosenScaling =
			defaultScaling && scList.includes(defaultScaling) ? defaultScaling : (scList[0] ?? 'scaling');

		src = variants.map[buildKey(chosenSw, chosenScaling)];

		chosenDefaults = { strokeWidth: chosenSw, scaling: chosenScaling };
	} else {
		src = svgToMiniDataURI(optimizedSvg);
	}

	const result = {
		src,
		width,
		height,
		flags: { colorful },
		// defaults now reflect the *effective* variant actually used for `src`
		defaults: chosenDefaults,
		variants,
	};

	return `export default ${JSON.stringify(result)};`;
};
