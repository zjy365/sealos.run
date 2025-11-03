import React from 'react';
import Image from 'next/image';
import { Card } from '@/libs/components/ui/card';
import { CalendarIcon, EyeIcon } from '@/libs/components/ui/sealos-icons';

export default function HotPostsSection() {
	return (
		<section className='container pt-36 pb-18'>
			<h2 className='mb-10 text-center text-3xl font-semibold'>热门文章</h2>

			<div className='grid grid-cols-3 gap-5'>
				{Array.from({ length: 3 }).map((_, index) => (
					<Card
						key={index}
						className='gap-0 overflow-hidden rounded-none p-0 shadow-none'
					>
						{/* 文章封面 */}
						<div className='border-border relative aspect-[5/2] border-b'>
							<Image
								src=''
								alt='Article cover'
								fill
								className='object-cover'
							/>
						</div>

						{/* 文章内容 */}
						<div className='px-6 py-4'>
							<h3 className='mb-2 font-medium'>Docker 容器安全最佳实践指南</h3>
							<div className='text-muted-foreground flex items-center gap-4 text-sm'>
								<div className='flex items-center gap-1'>
									<CalendarIcon className='text-brand size-4' />
									<span>2024-01-15</span>
								</div>
								<div className='flex items-center gap-1'>
									<EyeIcon className='text-brand size-4' />
									<span>2456 次查看</span>
								</div>
							</div>
						</div>
					</Card>
				))}
			</div>
		</section>
	);
}
