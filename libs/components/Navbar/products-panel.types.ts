import type { StaticImageData } from 'next/image';
import type React from 'react';

export type AIProxyProviderPanelData = {
	ownerKey: string;
	ownerLabel: string;
	models: Array<{
		name: string;
		href: string;
	}>;
};

export type AppStoreCategoryPanelData = {
	slug: string;
	label: string;
	apps: Array<{
		title: string;
		href: string;
		thumbnail?: string;
		deployCount?: number;
	}>;
};

export type ProductsPanelData = {
	aiproxyProviders: AIProxyProviderPanelData[];
	appStoreCategories: AppStoreCategoryPanelData[];
};

export type NavMenuItemContent = {
	title: string;
	description: string;
	href?: string;
	features?: React.ReactNode;
};

export type NavMenuItem = {
	id: string;
	label: string;
	icon: StaticImageData;
	largeImage?: StaticImageData;
	largeImageAlt?: string;
	content?: NavMenuItemContent;
};

export type ProductLinkFeatureItem = {
	title: string;
	description: string;
	icon: StaticImageData;
	href: string;
};

export type ProductIconFeatureItem = {
	name: string;
	icon: StaticImageData;
	href: string;
};

export type StorageFeatureItem = {
	title: string;
	description: string;
	icon: StaticImageData;
};
