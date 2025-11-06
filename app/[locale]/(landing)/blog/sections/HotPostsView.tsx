'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { BlogPost } from '@/libs/blog/types';
import { formatDate } from '@/libs/blog/date-utils';
import { Card } from '@/libs/components/ui/card';
import { CalendarIcon, EyeIcon } from '@/libs/components/ui/sealos-icons';
import { Link } from '@/libs/i18n/navigation';

interface HotPostsViewProps {
	hotPosts: BlogPost[];
	locale: string;
}

export default function HotPostsView({ hotPosts, locale }: HotPostsViewProps) {
	const t = useTranslations('pages.blog.sections.hotPosts');
	return (
		<section className='container pt-36 pb-18'>
			<h2 className='mb-10 text-center text-3xl font-semibold'>{t('title')}</h2>

			<div className='grid grid-cols-3 gap-5'>
				{hotPosts.map((post) => (
					<Link
						key={post.url}
						href={post.url}
						className='block h-full'
					>
						<Card className='flex h-full flex-col gap-0 overflow-hidden rounded-none p-0 shadow-none transition-shadow hover:shadow-md'>
							<div className='border-border relative aspect-[5/2] border-b'>
								<Image
									src={post.thumbnail || '/sealos.svg'}
									alt={post.title}
									fill
									className='object-cover'
								/>
							</div>

							<div className='flex flex-1 flex-col px-6 py-4'>
								<h3 className='mb-2 line-clamp-2 flex-1 font-medium'>{post.title}</h3>
								<div className='text-muted-foreground flex items-center gap-4 text-sm'>
									<div className='flex items-center gap-1'>
										<CalendarIcon className='text-brand size-4' />
										<span>{formatDate(post.date, locale)}</span>
									</div>
									<div className='flex items-center gap-1'>
										<EyeIcon className='text-brand size-4' />
										<span>{t('views', { views: post.views })}</span>
									</div>
								</div>
							</div>
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
}
