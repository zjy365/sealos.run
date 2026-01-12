import type { StaticImageData } from 'next/image';
import { siGithub } from 'simple-icons';
import { AlibabaCloudIcon, GoogleCloudIcon, TencentCloudIcon, VolcanoEngineIcon } from '@/assets/app-icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { SimpleIcon } from '@/libs/components/ui/simple-icon';
import { HeroBg } from '../components/HeroBg';

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

export function HeroSection() {
	return (
		<div className='relative flex flex-col justify-between'>
			<HeroBg />

			<div className='container flex flex-col justify-between gap-6 px-6 lg:flex-row'>
				<div className='relative z-10 flex flex-1 flex-col gap-3'>
					<div className='flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:gap-6'>
						<p className='text-2xl leading-none font-semibold md:text-3xl xl:text-4xl'>Sealos Cloud</p>
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
					<h1 className='text-4xl leading-tight font-semibold sm:text-[2.625rem] xl:text-5xl'>
						以应用为中心的智能云操作系统
					</h1>
				</div>

				<div className='relative flex flex-row-reverse items-center justify-end lg:flex-row lg:justify-start'>
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
