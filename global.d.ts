// biome-ignore lint/style/noRestrictedImports: Module merging need this
import 'react';

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}
