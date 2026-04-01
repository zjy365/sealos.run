import 'server-only';

import React from 'react';
import { getAiproxyModels } from '@/libs/aiproxy/utils';
import { APPSTORE_CATEGORY_META } from '@/libs/appstore/constants';
import type { AppStoreTemplateCategory } from '@/libs/appstore/types';
import { getAppStoreTemplates } from '@/libs/appstore/utils';
import type { ProductsPanelData } from './products-panel.types';

const APPSTORE_CATEGORY_LABELS: Record<AppStoreTemplateCategory, string> = {
	ai: 'AI',
	backend: '后端',
	blog: '博客',
	database: '数据库',
	'dev-ops': 'DevOps',
	game: '游戏',
	'low-code': '低代码',
	monitor: '监控',
	storage: '存储',
	tool: '工具',
};

const NAV_APPSTORE_CATEGORIES = APPSTORE_CATEGORY_META.flatMap((item) =>
	item.slug === 'all' ? [] : [item.slug as AppStoreTemplateCategory],
);

export function getProductsPanelData() {
	return getProductsPanelDataCached();
}

const getProductsPanelDataCached = React.cache((): ProductsPanelData => {
	const models = getAiproxyModels();
	const templates = getAppStoreTemplates('zh');

	const providerMap = new Map<string, ProductsPanelData['aiproxyProviders'][number]>();
	for (const model of models) {
		const existing = providerMap.get(model.ownerKey);
		if (existing) {
			if (existing.models.length < 6) {
				existing.models.push({ href: '/products/aiproxy', name: model.name });
			}
			continue;
		}

		providerMap.set(model.ownerKey, {
			ownerKey: model.ownerKey,
			ownerLabel: model.ownerLabel,
			models: [{ href: '/products/aiproxy', name: model.name }],
		});
	}

	const templateMap = new Map<AppStoreTemplateCategory, ProductsPanelData['appStoreCategories'][number]['apps']>();
	for (const template of templates) {
		const list = templateMap.get(template.category) ?? [];
		list.push({
			deployCount: template.deployCount,
			href: `/products/appstore/${template.slug}`,
			thumbnail: template.thumbnail,
			title: template.title,
		});
		templateMap.set(template.category, list);
	}

	const appStoreCategories = NAV_APPSTORE_CATEGORIES.map((category) => ({
		apps: (templateMap.get(category) ?? [])
			.toSorted((a, b) => (b.deployCount ?? 0) - (a.deployCount ?? 0) || a.title.localeCompare(b.title, 'zh-CN'))
			.slice(0, 6),
		label: APPSTORE_CATEGORY_LABELS[category],
		slug: category,
	})).filter((category) => category.apps.length > 0);

	return {
		aiproxyProviders: Array.from(providerMap.values()),
		appStoreCategories,
	};
});
