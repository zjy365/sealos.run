import type { getTranslations } from 'next-intl/server';
import { type SimpleIcon, siDiscord, siGithub, siRss, siX, siYoutube } from 'simple-icons';

type Translations = Awaited<ReturnType<typeof getTranslations>>;

export interface MenuItem {
	title: string;
	links: {
		text: string;
		url: string;
	}[];
}

export interface BottomLink {
	text: string;
	url: string;
}

export interface SocialLink {
	icon: SimpleIcon;
	url: string;
}

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
	{
		icon: siGithub,
		url: '#',
	},
	{
		icon: siDiscord,
		url: '#',
	},
	{
		icon: siX,
		url: '#',
	},
	{
		icon: siYoutube,
		url: '#',
	},
	{
		icon: siRss,
		url: '#',
	},
];

export async function createDefaultMenuItems(t: Translations): Promise<MenuItem[]> {
	return [
		{
			title: t('menuItems.resources.title'),
			links: [
				{ text: t('menuItems.resources.links.docs'), url: '#' },
				{ text: t('menuItems.resources.links.education'), url: '#' },
				{ text: t('menuItems.resources.links.blog'), url: '#' },
			],
		},
		{
			title: t('menuItems.products.title'),
			links: [
				{ text: t('menuItems.products.links.devbox'), url: '#' },
				{ text: t('menuItems.products.links.databases'), url: '#' },
				{ text: t('menuItems.products.links.blog'), url: '#' },
			],
		},
		{
			title: t('menuItems.services.title'),
			links: [
				{ text: t('menuItems.services.links.pricing'), url: '#' },
				{ text: t('menuItems.services.links.fastgpt'), url: '#' },
			],
		},
		{
			title: t('menuItems.support.title'),
			links: [
				{ text: t('menuItems.support.links.contactUs'), url: '#' },
				{ text: t('menuItems.support.links.customers'), url: '#' },
			],
		},
	];
}

export async function createDefaultBottomLinks(t: Translations): Promise<BottomLink[]> {
	return [
		{ text: t('bottomLinks.termsOfService'), url: '#' },
		{ text: t('bottomLinks.privacyPolicy'), url: '#' },
		{ text: t('bottomLinks.cookiePolicy'), url: '#' },
	];
}
