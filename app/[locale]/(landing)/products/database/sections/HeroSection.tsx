import Image from 'next/image';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { HeroBgImage } from '../assets';

export function HeroSection() {
	return (
		<div className='relative flex min-h-80 flex-col gap-12 py-12 lg:flex-row lg:items-center'>
			<div className='flex flex-1 flex-col gap-6'>
				<h1 className='text-4xl font-semibold'>云原生数据库</h1>
				<p className='text-muted-foreground max-w-2xl text-lg'>
					全面兼容主流数据库生态，分布式存储，支持快速扩展与无缝迁移
				</p>
				<LandingOutlineButton
					href='#'
					size='lg'
					className='w-fit'
				>
					立即体验
				</LandingOutlineButton>
			</div>

			<div className='pointer-events-none absolute right-0 h-[200%] w-full object-right'>
				<Image
					src={HeroBgImage}
					alt='云原生数据库'
					className='translate-x-1/5 translate-y-1/12 object-contain'
					fill
				/>
			</div>
		</div>
	);
}
