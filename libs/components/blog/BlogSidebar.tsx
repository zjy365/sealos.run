import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/libs/blog/utils';
import { Link } from '@/libs/i18n/navigation';
import { ShareButtons } from './ShareButtons';

interface BlogSidebarProps {
	currentSlug: string;
	locale: string;
}

export function BlogSidebar({ currentSlug, locale }: BlogSidebarProps) {
	const allPosts = getAllPosts(locale);
	const relatedPosts = allPosts.filter((post) => post.slug !== currentSlug).slice(0, 5);

	return (
		<aside className='sticky top-20 w-[283px] shrink-0 space-y-12'>
			{/* 相关文章 */}
			<section>
				<h2 className='text-foreground mb-6 text-xl font-semibold'>相关文章</h2>
				<div className='space-y-3'>
					{relatedPosts.map((post) => (
						<Link
							key={post.slug}
							href={post.url}
							className='text-muted-foreground hover:text-foreground flex items-center gap-3 transition-colors'
						>
							<span className='flex-1 truncate text-base'>{post.title}</span>
							<ArrowRight className='size-4 shrink-0' />
						</Link>
					))}
				</div>
			</section>

			{/* 分享文章 */}
			<section>
				<h2 className='text-foreground mb-6 text-xl font-semibold'>分享文章</h2>
				<ShareButtons />
			</section>

			{/* 相关资源 */}
			<section>
				<div className='mb-6'>
					<h2 className='text-foreground text-xl font-semibold'>相关资源</h2>
					<p className='text-muted-foreground mt-2 text-base'>更多 Sealos 和 Kubernetes 相关资源：</p>
				</div>
				<div className='space-y-4'>
					<a
						href='https://sealos.io/docs'
						target='_blank'
						rel='noopener noreferrer'
						className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors'
					>
						<svg
							className='size-4'
							viewBox='0 0 16 16'
							fill='currentColor'
						>
							<title>文档</title>
							<path d='M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z' />
						</svg>
						<span>高可用集群部署指南</span>
					</a>
					<a
						href='https://sealos.io/docs'
						target='_blank'
						rel='noopener noreferrer'
						className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors'
					>
						<svg
							className='size-4'
							viewBox='0 0 16 16'
							fill='currentColor'
						>
							<title>文档</title>
							<path d='M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z' />
						</svg>
						<span>Kubernetes 最佳实践</span>
					</a>
				</div>
			</section>
		</aside>
	);
}
