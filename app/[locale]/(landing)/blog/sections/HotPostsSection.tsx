import Image from 'next/image';
import { FramedCalendarIcon, EyeIcon } from '@/assets/icons';
import { formatDate } from '@/libs/blog/date-utils';
import { getHotPosts } from '@/libs/blog/utils';
import { Icon } from '@/libs/components/ui/icon';
import { Card } from '@/libs/components/ui/card';
import { Link } from '@/libs/i18n/navigation';
import { getTranslations } from '@/libs/i18n/server';

export default async function HotPostsSection({ locale }: { locale: string }) {
	const t = await getTranslations('pages.blog.sections.hotPosts');
	const hotPosts = getHotPosts(locale, 3);

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
										<Icon
											src={FramedCalendarIcon}
											className='text-brand size-4'
										/>
										<span>{formatDate(post.date, locale)}</span>
									</div>
									<div className='flex items-center gap-1'>
										<Icon
											src={EyeIcon}
											className='text-brand size-4'
										/>
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
