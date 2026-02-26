import type { StaticImageData } from 'next/image';

export type ArrowDirection = 'up' | 'down' | 'left' | 'right';

export type FeatureItem = {
	icon: StaticImageData;
	title: string;
	description: string;
};

export type BlockItem = string | { type: 'arrow'; direction?: ArrowDirection };

export type EngineFeature =
	| {
			type: 'arrow';
			title?: string;
			direction?: ArrowDirection;
			visible?: boolean;
	  }
	| {
			type: 'block';
			title?: string;
			items: BlockItem[] | BlockItem[][];
			orientation?: 'horizontal' | 'vertical';
			border?: boolean;
			children?: EngineFeature[];
	  }
	| {
			type: 'row';
			items: EngineFeature[];
	  };

export type FeaturesConfig = {
	title: string;
	description: React.ReactNode;
	features: FeatureItem[];
	engineFeatures: EngineFeature[];
};
