import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';

export function CTASection() {
	return (
		<div className='flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:items-end'>
			<div className='flex flex-col items-start justify-between gap-4'>
				<div className='text-muted-foreground flex flex-wrap gap-2 text-sm'>
					<span>「统一接口」</span>
					<span>「统一计费」</span>
					<span>「统一监控」</span>
				</div>
				<div className='flex flex-col justify-center'>
					<p className='text-2xl font-semibold whitespace-pre-wrap sm:text-3xl lg:text-4xl'>
						马上集成 AI Proxy，30 秒跑通首个调用
					</p>
				</div>
				<p className='text-muted-foreground text-sm'>海外访问请使用 usw.sealos.io</p>
			</div>
			<div className='flex gap-4'>
				<LandingOutlineButton
					href='#'
					size='lg'
					borderStyle='dashed'
				>
					查看文档
				</LandingOutlineButton>
				<LandingOutlineButton
					href='#'
					size='lg'
					borderStyle='solid'
				>
					立即注册
				</LandingOutlineButton>
			</div>
		</div>
	);
}
