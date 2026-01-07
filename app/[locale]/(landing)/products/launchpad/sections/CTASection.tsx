import { PlayIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';

export function CTASection() {
	return (
		<div className='flex items-end justify-between'>
			<div className='flex flex-col gap-4'>
				<p className='text-muted-foreground text-base'>立即体验 Sealos Docker 部署的智能化</p>
				<p className='text-4xl font-semibold'>
					加入数十万开发者，让容器部署变得
					<span className='text-brand'>简单高效</span>
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
