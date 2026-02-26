import { CheckOverFrameIcon, FlatArrowRightIcon, LightningOverFrameIcon, QuestionIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';
import { Input } from '@/libs/components/ui/input';

function FeaturePill({ icon, text }: { icon: Parameters<typeof Icon>[0]['src']; text: string }) {
	return (
		<div className='flex items-center gap-2'>
			<div className='text-brand size-6'>
				<Icon
					src={icon}
					className='size-full'
				/>
			</div>
			<p className='text-foreground text-base leading-normal font-normal'>{text}</p>
		</div>
	);
}

export function RequestSection() {
	return (
		<div
			id='request'
			className='text-foreground flex w-full flex-col items-center gap-9'
		>
			<div className='flex w-full flex-col items-center gap-4 text-center'>
				<div className='flex items-center gap-2'>
					<p className='text-foreground text-3xl leading-none font-medium'>找不到你想要的应用</p>
					<div className='text-foreground size-6'>
						<Icon
							src={QuestionIcon}
							className='text-brand size-full'
							strokeWidth={1.5}
						/>
					</div>
				</div>
				<p className='text-muted-foreground text-base leading-normal font-normal'>
					我们支持几乎所有 <span className='text-brand'>Docker</span> 化的{' '}
					<span className='text-brand'>GitHub</span> 项目！
				</p>
			</div>

			<form className='bg-muted flex w-full max-w-4xl items-center justify-between py-2.5 pr-2 pl-5'>
				<Input
					className='min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:border-transparent focus-visible:ring-0'
					placeholder='输入 GitHub 仓库地址（https://github.com/usemame/repo）'
				/>
				<LandingOutlineButton
					href='#'
					size='md'
					icon={FlatArrowRightIcon}
					className='shrink-0 text-base font-semibold'
				>
					提交
				</LandingOutlineButton>
			</form>

			<div className='flex flex-wrap items-center justify-center gap-8'>
				<FeaturePill
					icon={CheckOverFrameIcon}
					text='自动生成部署模版'
				/>
				<FeaturePill
					icon={LightningOverFrameIcon}
					text='24 小时内上线'
				/>
			</div>
		</div>
	);
}
