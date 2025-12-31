import type React from 'react';
import { siGithub } from 'simple-icons';
import { AlibabaCloudIcon, GoogleCloudIcon, TencentCloudIcon, VolcanoEngineIcon } from '@/assets/app-icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { SimpleIcon } from '@/libs/components/ui/simple-icon';

const cloudProviders: Array<{ name: string; icon: React.ReactNode }> = [
	{
		name: '谷歌云',
		icon: (
			<Icon
				src={GoogleCloudIcon}
				className='size-4 saturate-0'
				colorful
			/>
		),
	},
	{
		name: '腾讯云',
		icon: (
			<Icon
				src={TencentCloudIcon}
				className='size-4 saturate-0'
				colorful
			/>
		),
	},
	{
		name: '火山引擎',
		icon: (
			<Icon
				src={VolcanoEngineIcon}
				className='size-4 saturate-0'
				colorful
			/>
		),
	},
	{
		name: '阿里云',
		icon: (
			<Icon
				src={AlibabaCloudIcon}
				className='size-4 saturate-0'
				colorful
			/>
		),
	},
];

export function HeroSection() {
	return (
		<div className='flex w-full items-center justify-between gap-6'>
			<div className='flex flex-1 flex-col items-start gap-3'>
				<div className='flex items-center gap-6'>
					<p className='text-4xl leading-none font-semibold'>Sealos Cloud</p>
					<div className='flex items-center gap-4'>
						{cloudProviders.map((provider) => (
							<span
								key={provider.name}
								className='flex items-center gap-2 text-sm'
							>
								{provider.icon}
								{provider.name}
							</span>
						))}
					</div>
				</div>
				<h1 className='text-5xl leading-tight font-semibold'>以应用为中心的智能云操作系统</h1>
			</div>

			<div className='flex items-center py-6'>
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
	);
}
