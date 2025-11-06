import { getTRich } from '@/libs/i18n/server';
import { Config } from '@/libs/config';
import { SharePostsView } from './SharePostsView';
import type { ShareButtonConfig } from './useSharePosts';

interface SharePostsSectionProps {
	locale: string;
}

export async function SharePostsSection({ locale }: SharePostsSectionProps) {
	const shareConfig = Config.components.blog.shareButtons;

	if (shareConfig.length === 0) {
		return null;
	}

	const t = await getTRich({ locale, namespace: 'pages.blog' });
	const title = t('sharePosts.title');

	const shareButtons: ShareButtonConfig[] = shareConfig.map((button) => ({
		icon: button.icon,
		textI18nKey: button.textI18nKey,
		linkTemplate: button.linkTemplate,
		onClick: button.onClick,
	}));

	return (
		<SharePostsView
			title={title}
			shareButtons={shareButtons}
		/>
	);
}
