import React from 'react';
import Image from 'next/image';
import { Button } from '@/libs/components/ui/button';
import { CalendarIcon, ClockIcon, EyeIcon, PersonIcon, SearchIcon } from '@/libs/components/ui/sealos-icons';

export default function CategoriesAndListSection() {
	return (
		<section className='container pt-18 pb-32'>
			<div className='mb-8 flex items-center justify-between'>
				<button
					className='flex size-10 items-center justify-center rounded-full border'
					type='button'
				>
					<SearchIcon className='text-brand size-5' />
				</button>

				<Button
					variant='outline'
					size='default'
					className='gap-2 rounded-full'
				>
					<span className='text-sm'>排序:</span>
					<span className='text-sm'>热度</span>
					<svg
						className='text-muted-foreground size-3'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M7 10l5 5 5-5'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</Button>
			</div>

			<div className='flex gap-8'>
				{/* 左侧分类菜单 */}
				<aside className='w-40 shrink-0'>
					<nav className='sticky top-20 flex flex-col gap-5'>
						{[
							'Kubernetes 教程',
							'Docker 容器技术',
							'DevOps 实践',
							'微服务架构',
							'数据库管理',
							'监控告警',
							'安全加固',
							'性能优化',
							'故障排查',
						].map((category, index) => (
							<button
								key={category}
								className={`flex items-center justify-center rounded-full border px-4 py-2 text-base transition-colors ${
									index === 0
										? 'border-zinc-900 bg-zinc-100 font-medium text-zinc-900'
										: 'text-muted-foreground border-zinc-200 bg-zinc-50 hover:border-zinc-300'
								}`}
							>
								{category}
							</button>
						))}
					</nav>
				</aside>

				{/* 右侧文章列表 */}
				<div className='relative flex-1'>
					<div className='grid grid-cols-2 gap-5'>
						{Array.from({ length: 4 }).map((_, index) => (
							<article
								key={index}
								className='space-y-4 border'
							>
								{/* 文章信息 */}
								<div>
									<div className='p-6'>
										<h3 className='line-clamp-1 pb-3 text-xl leading-tight font-medium'>
											Kubernetes 集群管理：从入门到生产实践完整指南
										</h3>
										<p className='text-muted-foreground line-clamp-1 text-base'>
											让数据库部署变得像安装手机 App
											一样简单，5分钟搞定生产级集群让数据库部署变得像安装手机App一样简单
										</p>
									</div>

									{/* 文章封面 */}
									<div className='relative aspect-[5/3] overflow-hidden border-zinc-200'>
										<Image
											src='/sealos.svg'
											alt='Article cover'
											fill
											className='object-contain p-12 opacity-10'
										/>
									</div>

									{/* 元数据 */}
									<div className='text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 px-6 pt-4 pb-2 text-sm'>
										<div className='flex items-center gap-1.5'>
											<PersonIcon className='text-brand size-4' />
											<span>张云飞</span>
										</div>
										<div className='flex items-center gap-1.5'>
											<CalendarIcon className='text-brand size-4' />
											<span>2024-01-15</span>
										</div>
										<div className='flex items-center gap-1.5'>
											<ClockIcon className='text-brand size-4' />
											<span>12 分钟阅读</span>
										</div>
										<div className='flex items-center gap-1.5'>
											<EyeIcon className='text-brand size-4' />
											<span>2456 次查看</span>
										</div>
									</div>

									{/* 标签 */}
									<div className='flex flex-wrap gap-2 px-6 pb-4'>
										{['对象存储', '集群管理', '运维实践', '教程'].map((tag) => (
											<span
												key={tag}
												className='border-brand text-muted-foreground border border-dashed px-3 py-1 text-sm'
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
