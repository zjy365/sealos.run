'use client';

import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { useFeatures } from '../utils/features-context';
import { FeaturesSectionClient } from './FeaturesSectionClient';

export function FeaturesSection({ signinHref }: { signinHref: string }) {
	const { activeBoxIndex, setActiveBoxIndex } = useFeatures();

	return (
		<div className='flex w-full flex-col gap-16'>
			<div className='flex w-full flex-col justify-between gap-6 md:flex-row md:items-center'>
				<div className='flex flex-col gap-4'>
					<h2 className='text-xl font-semibold sm:text-3xl'>企业级<span className='text-brand'>智能上云</span>平台</h2>
					<p className='text-muted-foreground text-xs sm:text-base'>
						集应用设计、开发、测试、上线、运维为一体，提供开发到运维的全链路解决方案。
					</p>
				</div>
				<LandingOutlineButton
					className='w-fit'
					href={signinHref}
				>
					立即体验
				</LandingOutlineButton>
			</div>

			<FeaturesSectionClient
				activeBoxIndex={activeBoxIndex}
				onIndexChange={setActiveBoxIndex}
			/>
		</div>
	);
}

export default FeaturesSection;
