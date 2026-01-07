import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { siGithub } from 'simple-icons';
import {
	AiproxyBoxImage,
	AppstoreBoxImage,
	BrainBoxImage,
	DatabaseBoxImage,
	DevboxBoxImage,
	OssBoxImage,
} from '@/assets/app-boxes';
import { AlibabaCloudIcon, GoogleCloudIcon, TencentCloudIcon, VolcanoEngineIcon } from '@/assets/app-icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { SimpleIcon } from '@/libs/components/ui/simple-icon';
import { HeroBgImage } from '../assets';

const cloudProviders: Array<{ name: string; icon: StaticImageData }> = [
	{
		name: '谷歌云',
		icon: GoogleCloudIcon,
	},
	{
		name: '腾讯云',
		icon: TencentCloudIcon,
	},
	{
		name: '火山引擎',
		icon: VolcanoEngineIcon,
	},
	{
		name: '阿里云',
		icon: AlibabaCloudIcon,
	},
];

const appBoxIcons = [
	{ id: 'aiproxy', src: AiproxyBoxImage, x: 952.06, y: 319.58 },
	{ id: 'appstore', src: AppstoreBoxImage, x: 583.56, y: 106.5 },
	{ id: 'brain', src: BrainBoxImage, x: 276.56, y: 213.08 },
	{ id: 'database', src: DatabaseBoxImage, x: 461.06, y: 319.08 },
	{ id: 'devbox', src: DevboxBoxImage, x: 952.06, y: 107.58 },
	{ id: 'oss', src: OssBoxImage, x: 767.86, y: 425.58 },
];

export function HeroSection() {
	return (
		<div className='relative flex w-full flex-col justify-between'>
			{/* Hero Background Image */}
			<div className='hero-bg-container relative top-0 left-0 z-0 w-full overflow-hidden'>
				<Image
					src={HeroBgImage}
					alt=''
					className='h-auto w-auto'
				/>
				<svg
					className='absolute top-0 h-full w-full'
					viewBox='0 0 1440 718'
					role='graphics-symbol'
				>
					<style>
						{`
							.app-box-icon {
								opacity: 0;
								transition: opacity 0.3s ease;
								cursor: pointer;
							}
							.app-box-icon:hover {
								opacity: 1;
							}
						`}
					</style>
					{appBoxIcons.map((icon) => (
						<g
							key={icon.id}
							className='app-box-icon'
						>
							<image
								href={icon.src.src}
								x={icon.x}
								y={icon.y}
								width='123.35'
								height='142.68'
							/>
						</g>
					))}
				</svg>
			</div>

			<div className='flex justify-between gap-6'>
				<div className='relative z-10 flex flex-1 flex-col items-start gap-3'>
					<div className='flex items-center gap-6'>
						<p className='text-4xl leading-none font-semibold'>Sealos Cloud</p>
						<div className='flex items-center gap-4'>
							{cloudProviders.map((provider) => (
								<span
									key={provider.name}
									className='flex items-center gap-2 text-sm'
								>
									<Icon
										src={provider.icon}
										className='size-4 saturate-0'
										colorful
									/>
									{provider.name}
								</span>
							))}
						</div>
					</div>
					<h1 className='text-5xl leading-tight font-semibold'>以应用为中心的智能云操作系统</h1>
				</div>

				<div className='relative z-10 flex items-center py-6'>
					<Button
						variant='ghost'
						className='h-14 px-6!'
					>
						<span className='text-sm leading-none'>16.0 K</span>
						<SimpleIcon
							d={siGithub.path}
							className='size-6'
						/>
					</Button>
					<LandingOutlineButton
						href=''
						size='lg'
					>
						开始体验
					</LandingOutlineButton>
				</div>
			</div>
		</div>
	);
}
