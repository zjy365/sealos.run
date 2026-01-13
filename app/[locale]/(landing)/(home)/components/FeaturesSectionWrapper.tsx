'use client';

import { CloudBoxIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { FeaturesProvider } from '../contexts/FeaturesContext';
import { FeaturesSection } from '../sections/FeaturesSection';
import { FeaturesDecoLineWrapper } from './FeaturesScene/FeaturesDecoLineWrapper';

export function FeaturesSectionWrapper() {
	return (
		<FeaturesProvider>
			<FeaturesDecoLineWrapper
				mask={[['0.5rem', '1.625rem']]}
				className='w-6 [--icon-size:1.5rem] sm:w-12 sm:[--icon-scale-base:2]'
			>
				<Icon
					src={CloudBoxIcon}
					className='size-full'
				/>
			</FeaturesDecoLineWrapper>
			<FeaturesSection />
		</FeaturesProvider>
	);
}
