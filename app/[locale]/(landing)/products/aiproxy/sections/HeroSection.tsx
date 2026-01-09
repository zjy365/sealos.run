import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';

export function HeroSection() {
	return (
		<div className='flex flex-col gap-8 py-12'>
			<div className='flex flex-col gap-6'>
				<h1 className='text-4xl font-semibold lg:text-5xl'>
					<span className='text-brand'>全球 AI 模型</span>
					接入平台
				</h1>
				<p className='text-muted-foreground text-lg lg:text-xl'>
					一键生成 API Key，覆盖 100+ 语言 / 语音 / 图片 / 视频等多模态模型。
				</p>
			</div>
			<div className='flex gap-4'>
				<LandingOutlineButton
					href='#'
					size='lg'
					borderStyle='solid'
				>
					获取 API Key
				</LandingOutlineButton>
				<LandingOutlineButton
					href='#'
					size='lg'
					borderStyle='dashed'
					showIcon={false}
				>
					模型广场
				</LandingOutlineButton>
			</div>
		</div>
	);
}
