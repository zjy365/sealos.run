import { PlayIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Config } from '@/libs/config';

export function CTASection() {
	const { contactLink, signinLink } = Config.components.navbar;

	return (
		<div className='flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:items-end'>
			<div className='flex flex-col items-start justify-between gap-4'>
				<p className='text-muted-foreground text-base'>
					Sealos 陪伴数十万开发者，保障每一次与数据读写的安全极速
				</p>
				<div className='flex flex-col justify-center'>
					<p className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
						体验 <span className='text-brand'>Serverless</span> 时代的数据库管理方式
					</p>
				</div>
			</div>
			<div className='flex w-full flex-col gap-5 sm:w-auto sm:flex-row'>
				<LandingOutlineButton
					href={contactLink}
					size='lg'
					borderStyle='dashed'
					className='w-full sm:w-auto'
					iconContainerClassName='bg-transparent group-hover:bg-transparent text-foreground group-hover:text-brand'
					icon={PlayIcon}
				>
					查看文档
				</LandingOutlineButton>
				<LandingOutlineButton
					href={signinLink}
					size='lg'
					className='h-11 w-full gap-4 pr-1 pl-4 text-base sm:h-14 sm:w-auto sm:gap-6 sm:px-6 sm:text-xl'
					iconContainerClassName='size-9'
				>
					开始您的云原生之旅
				</LandingOutlineButton>
			</div>
		</div>
	);
}
