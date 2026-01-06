import Image from 'next/image';
import { LaunchpadBoxImage } from '@/assets/app-boxes';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Hero1Image, Hero2Image, Hero3Image } from '../assets';

export function HeroSection() {
	return (
		<div className='flex flex-col items-center gap-8 py-12'>
			<div className='flex flex-col items-center gap-6'>
				<div className='flex items-center gap-6'>
					<Image
						src={LaunchpadBoxImage}
						alt='App Launchpad'
						className='size-24'
					/>
					<h1 className='text-4xl font-semibold'>应用部署解决方案</h1>
				</div>
				<p className='text-muted-foreground text-center text-lg'>
					无需购买云服务器，Sealos提供 Docker 容器可视化操作， 支持微服务到单体应用全栈部署
				</p>
			</div>
			<LandingOutlineButton
				href='#'
				size='lg'
			>
				立即体验
			</LandingOutlineButton>
			<div
				className='relative mt-12 w-full'
				style={{
					maskImage: 'linear-gradient(to bottom, black, transparent)',
					WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
				}}
			>
				<div className='relative flex items-end justify-center'>
					<div
						className='relative w-full scale-80'
						style={{ transformOrigin: 'center bottom' }}
					>
						<Image
							src={Hero1Image}
							alt='应用部署配置页面 1'
							className='w-full'
						/>
					</div>
					<div className='relative z-10 -mx-128 w-full'>
						<Image
							src={Hero2Image}
							alt='应用部署配置页面 2'
							className='w-full'
						/>
					</div>
					<div
						className='relative w-full scale-80'
						style={{ transformOrigin: 'center bottom' }}
					>
						<Image
							src={Hero3Image}
							alt='应用部署配置页面 3'
							className='w-full'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
