/**
 * For use with our svg inliner plugin to generate image data for each stroke width.
 */
export type InlinedSvgData = {
	src: string;
	width: number;
	height: number;
	flags?: { colorful?: boolean };
	defaults?: { strokeWidth?: number; scaling?: 'scaling' | 'non-scaling' };
	variants?: {
		strokeWidth: number[];
		scaling: ('scaling' | 'non-scaling')[];
		map: Record<string, string>;
	};
};
