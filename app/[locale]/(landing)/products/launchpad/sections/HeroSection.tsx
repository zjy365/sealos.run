import Image from 'next/image';
import { LaunchpadBoxImage } from '@/assets/app-boxes';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Hero1Image, Hero2Image, Hero3Image, HeroBgImage } from '../assets';

export function HeroSection() {
	return (
		<div className='flex flex-col items-center gap-8 py-12'>
			<div className='absolute top-0 -z-10 h-96 w-full opacity-60'>
				<Image
					src={HeroBgImage}
					className='overflow-visible object-cover object-top lg:object-contain'
					alt=''
					fill
				/>
			</div>

			<div className='flex flex-col items-center gap-6'>
				<div className='flex flex-col items-center gap-6 sm:flex-row'>
					<Image
						src={LaunchpadBoxImage}
						alt='App Launchpad'
						className='size-24'
					/>
					<h1 className='text-4xl font-semibold sm:text-5xl'>Docker 应用部署</h1>
				</div>
				<p className='text-muted-foreground text-center text-base sm:text-lg'>
					无需编写 YAML，图形化配置即可一键部署 Docker 容器应用，支持自动 HTTPS、弹性伸缩与按量计费，
					适合网站、API、微服务和内部工具快速上线。
				</p>
			</div>
			<LandingOutlineButton
				href='https://cloud.sealos.run/?openapp=system-applaunchpad%3F%2Fapp%2Fedit%3F'
				size='lg'
			>
				立即创建
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
					<div className='relative z-10 -mx-56 w-full md:-mx-96 lg:-mx-128'>
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
