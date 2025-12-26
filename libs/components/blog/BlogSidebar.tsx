import type { BlogPost } from '@/libs/blog/types';
import { getTranslations } from '@/libs/i18n/server';
import { RelatedPostsSection } from './RelatedPostsSection';
import { RelatedResourcesSection } from './RelatedResourcesSection';
import { SharePostsSection } from './SharePostsSection';

interface BlogSidebarProps {
	currentPost: BlogPost;
	locale: string;
}

export async function BlogSidebar({ currentPost, locale }: BlogSidebarProps) {
	const t = await getTranslations({ locale, namespace: 'pages.blog' });

	const defaultResources = [
		{
			title: t('sidebar.resources.guide.title'),
			url: 'https://sealos.io/docs',
			icon: (
				<svg
					className='size-4'
					viewBox='0 0 16 16'
					fill='currentColor'
				>
					<title>Document</title>
					<path d='M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z' />
				</svg>
			),
		},
		{
			title: t('sidebar.resources.bestPractices.title'),
			url: 'https://sealos.io/docs',
			icon: (
				<svg
					className='size-4'
					viewBox='0 0 16 16'
					fill='currentColor'
				>
					<title>Document</title>
					<path d='M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z' />
				</svg>
			),
		},
	];

	return (
		<aside className='sticky top-20 shrink-0 space-y-12'>
			<RelatedPostsSection
				currentPost={currentPost}
				locale={locale}
				title={t('sidebar.relatedPosts.title')}
			/>
			<SharePostsSection locale={locale} />
			<RelatedResourcesSection
				title={t('sidebar.resources.title')}
				description={t('sidebar.resources.description')}
				resources={defaultResources}
			/>
		</aside>
	);
}
