import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';

export function CTASection() {
	return (
		<div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
			<div className='flex flex-col gap-4'>
				<p className='text-muted-foreground text-xl'>Sealos</p>
				<p className='text-3xl font-medium lg:text-4xl'>
					轻松实现复杂开发流程，让创意
					<span className='text-brand'>触手可及</span>
				</p>
			</div>
			<LandingOutlineButton
				href='#'
				size='lg'
			>
				立即体验
			</LandingOutlineButton>
		</div>
	);
}
