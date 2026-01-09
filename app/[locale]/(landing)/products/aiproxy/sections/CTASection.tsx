import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';

export function CTASection() {
	return (
		<div className='flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
			<div className='flex flex-col gap-4'>
				<div className='text-muted-foreground flex flex-wrap gap-2 text-sm'>
					<span>「统一接口」</span>
					<span>「统一计费」</span>
					<span>「统一监控」</span>
				</div>
				<h2 className='text-3xl font-semibold lg:text-4xl'>马上集成 AI Proxy，30 秒跑通首个调用</h2>
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
