'use client';

import type React from 'react';
import { FeaturesDecoLine } from './FeaturesDecoLine';

interface FeaturesDecoLineWrapperProps {
	children?: React.ReactNode;
	iconY?: string;
	mask?: [string, string][];
	activeIndex?: number | null;
}

export function FeaturesDecoLineWrapper({ children, iconY, mask, activeIndex }: FeaturesDecoLineWrapperProps) {
	return (
		<FeaturesDecoLine
			iconY={iconY}
			mask={mask}
			activeIndex={activeIndex}
		>
			{children}
		</FeaturesDecoLine>
	);
}
