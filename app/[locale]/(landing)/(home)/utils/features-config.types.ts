import type React from 'react';

export type ArrowDirection = 'up' | 'down' | 'left' | 'right';

export type FeatureItem = {
	icon: React.ReactNode;
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
			itemsPerRow?: number;
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
