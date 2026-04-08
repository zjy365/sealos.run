import Image from 'next/image';
import React from 'react';
import { AppstoreBoxImage } from '@/assets/app-boxes';
import { FireIcon, SubmitIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { Input } from '@/libs/components/ui/input';

type HeroSectionProps = {
	query: string;
	onQueryChange: (value: string) => void;
	onSearch: () => void;
};

export const HeroSection = React.memo(function HeroSection({ query, onQueryChange, onSearch }: HeroSectionProps) {
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onSearch();
	}

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
					<p className='text-xl font-normal'>应用商店</p>
				</div>

				<p className='text-center text-4xl leading-normal font-semibold sm:text-5xl'>
					<span>让复杂的</span>
					<span className='text-brand'>开源项目部署</span>
					<span>变得像安装App一样</span>
					<span className='text-brand'>简单</span>
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className='bg-muted flex w-full max-w-4xl items-center justify-between py-2.5 pr-2 pl-5'
			>
				<Input
					className='min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:border-transparent focus-visible:ring-0'
					placeholder='搜索项目名称、GitHub 仓库或关键词...'
					name='q'
					aria-label='搜索应用'
					value={query}
					onChange={(event) => onQueryChange(event.target.value)}
				/>
				<Button
					type='submit'
					variant='outline'
				>
					搜索
				</Button>
			</form>

			<div className='flex flex-wrap items-center justify-center gap-3'>
				<LandingOutlineButton
					href='#templates'
					size='md'
					borderStyle='dashed'
					showIcon={false}
					className='text-lg font-medium'
				>
					<span className='flex gap-2'>
						<Icon
							src={FireIcon}
							className='size-6'
						/>
						<span>浏览热门应用</span>
					</span>
				</LandingOutlineButton>
				<LandingOutlineButton
					href='#request'
					size='md'
					borderStyle='dashed'
					showIcon={false}
					className='text-lg font-medium'
				>
					<span className='flex gap-2'>
						<Icon
							src={SubmitIcon}
							className='size-6'
						/>
						<span>提交项目</span>
					</span>
				</LandingOutlineButton>
			</div>
		</div>
	);
});
