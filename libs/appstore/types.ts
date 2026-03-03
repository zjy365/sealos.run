import type { APPSTORE_CATEGORIES, APPSTORE_TREND_RANKS } from './constants';

export type AppStoreCategory = (typeof APPSTORE_CATEGORIES)[number];
export type AppStoreTrendRank = (typeof APPSTORE_TREND_RANKS)[number];

export type AppStoreTemplate = {
	slug: string;
	title: string;
	description: string;
	category: Exclude<AppStoreCategory, '所有'>;
	starsText?: string;
	versionText?: string;
	trendDeltaText?: string;
	thumbnail?: string;
};

export type AppStoreTrendItem = {
	slug: string;
	rank: AppStoreTrendRank;
	title: string;
	description: string;
	starsText?: string;
	trendDeltaText?: string;
	thumbnail?: string;
};
