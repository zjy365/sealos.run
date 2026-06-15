'use client';

import { useFeatures } from '../utils/features-context';
import { FeaturesSectionClient } from './FeaturesSectionClient';

export function FeaturesSection() {
	const { activeBoxIndex, setActiveBoxIndex } = useFeatures();

	return (
		<div className='flex w-full flex-col gap-16 pt-3'>
			<div className='flex w-full flex-col justify-between gap-6 md:flex-row md:items-center'>
				<div className='flex flex-col gap-4 sm:-ml-8'>
					<h2 className='text-xl font-semibold sm:text-3xl'>工作台</h2>
					<p className='text-muted-foreground text-xs sm:text-base'>
						面向容器化应用的统一交付入口，覆盖部署配置、运行编排、访问接入与弹性治理。
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
