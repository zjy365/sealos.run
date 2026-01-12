'use client';

import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { useFeatures } from '../contexts/FeaturesContext';
import { FeaturesSectionClient } from './FeaturesSectionClient';

export function FeaturesSection() {
	const { activeBoxIndex, setActiveBoxIndex } = useFeatures();

	return (
		<div className='flex w-full flex-col gap-16'>
			<div className='flex w-full flex-col justify-between gap-6 md:flex-row md:items-center'>
				<div className='flex flex-col gap-4'>
					<h2 className='text-xl font-semibold sm:text-3xl'>企业级智能云平台</h2>
					<p className='text-muted-foreground text-xs sm:text-base'>
						集应用管理、云开发、数据服务、AI
						模型四大核心能力，提供开发到运维的全链路解决方案，让应用构建、部署和管理变得更简单。
					</p>
				</div>
				<LandingOutlineButton
					className='w-fit'
					href=''
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
