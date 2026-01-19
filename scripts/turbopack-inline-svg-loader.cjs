// Modified from: https://github.com/vitalets/turbopack-inline-svg-loader
// Copyright (c) 2025 Vitaliy Potapov, licensed under MIT License.

/**
 * Turbopack loader: SVG -> optimized data URI + dimensions.
 *
 * Exports:
 *   { src, width, height, flags, defaults, vars, meta? }
 *
 * Build directives (root <svg>, build-time only; removed from output):
 * - data-colorful="true"
 * - data-default-stroke-width="<number>"
 * - data-default-vector-effect="<list>" (e.g. "none" or "non-scaling-stroke non-rotation")
 *
 * Pipeline:
 * 1) Read defaults from original source (root <svg> only)
 * 2) SVGO optimize AND remove data-* directives
 * 3) Inject placeholders (stroke-width + vector-effect) AFTER SVGO
 * 4) Convert to data URI
 */

const { optimize } = require('svgo');
const svgToMiniDataURI = require('mini-svg-data-uri');
const { imageSize } = require('image-size');

const DEFAULT_STROKE_WIDTH = 1.5;

const VARS = {
	strokeWidth: { ph: '__SW__' },
	vectorEffect: { ph: '__VE__' },
};

/** @param {string} s */
function escapeRegExp(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** @param {string} svg */
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

/** @param {string|undefined} v */
function parseNumber(v) {
	if (v == null) return undefined;
	const n = Number(String(v).trim());
	return Number.isFinite(n) && n > 0 ? n : undefined;
}

/**
 * Normalize vector-effect list.
 * - Accepts space/comma separated string.
 * - Removes duplicates.
 * - If "none" appears with others, drop "none" (unless it's the only one).
 * @param {string|undefined} v
 * @returns {string|undefined}
 */
function normalizeVectorEffect(v) {
	if (v == null) return undefined;
	const raw = String(v).trim();
	if (!raw) return undefined;

	const parts = raw
		.split(/[,\s]+/)
		.map((s) => s.trim())
		.filter(Boolean);

	if (!parts.length) return undefined;

	const seen = new Set();
	const uniq = [];
	for (const p of parts) {
		if (!seen.has(p)) {
			seen.add(p);
			uniq.push(p);
		}
	}

	if (uniq.includes('none') && uniq.length > 1) {
		return uniq.filter((x) => x !== 'none').join(' ');
	}
	return uniq.join(' ');
}

/**
 * Inject/replace root stroke-width with placeholder.
 * Call AFTER SVGO.
 * @param {string} svg
 * @param {string} ph
 */
function injectStrokeWidthPlaceholder(svg, ph) {
	let out = svg.replace(/\sstroke-width=(['"])[\s\S]*?\1/gi, '');
	out = out.replace(/<svg\b([^>]*)>/i, (_m, attrs) => `<svg${attrs} stroke-width="${ph}">`);
	return out;
}

/**
 * Inject/replace vector-effect placeholder on common shape elements.
 * Call AFTER SVGO.
 * Keeps the original closing (`>` or `/>`) intact.
 * @param {string} svg
 * @param {string} ph
 */
function injectVectorEffectPlaceholder(svg, ph) {
	const tags = ['path', 'line', 'rect', 'circle', 'ellipse', 'polyline', 'polygon', 'use', 'g'];
	const re = new RegExp(`<(${tags.join('|')})\\b([^>]*?)(\\s*\\/?)>`, 'gi');

	return svg.replace(re, (m, tag, attrs, slash) => {
		if (/\bvector-effect\s*=/i.test(attrs)) {
			const attrs2 = attrs.replace(/\bvector-effect\s*=\s*(["'])[\s\S]*?\1/i, `vector-effect="${ph}"`);
			return `<${tag}${attrs2}${slash}>`;
		}
		const sep = attrs && !/\s$/.test(attrs) ? ' ' : '';
		return `<${tag}${attrs}${sep}vector-effect="${ph}"${slash}>`;
	});
}

/**
 * Find ALL placeholder ranges in a data URI.
 * @param {string} dataUri
 * @param {string} ph
 */
function findAllPlaceholderRanges(dataUri, ph) {
	const out = [];
	let at = 0;
	while (true) {
		const idx = dataUri.indexOf(ph, at);
		if (idx < 0) break;
		out.push({ start: idx, end: idx + ph.length });
		at = idx + ph.length;
	}
	return out;
}

module.exports = function (content) {
	this.cacheable?.();

	const resourcePath = this.resourcePath || '';
	const isDev = process.env.NODE_ENV !== 'production';

	const { width, height } = imageSize(Buffer.from(content));

	// 1) Read defaults from original source (root only)
	const colorful = truthy(readAttrFromRoot(content, 'data-colorful'));
	const defaultStrokeWidth =
		parseNumber(readAttrFromRoot(content, 'data-default-stroke-width')) ?? DEFAULT_STROKE_WIDTH;
	const defaultVectorEffect =
		normalizeVectorEffect(readAttrFromRoot(content, 'data-default-vector-effect')) ?? 'none';

	// 2) SVGO optimize AND remove data-* directives
	const optimizedSvg = optimize(content, {
		multipass: true,
		plugins: [{ name: 'removeAttrs', params: { attrs: 'data-.*' } }],
	}).data;

	// 3) Inject placeholders AFTER SVGO
	const injectedSvg = injectVectorEffectPlaceholder(
		injectStrokeWidthPlaceholder(optimizedSvg, VARS.strokeWidth.ph),
		VARS.vectorEffect.ph,
	);

	// 4) Convert to data URI
	const src = svgToMiniDataURI(injectedSvg);

	// Ranges (now unified as Range[])
	const strokeWidthRanges = findAllPlaceholderRanges(src, VARS.strokeWidth.ph);
	const vectorEffectRanges = findAllPlaceholderRanges(src, VARS.vectorEffect.ph);

	if (strokeWidthRanges.length === 0 || vectorEffectRanges.length === 0) {
		const snippet = src.slice(0, 260);
		throw new Error(
			`[inline-svg-loader] placeholders missing after pipeline.\n` +
				`file: ${resourcePath}\n` +
				`strokeWidthPHCount: ${strokeWidthRanges.length}\n` +
				`vectorEffectPHCount: ${vectorEffectRanges.length}\n` +
				`src[0..260]: ${snippet}`,
		);
	}

	const out = {
		src, // contains placeholders
		width,
		height,
		flags: { colorful },
		defaults: {
			strokeWidth: defaultStrokeWidth,
			vectorEffect: defaultVectorEffect,
		},
		vars: {
			strokeWidth: {
				ph: VARS.strokeWidth.ph,
				ranges: strokeWidthRanges,
			},
			vectorEffect: {
				ph: VARS.vectorEffect.ph,
				ranges: vectorEffectRanges,
				values: {
					scaling: 'none',
					'non-scaling': 'non-scaling-stroke',
				},
			},
		},
		...(isDev ? { meta: { path: resourcePath } } : null),
	};

	return `export default ${JSON.stringify(out)};`;
};
