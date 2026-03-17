import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Config } from '@/libs/config';

export function CTASection() {
	const { signinLink } = Config.components.navbar;

	return (
		<div className='flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:items-end'>
			<div className='flex flex-col items-start justify-between gap-4'>
				<p className='text-xl font-medium whitespace-pre-wrap'>Cost Efficiency</p>
				<div className='flex flex-col justify-center'>
					<p className='text-2xl font-semibold text-balance whitespace-pre-wrap sm:text-3xl lg:text-4xl'>
						告别预付费捆绑，享受<span className='text-brand'>极致</span>的云成本效益
					</p>
				</div>
			</div>
			<LandingOutlineButton
				href={signinLink}
				size='lg'
			>
				免费试用
			</LandingOutlineButton>
		</div>
	);
}
