import type { FeaturesConfig } from '../../utils/features-config.types';
import { FeaturesRenderer } from './FeaturesRenderer';

interface FeaturesImageProps {
	config: FeaturesConfig;
}

export function FeaturesImage({ config }: FeaturesImageProps) {
	return (
		<div className='w-full flex-1 overflow-x-scroll'>
			<FeaturesRenderer engineFeatures={config.engineFeatures} />
		</div>
	);
}
