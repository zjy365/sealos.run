import Image from 'next/image';
import { OssBoxImage } from '@/assets/app-boxes';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { HeroBgImage } from '../assets';

type HeroSectionProps = {
	createHref: string;
};

export function HeroSection({ createHref }: HeroSectionProps) {
	return (
		<div className='flex flex-col py-12'>
			<div className='flex flex-col items-start lg:flex-row lg:items-center'>
				<div className='flex flex-1 flex-col'>
					<p className='text-2xl font-medium'>
						兼容
						<span className='text-brand'> S3 </span>协议
					</p>
					<h1 className='mt-8 text-4xl font-semibold lg:text-5xl'>S3 对象存储</h1>

					<p className='text-muted-foreground mt-12 max-w-3xl text-xl lg:text-2xl'>
						兼容主流 S3 协议与工具链，适用于静态资源托管、数据备份归档和 AI 数据集存储。按需付费，从 GB 到
						PB 无缝扩展。
					</p>
					<LandingOutlineButton
						href={createHref}
						size='lg'
						className='mt-12 w-fit'
					>
						立即创建
					</LandingOutlineButton>
				</div>
				<div className='mr-52.75 mb-12 hidden shrink-0 self-end lg:block'>
					<Image
						src={OssBoxImage}
						alt='对象存储'
						className='size-36'
					/>
				</div>
			</div>

			<div className='relative min-h-80'>
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
