import { PlayIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';

export function CTASection() {
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
				<p className='text-muted-foreground text-sm'>立即体验 Sealos的自动化</p>
			</div>
			<div className='flex w-full flex-col gap-4 sm:w-auto sm:flex-row'>
				<LandingOutlineButton
					href='/docs/getting-started/deploy-docker-image'
					size='lg'
					borderStyle='dashed'
					className='w-full sm:w-auto'
					iconContainerClassName='bg-transparent group-hover:bg-transparent text-foreground group-hover:text-brand'
					icon={PlayIcon}
				>
					查看文档
				</LandingOutlineButton>
				<LandingOutlineButton
					href='https://cloud.sealos.run/?openapp=system-applaunchpad%3F%2Fapp%2Fedit%3F'
					size='lg'
					borderStyle='solid'
					className='w-full sm:w-auto'
				>
					前往创建
				</LandingOutlineButton>
			</div>
		</div>
	);
}
