import Image from 'next/image';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { HeroBgImage } from '../assets';

type HeroSectionProps = {
	createHref: string;
};

export function HeroSection({ createHref }: HeroSectionProps) {
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
				<h1 className='text-4xl font-semibold'>云数据库</h1>
				<p className='text-muted-foreground max-w-2xl text-base sm:text-lg'>
					一键部署 MySQL、PostgreSQL、Redis、MongoDB 等数据库服务，内置自动备份、故障自愈、
					监控告警与按量计费，适合生产环境快速上线。
				</p>
				<LandingOutlineButton
					href={createHref}
					size='lg'
					className='w-fit'
				>
					立即创建
				</LandingOutlineButton>
			</div>
		</div>
	);
}
