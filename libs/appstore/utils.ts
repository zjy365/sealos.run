import 'server-only';

import React from 'react';
import { getGitHubRepositoryStatsForTemplate } from '@/libs/github-metadata/utils';
import { resolveLocale, routing } from '@/libs/i18n/routing';
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

function isLocaleMatch(page: AppStorePage, locale: string): boolean {
	const pageLocale = resolveLocale(page.locale);
	return pageLocale === locale;
}

function normalizeUrl(page: AppStorePage, locale: string): string {
	return page.url.replace(new RegExp(`^/${locale}`), '');
}

function safeSlug(page: AppStorePage, locale: string): string {
	const normalized = normalizeUrl(page, locale);
	return normalized.replace(/^\/products\/appstore\/?/, '').replace(/^\/+/, '');
}

function stripTemplatesPrefix(slug: string): string {
	return slug.replace(/^templates\/?/, '');
}

function mergeTemplateGithubMetadata(template: AppStoreTemplate): AppStoreTemplate {
	const githubStats = getGitHubRepositoryStatsForTemplate(template);
	if (!githubStats) {
		return template;
	}

	return {
		...template,
		github: githubStats.htmlUrl,
		starsText: githubStats.starsText || template.starsText,
	};
}

export function getAppStoreTemplates(locale: string = routing.defaultLocale): AppStoreTemplate[] {
	return getAppStoreTemplatesCached(resolveLocale(locale));
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

		return mergeTemplateGithubMetadata({
			slug: stripTemplatesPrefix(safeSlug(p, locale)),
			title,
			description,
			category,
			deployCount: data.deployCount,
			github: data.github,
			starsText: data.starsText,
			versionText: data.versionText,
			trendDeltaText: data.trendDeltaText,
			thumbnail: data.thumbnail,
		});
	});
});

export function getAppStoreTrends(locale: string = routing.defaultLocale): AppStoreTrendItem[] {
	return getAppStoreTrendsCached(resolveLocale(locale));
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
