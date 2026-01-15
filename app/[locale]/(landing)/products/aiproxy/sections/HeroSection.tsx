import Image from 'next/image';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { HeroBgImage } from '../assets';

export function HeroSection() {
	return (
		<div className='relative flex min-h-120 flex-col gap-20 py-12'>
			<div className='absolute -z-10 h-full w-full'>
				<Image
					src={HeroBgImage}
					alt=''
					className='h-full overflow-visible object-cover object-[2.5rem_50%] sm:object-[12.5rem_50%] md:object-[20rem_50%] lg:object-[25rem_0%] xl:object-[25rem_7.5%]'
					fill
				/>
			</div>

			<div className='flex flex-col gap-6 pt-20'>
				<h1 className='text-4xl font-semibold lg:text-5xl'>
					<span className='text-brand'>全球 AI 模型</span>
					接入平台
				</h1>
				<p className='text-muted-foreground text-lg lg:text-xl'>
					一键生成 API Key，覆盖 100+ 语言 / 语音 / 图片 / 视频等多模态模型。
				</p>
			</div>
			<div className='flex flex-col gap-4 sm:flex-row'>
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
