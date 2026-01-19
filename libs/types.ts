export type Range = { start: number; end: number };

export type ScalingMode = 'scaling' | 'non-scaling';
export type VectorEffectInput = string | string[];

export type InlinedSvgData = {
	src: string;
	width: number;
	height: number;

	flags?: { colorful?: boolean };

	defaults?: {
		strokeWidth: number;
		vectorEffect: string;
	};

	vars?: {
		strokeWidth: {
			ph: string;
			ranges: Range[];
		};
		vectorEffect: {
			ph: string;
			ranges: Range[];
			values: { scaling: string; 'non-scaling': string };
		};
	};

	meta?: { path: string };
};
