import Image from 'next/image';
import { OssBoxImage } from '@/assets/app-boxes';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { HeroBgImage } from './assets';

export function HeroSection() {
	return (
		<div className='flex flex-col py-12'>
			<div className='flex flex-col items-start lg:flex-row lg:items-center'>
				<div className='flex flex-1 flex-col gap-6'>
					<p className='text-2xl font-medium'>云原生对象存储</p>
					<h1 className='text-4xl font-semibold lg:text-5xl'>
						安全、可扩展、高性能的
						<span className='text-brand'>对象存储服务</span>
					</h1>
				</div>
				<div className='shrink-0'>
					<Image
						src={OssBoxImage}
						alt='对象存储'
						className='size-24'
					/>
				</div>
			</div>

			<div className='border-brand mt-28 mb-12 h-px w-full border-t border-dashed' />

			<div className='relative min-h-50'>
				<div className='ml-88 flex max-w-xs flex-col items-start gap-12'>
					<p className='text-muted-foreground text-xl lg:text-2xl'>
						支持海量数据存储，为你的应用提供可靠的云端存储解决方案。
					</p>
					<LandingOutlineButton
						href='#'
						size='lg'
					>
						创建存储桶
					</LandingOutlineButton>
				</div>

				<div className='absolute top-0 -z-10 h-full w-full'>
					<Image
						src={HeroBgImage}
						className='overflow-visible object-cover object-center'
						alt=''
						fill
					/>
				</div>
			</div>
		</div>
	);
}
