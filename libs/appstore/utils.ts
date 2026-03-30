import 'server-only';

import React from 'react';
import { APPSTORE_CATEGORIES, APPSTORE_TREND_RANKS } from './constants';
import { appstore } from './source';
import type {
	AppStoreCategory,
	AppStoreTemplate,
	AppStoreTemplateCategory,
	AppStoreTrendItem,
	AppStoreTrendRank,
} from './types';

type AppStorePage = ReturnType<typeof appstore.getPages>[number];
type AppStorePageData = AppStorePage['data'];

function isAppStoreCategory(value: string): value is AppStoreCategory {
	return (APPSTORE_CATEGORIES as readonly string[]).includes(value);
}

function isAppStoreTrendRank(value: number): value is AppStoreTrendRank {
	return (APPSTORE_TREND_RANKS as readonly number[]).includes(value);
}

function getCategory(data: AppStorePageData): AppStoreCategory | undefined {
	const raw = data.category;
	if (!raw) return undefined;
	return isAppStoreCategory(raw) ? raw : undefined;
}

/**
 * `fumadocs` i18n currently may include both `.en` and `.zh` pages.
 * We follow the project's blog filtering strategy to ensure locale-correct results.
 */
function isLocaleMatch(page: AppStorePage, locale: string): boolean {
	const slug = page.slugs[page.slugs.length - 1] || '';
	const url = page.url;
	const isEn = url.includes('.en') || slug.includes('.en');

	if (locale === 'en') return isEn;
	return !isEn;
}

function normalizeUrl(page: AppStorePage, locale: string): string {
	return page.url.replace(new RegExp(`^/${locale}`), '');
}

function safeSlug(page: AppStorePage, locale: string): string {
	const normalized = normalizeUrl(page, locale);
	return normalized.replace(/^\/products\/appstore\/?/, '').replace(/^\/+/, '');
}

export function getAppStoreTemplates(locale: string = 'zh'): AppStoreTemplate[] {
	return getAppStoreTemplatesCached(locale);
}

const getAppStoreTemplatesCached = React.cache((locale: string): AppStoreTemplate[] => {
	const pages = appstore
		.getPages(locale)
		.filter((p) => isLocaleMatch(p, locale))
		.filter((p) => p.slugs[0] === 'templates');

	return pages.map((p) => {
		const data = p.data;
		const title = data.title ?? '';
		const description = data.description ?? '';
		const category = (getCategory(data) ?? 'tool') as AppStoreTemplateCategory;

		return {
			slug: safeSlug(p, locale),
			title,
			description,
			category,
			starsText: data.starsText,
			versionText: data.versionText,
			trendDeltaText: data.trendDeltaText,
			thumbnail: data.thumbnail,
		};
	});
});

export function getAppStoreTrends(locale: string = 'zh'): AppStoreTrendItem[] {
	return getAppStoreTrendsCached(locale);
}

const getAppStoreTrendsCached = React.cache((locale: string): AppStoreTrendItem[] => {
	const pages = appstore
		.getPages(locale)
		.filter((p) => isLocaleMatch(p, locale))
		.filter((p) => p.slugs[0] === 'trends');

	const mapped = pages.map((p) => {
		const data = p.data;
		const title = data.title ?? '';
		const description = data.description ?? '';

		const fileLike = p.slugs[p.slugs.length - 1] || '';
		const m = fileLike.match(/^(\d{2})/);
		const n = m ? Number(m[1]) : NaN;
		const rankFromFilename = isAppStoreTrendRank(n) ? n : undefined;

		const rank = (data.rank ?? rankFromFilename ?? 1) as AppStoreTrendRank;

		return {
			slug: safeSlug(p, locale),
			title,
			description,
			rank,
			starsText: data.starsText,
			trendDeltaText: data.trendDeltaText,
			thumbnail: data.thumbnail,
		};
	});

	return mapped.sort((a, b) => a.rank - b.rank);
});

export { APPSTORE_CATEGORIES };
