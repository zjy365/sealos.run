'use client';

import { CloudBoxIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { FeaturesProvider } from '../contexts/FeaturesContext';
import { FeaturesSection } from '../sections/FeaturesSection';
import { FeaturesDecoLineWrapper } from './FeaturesScene/FeaturesDecoLineWrapper';

export function FeaturesSectionWrapper() {
	return (
		<FeaturesProvider>
			<FeaturesDecoLineWrapper mask={[['1rem', '3.25rem']]}>
				<Icon
					src={CloudBoxIcon}
					className='size-full'
				/>
			</FeaturesDecoLineWrapper>
			<FeaturesSection />
		</FeaturesProvider>
	);
}
