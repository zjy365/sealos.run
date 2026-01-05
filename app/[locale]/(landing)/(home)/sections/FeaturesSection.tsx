'use client';

import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { FeaturesScene } from '../components/FeaturesScene';
import { LaunchpadFeatures } from '../components/LaunchpadFeatures';

export function FeaturesSection() {
	return (
		<div className='flex w-full flex-col gap-16'>
			<div className='flex w-full items-center justify-between'>
				<div className='flex flex-col gap-4'>
					<h2 className='text-3xl font-semibold'>企业级智能云平台</h2>
					<p className='text-muted-foreground text-base'>
						集应用管理、云开发、数据服务、AI
						模型四大核心能力，提供开发到运维的全链路解决方案，让应用构建、部署和管理变得更简单。
					</p>
				</div>
				<LandingOutlineButton href=''>立即体验</LandingOutlineButton>
			</div>
			<div className='flex w-full flex-row items-center gap-16'>
				{/* Left: FeaturesScene */}
				<div className='shrink-0'>
					<FeaturesScene />
				</div>
				{/* Right: LaunchpadFeatures */}
				<div className='flex-1'>
					<LaunchpadFeatures />
				</div>
			</div>
		</div>
	);
}

export default FeaturesSection;
