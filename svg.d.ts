declare module '*.svg' {
	const value: {
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
	export default value;
}
