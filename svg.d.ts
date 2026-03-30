declare module '*.svg' {
	// Copied from `InlinedSvgData`
	const value: {
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
				ranges: import('./libs/types').Range[];
			};
			vectorEffect: {
				ph: string;
				ranges: import('./libs/types').Range[];
				values: { scaling: string; 'non-scaling': string };
			};
		};

		meta?: { path: string };
	};

	export default value;
}
