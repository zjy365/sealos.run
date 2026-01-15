import Image from 'next/image';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { HeroBgImage } from '../assets';

export function HeroSection() {
	return (
		<div className='relative flex min-h-80 flex-col gap-12 py-12 lg:flex-row lg:items-center'>
			<div className='pointer-events-none absolute right-0 h-[150%] w-full lg:h-[200%]'>
				<Image
					src={HeroBgImage}
					alt='云原生数据库'
					className='overflow-visible object-cover object-[32%] lg:object-contain lg:object-[20rem_5rem] xl:object-[30rem_5rem]'
					fill
				/>
			</div>

			<div className='flex flex-1 flex-col gap-6'>
				<h1 className='text-4xl font-semibold'>云原生数据库</h1>
				<p className='text-muted-foreground max-w-2xl text-base sm:text-lg'>
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
		</div>
	);
}
