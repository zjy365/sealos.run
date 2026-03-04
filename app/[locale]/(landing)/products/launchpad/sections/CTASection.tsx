import { PlayIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Config } from '@/libs/config';

export function CTASection() {
	const { contactLink, signinLink } = Config.components.navbar;

	return (
		<div className='flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:items-end'>
			<div className='flex flex-col items-start justify-between gap-4'>
				<div className='text-muted-foreground flex flex-wrap gap-2 text-sm'>
					<span>「一键部署」</span>
					<span>「弹性伸缩」</span>
					<span>「按量计费」</span>
				</div>
				<div className='flex flex-col justify-center'>
					<p className='text-2xl font-semibold text-balance whitespace-pre-wrap sm:text-3xl lg:text-4xl'>
						加入数十万开发者，让容器部署变得
						<span className='text-brand'>简单高效</span>
					</p>
				</div>
				<p className='text-muted-foreground text-sm'>立即体验 Sealos Docker 部署的智能化</p>
			</div>
			<div className='flex w-full flex-col gap-4 sm:w-auto sm:flex-row'>
				<LandingOutlineButton
					href={contactLink}
					size='lg'
					borderStyle='dashed'
					className='w-full sm:w-auto'
					iconContainerClassName='bg-transparent group-hover:bg-transparent text-foreground group-hover:text-brand'
					icon={PlayIcon}
				>
					预约演示
				</LandingOutlineButton>
				<LandingOutlineButton
					href={signinLink}
					size='lg'
					borderStyle='solid'
					className='w-full sm:w-auto'
				>
					立即注册
				</LandingOutlineButton>
			</div>
		</div>
	);
}
