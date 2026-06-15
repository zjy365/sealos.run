import Image from 'next/image';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { HeroBgImage } from '../assets';

export function HeroSection() {
	return (
		<div className='relative flex min-h-140 flex-col items-end gap-6 py-12 text-right sm:min-h-160'>
			<div className='pointer-events-none absolute inset-0 z-0'>
				<Image
					src={HeroBgImage}
					alt=''
					className='object-contain object-left'
					fill
				/>
			</div>

			<div className='relative z-10 flex flex-col items-end lg:pt-28'>
				<h1 className='text-5xl font-semibold'>
					企业级云原生
					<span className='text-brand'>私有云</span>
				</h1>
				<div className='text-muted-foreground mt-12 flex flex-col'>
					<p className='text-lg'>基于 Sealos 云操作系统,为企业提供安全可控、开箱即用的私有云平台。</p>
					<p className='text-lg'>一键部署 Kubernetes,让云原生触手可及</p>
				</div>
				<div className='mt-20 flex items-center sm:mt-28'>
					<LandingOutlineButton
						href='https://fael3z0zfze.feishu.cn/share/base/form/shrcnamY6ULVuhDVLtPeA2izC5f'
						size='lg'
						target='_blank'
						rel='noreferrer'
					>
						获取场景解决方案
					</LandingOutlineButton>
				</div>
			</div>
		</div>
	);
}
