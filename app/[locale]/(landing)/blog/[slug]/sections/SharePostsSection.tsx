import { Config } from '@/libs/config';
import { getTranslations } from '@/libs/i18n/server';
import { SharePostsView } from '../components/SharePostsView';
import type { ShareButtonConfig } from '../utils/useSharePosts';

interface SharePostsSectionProps {
	locale: string;
}

export async function SharePostsSection({ locale }: SharePostsSectionProps) {
	const shareConfig = Config.components.blog.shareButtons;

	if (shareConfig.length === 0) {
		return null;
	}

	const t = await getTranslations({ locale, namespace: 'pages.blog' });
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

