import Image from 'next/image';
import { AppstoreBoxImage } from '@/assets/app-boxes';
import { FireIcon, SubmitIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';
import { Input } from '@/libs/components/ui/input';

export function HeroSection() {
	return (
		<div className='text-foreground flex w-full flex-col items-center gap-10'>
			<div className='flex flex-col items-center gap-14'>
				<div className='flex items-center gap-4'>
					<div className='size-8'>
						<Image
							src={AppstoreBoxImage}
							alt=''
							className='size-full'
						/>
					</div>
					<p className='text-xl leading-normal font-normal'>应用商店</p>
				</div>

				<p className='text-center text-5xl leading-none font-semibold'>
					<span>让复杂的</span>
					<span className='text-brand'>开源项目部署</span>
					<span>变得像安装App一样</span>
					<span className='text-brand'>简单</span>
				</p>
			</div>

			<form className='bg-muted flex w-full max-w-4xl items-center justify-between py-2.5 pr-2 pl-5'>
				<Input
					className='min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:border-transparent focus-visible:ring-0'
					placeholder='搜索项目名称、GitHub 仓库或关键词...'
					name='q'
					aria-label='搜索应用'
				/>
				<LandingOutlineButton
					href='#templates'
					size='md'
					className='shrink-0 text-base font-semibold'
				>
					搜索
				</LandingOutlineButton>
			</form>

			<div className='flex flex-wrap items-center justify-center gap-3'>
				<LandingOutlineButton
					href='#templates'
					size='md'
					borderStyle='dashed'
					showIcon={false}
					className='text-lg leading-normal font-medium'
				>
					<span className='inline-flex items-center justify-center gap-2'>
						<span className='size-6'>
							<Icon
								src={FireIcon}
								className='size-full'
							/>
						</span>
						<span>浏览热门应用</span>
					</span>
				</LandingOutlineButton>
				<LandingOutlineButton
					href='#request'
					size='md'
					borderStyle='dashed'
					showIcon={false}
					className='text-lg leading-normal font-medium'
				>
					<span className='inline-flex items-center justify-center gap-2'>
						<span className='size-6'>
							<Icon
								src={SubmitIcon}
								className='size-full'
							/>
						</span>
						<span>提交项目</span>
					</span>
				</LandingOutlineButton>
			</div>
		</div>
	);
}
