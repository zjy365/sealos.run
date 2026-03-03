'use client';

import { CloudBoxIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { FeaturesSection } from '../sections/FeaturesSection';
import { FeaturesProvider } from '../utils/features-context';
import { FeaturesDecoLineWrapper } from './FeaturesScene/FeaturesDecoLineWrapper';

export function FeaturesSectionWrapper({ signinHref }: { signinHref: string }) {
	return (
		<FeaturesProvider>
			<FeaturesDecoLineWrapper className='[--icon-base-size:1.5rem] sm:[--icon-base-size:3rem]'>
				<Icon
					src={CloudBoxIcon}
					className='size-full'
				/>
			</FeaturesDecoLineWrapper>
			<FeaturesSection signinHref={signinHref} />
		</FeaturesProvider>
	);
}
