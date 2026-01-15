import { PlayIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';

export function CTASection() {
	return (
		<div className='flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:items-end'>
			<div className='flex flex-col items-start justify-between gap-4'>
				<p className='text-muted-foreground text-base'>准备开始了吗？</p>
				<div className='flex flex-col justify-center'>
					<p className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
						加入 <span className='text-brand'>数千名开发者</span> 的选择
					</p>
				</div>
			</div>
			<div className='flex gap-5'>
				<LandingOutlineButton
					href='#'
					size='lg'
					borderStyle='dashed'
					icon={PlayIcon}
					className='h-11 gap-4 pr-2 pl-4 text-base sm:h-14 sm:gap-6 sm:px-6 sm:text-xl'
					iconContainerClassName='bg-transparent group-hover:bg-transparent border-0 h-8 w-8 sm:h-10 sm:w-10'
					iconColor='var(--color-foreground)'
				>
					预约演示
				</LandingOutlineButton>
				<LandingOutlineButton
					href='#'
					size='lg'
					className='h-11 gap-4 pr-1 pl-4 text-base sm:h-14 sm:gap-6 sm:px-6 sm:text-xl'
					iconContainerClassName='size-9'
				>
					免费试用
				</LandingOutlineButton>
			</div>
		</div>
	);
}
