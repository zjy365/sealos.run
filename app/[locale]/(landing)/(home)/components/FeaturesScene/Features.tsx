import type { FeaturesConfig } from '../../utils/features-config.types';
import { FeaturesHeader } from './FeaturesHeader';
import { FeaturesImage } from './FeaturesImage';
import { FeaturesList } from './FeaturesList';

interface FeaturesProps {
	config: FeaturesConfig;
}

export function Features({ config }: FeaturesProps) {
	return (
		<div className='flex flex-1 flex-col gap-6'>
			<FeaturesHeader config={config} />
			<div className='flex w-full flex-wrap items-start gap-8'>
				<FeaturesList config={config} />
				<FeaturesImage config={config} />
			</div>
		</div>
	);
}
