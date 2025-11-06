import Image from 'next/image';
import { getHotPosts } from '@/libs/blog/utils';
import { Card } from '@/libs/components/ui/card';
import { CalendarIcon, EyeIcon } from '@/libs/components/ui/sealos-icons';
import { Link } from '@/libs/i18n/navigation';

function formatDate(dateString: string, locale: string = 'zh'): string {
	const date = new Date(dateString);

	if (locale === 'zh') {
		return date.toLocaleDateString('zh-CN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	}

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export default function HotPostsSection({ locale }: { locale: string }) {
	const hotPosts = getHotPosts(locale, 3);

	return (
		<section className='container pt-36 pb-18'>
			<h2 className='mb-10 text-center text-3xl font-semibold'>热门文章</h2>

			<div className='grid grid-cols-3 gap-5'>
				{hotPosts.map((post) => (
					<Link
						key={post.url}
						href={post.url}
						className='block h-full'
					>
						<Card className='flex h-full flex-col gap-0 overflow-hidden rounded-none p-0 shadow-none transition-shadow hover:shadow-md'>
							{/* 文章封面 */}
							<div className='border-border relative aspect-[5/2] border-b'>
								<Image
									src={post.thumbnail || '/sealos.svg'}
									alt={post.title}
									fill
									className='object-cover'
								/>
							</div>

							{/* 文章内容 */}
							<div className='flex flex-1 flex-col px-6 py-4'>
								{/* Not displaying category for now... */}
								<h3 className='mb-2 line-clamp-2 flex-1 font-medium'>{post.title}</h3>
								<div className='text-muted-foreground flex items-center gap-4 text-sm'>
									<div className='flex items-center gap-1'>
										<CalendarIcon className='text-brand size-4' />
										<span>{formatDate(post.date, locale)}</span>
									</div>
									<div className='flex items-center gap-1'>
										<EyeIcon className='text-brand size-4' />
										<span>{post.views} 次查看</span>
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
