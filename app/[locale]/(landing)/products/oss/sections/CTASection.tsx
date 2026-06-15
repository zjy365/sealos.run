import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';

type CTASectionProps = {
	createHref: string;
	docHref: string;
};

export function CTASection({ createHref, docHref }: CTASectionProps) {
	return (
		<div className='flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:items-end'>
			<div className='flex flex-col items-start justify-between gap-4'>
				<p className='text-xl font-medium whitespace-pre-wrap'>现在开始构建</p>
				<div className='flex flex-col justify-center'>
					<p className='text-2xl font-semibold text-balance whitespace-pre-wrap sm:text-3xl lg:text-4xl'>
						无需预付费与<span className='text-brand'>预估容量</span>，低成本构建您的对象存储基座
					</p>
				</div>
			</div>
			<div className='flex w-full flex-col gap-5 sm:w-auto sm:flex-row'>
				<LandingOutlineButton
					href={docHref}
					size='lg'
					borderStyle='dashed'
					className='w-full sm:w-auto'
				>
					查看文档
				</LandingOutlineButton>
				<LandingOutlineButton
					href={createHref}
					size='lg'
					className='w-full sm:w-auto'
				>
					立即创建
				</LandingOutlineButton>
			</div>
		</div>
	);
}
