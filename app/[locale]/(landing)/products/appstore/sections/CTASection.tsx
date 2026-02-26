import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';

export function CTASection() {
	return (
		<div className='flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:items-end'>
			<div className='flex flex-col items-start justify-between gap-4'>
				<p className='text-xl font-medium whitespace-pre-wrap'>Sealos</p>
				<div className='flex flex-col justify-center'>
					<p className='text-2xl font-semibold whitespace-pre-wrap sm:text-3xl lg:text-4xl'>
						轻松实现复杂开发流程，让创意
						<span className='text-brand'>触手可及</span>
					</p>
				</div>
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
