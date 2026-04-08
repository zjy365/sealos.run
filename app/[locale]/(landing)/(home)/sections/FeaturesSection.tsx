'use client';

import { useFeatures } from '../utils/features-context';
import { FeaturesSectionClient } from './FeaturesSectionClient';

export function FeaturesSection() {
	const { activeBoxIndex, setActiveBoxIndex } = useFeatures();

	return (
		<div className='flex w-full flex-col gap-16 pt-3'>
			<div className='flex w-full flex-col justify-between gap-6 md:flex-row md:items-center'>
				<div className='flex flex-col gap-4'>
					<h2 className='text-xl font-semibold sm:text-3xl'>云基座</h2>
					<p className='text-muted-foreground text-xs sm:text-base'>
						打通开发到运维全链路，让应用构建更智能、部署更敏捷。
					</p>
				</div>
			</div>

			<FeaturesSectionClient
				activeBoxIndex={activeBoxIndex}
				onIndexChange={setActiveBoxIndex}
			/>
		</div>
	);
}

export default FeaturesSection;
