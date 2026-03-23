'use client';

import type React from 'react';
import { useTranslations } from '@/libs/i18n/client';

export interface ShareButtonConfig {
	/** Icon component (ReactNode) */
	icon: React.ReactNode;
	/** i18n key for button text */
	textI18nKey: string;
	/** Link template string with {link} and {title} placeholders */
	linkTemplate: string;
	/** Action type, defaults to 'share' */
	onClick?: 'share' | 'copy';
}

/**
 * Hook for handling share functionality.
 * Provides handlers for sharing posts to different platforms and copying links.
 *
 * @returns Object with handleShare and handleCopyLink functions
 */
export function useSharePosts() {
	const t = useTranslations('pages.blog');

	const handleShare = (linkTemplate: string, onClick?: 'share' | 'copy') => {
		if (typeof window === 'undefined') {
			return;
		}

		const currentUrl = window.location.href;
		const currentTitle = document.title;

		if (onClick === 'copy') {
			handleCopyLink();
			return;
		}

		const shareUrl = linkTemplate
			.replace('{link}', encodeURIComponent(currentUrl))
			.replace('{title}', encodeURIComponent(currentTitle));

		window.open(shareUrl, '_blank', 'noopener,noreferrer');
	};

	const handleCopyLink = () => {
		if (typeof window === 'undefined' || !navigator.clipboard) {
			return;
		}

		navigator.clipboard.writeText(window.location.href).then(() => {
			alert(t('sharePosts.linkCopied'));
		});
	};

	return {
		handleShare,
		handleCopyLink,
	};
}
