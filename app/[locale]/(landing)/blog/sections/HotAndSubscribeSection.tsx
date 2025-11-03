import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/libs/components/ui/button';
import { Input } from '@/libs/components/ui/input';
import { BoxIcon, HotIcon, SearchIcon } from '@/libs/components/ui/sealos-icons';
import { Link } from '@/libs/i18n/navigation';

export default function HotAndSubscribeSection() {
	return (
		<section className='container'>
			<div className='flex items-start'>
				{/* 本周热门更新 */}
				<div className='w-[60%]'>
					<div className='mb-8 flex items-center gap-2'>
						<HotIcon className='text-brand size-11' />
						<h2 className='text-3xl font-semibold'>本周热门更新</h2>
					</div>
					<ul className='space-y-3'>
						<li className='text-muted-foreground hover:text-foreground text-xl leading-none transition-colors hover:underline'>
							<Link href={'#'}>Sealos 4.3.5 版本发布，支持 ARM 64 架构</Link>
						</li>
						<li className='text-muted-foreground hover:text-foreground text-xl leading-none transition-colors hover:underline'>
							<Link href={'#'}>新增数据库备份恢复功能教程</Link>
						</li>
						<li className='text-muted-foreground hover:text-foreground text-xl leading-none transition-colors hover:underline'>
							<Link href={'#'}>Kubernetes 1.29 适配指南上线</Link>
						</li>
					</ul>
				</div>

				{/* 分隔线 */}
				<div className='border-brand mx-19 h-48 w-px border-l border-dashed' />

				{/* 技术周刊订阅 */}
				<div className='w-[100%]'>
					<div className='mb-8 flex items-center gap-2'>
						<BoxIcon className='text-brand size-11' />
						<h2 className='text-3xl font-semibold'>技术周刊订阅</h2>
					</div>
					<p className='text-muted-foreground mb-5 text-lg'>每周精选云原生技术文章，获取最新行业动态</p>
					<div className='flex gap-5'>
						<Input
							placeholder='请输入邮箱地址'
							className='h-14 flex-1 rounded-lg border-zinc-200'
						/>
						<Button
							size='lg'
							className='h-14 gap-2 rounded-lg px-8'
						>
							立即订阅
							<ArrowRight className='size-4' />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
