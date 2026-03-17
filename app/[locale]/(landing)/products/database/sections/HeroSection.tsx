import Image from 'next/image';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Config } from '@/libs/config';
import { HeroBgImage } from '../assets';

export function HeroSection() {
	const { signinLink } = Config.components.navbar;

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
				<h1 className='text-4xl font-semibold'>高可用数据库</h1>
				<p className='text-muted-foreground max-w-2xl text-base sm:text-lg'>
					内置自动备份、故障自愈与监控告警，告别繁琐的主从配置与集群维护。
				</p>
				<LandingOutlineButton
					href={signinLink}
					size='lg'
					className='w-fit'
				>
					立即创建
				</LandingOutlineButton>
			</div>
		</div>
	);
}
