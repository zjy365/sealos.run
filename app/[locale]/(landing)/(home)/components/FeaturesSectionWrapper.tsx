'use client';

import { CloudBoxIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { FeaturesProvider } from '../contexts/FeaturesContext';
import { FeaturesSection } from '../sections/FeaturesSection';
import { FeaturesDecoLineWrapper } from './FeaturesScene/FeaturesDecoLineWrapper';

export function FeaturesSectionWrapper() {
	return (
		<FeaturesProvider>
			<FeaturesDecoLineWrapper className='[--icon-base-size:1.5rem] sm:[--icon-base-size:3rem]'>
				<Icon
					src={CloudBoxIcon}
					className='size-full'
				/>
			</FeaturesDecoLineWrapper>
			<FeaturesSection />
		</FeaturesProvider>
	);
}
