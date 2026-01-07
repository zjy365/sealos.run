import { PlayIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';

export function CTASection() {
	return (
		<div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
			<div className='flex flex-col gap-4'>
				<p className='text-muted-foreground text-base'>准备开始了吗？</p>
				<p className='text-4xl font-medium'>
					加入 <span className='text-brand'>数千名开发者</span> 的选择
				</p>
			</div>
			<div className='flex gap-5'>
				<LandingOutlineButton
					href='#'
					size='lg'
					borderStyle='dashed'
					icon={
						<Icon
							src={PlayIcon}
							className='size-6'
						/>
					}
					iconContainerClassName='bg-transparent group-hover:bg-transparent border-0'
					iconColor='var(--color-foreground)'
				>
					预约演示
				</LandingOutlineButton>
				<LandingOutlineButton
					href='#'
					size='lg'
				>
					免费试用
				</LandingOutlineButton>
			</div>
		</div>
	);
}
