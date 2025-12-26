'use client';

import { useTranslations } from '@/libs/i18n/client';
import { type ShareButtonConfig, useSharePosts } from './useSharePosts';

interface SharePostsViewProps {
	title?: string;
	shareButtons?: ShareButtonConfig[];
}

export function SharePostsView({ title, shareButtons = [] }: SharePostsViewProps) {
	const t = useTranslations();
	const tBlog = useTranslations('pages.blog');
	const { handleShare } = useSharePosts();

	if (shareButtons.length === 0) {
		return null;
	}

	return (
		<section>
			<h2 className='text-foreground mb-6 text-xl font-semibold'>{title || tBlog('sharePosts.title')}</h2>
			<div className='space-y-4'>
				{shareButtons.map((button) => (
					<button
						key={button.textI18nKey}
						type='button'
						onClick={() => handleShare(button.linkTemplate, button.onClick)}
						className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-base transition-colors'
					>
						<div className='size-5'>{button.icon}</div>
						<span>{t(button.textI18nKey)}</span>
					</button>
				))}
			</div>
		</section>
	);
}
