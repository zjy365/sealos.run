// biome-ignore lint/style/noRestrictedImports: Module merging need this
import 'react';

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}

declare module '*.module.css' {
	const classes: { readonly [key: string]: string };
	export default classes;
}
