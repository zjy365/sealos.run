'use client';

import type React from 'react';
import { useFeatures } from '../../contexts/FeaturesContext';
import { FeaturesDecoLine } from './FeaturesDecoLine';

interface FeaturesDecoLineWrapperProps {
	children?: React.ReactNode;
	iconY?: string;
	mask?: [string, string][];
}

export function FeaturesDecoLineWrapper({ children, iconY, mask }: FeaturesDecoLineWrapperProps) {
	const { activeBoxIndex, setActiveBoxIndex } = useFeatures();

	return (
		<FeaturesDecoLine
			iconY={iconY}
			mask={mask}
			activeIndex={activeBoxIndex}
			onIconClick={setActiveBoxIndex}
		>
			{children}
		</FeaturesDecoLine>
	);
}
