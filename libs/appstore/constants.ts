export const APPSTORE_CATEGORY_META = [
	{ slug: 'all', labelKey: 'all' },
	{ slug: 'tool', labelKey: 'tool' },
	{ slug: 'ai', labelKey: 'ai' },
	{ slug: 'database', labelKey: 'database' },
	{ slug: 'low-code', labelKey: 'low-code' },
	{ slug: 'backend', labelKey: 'backend' },
	{ slug: 'dev-ops', labelKey: 'dev-ops' },
	{ slug: 'monitor', labelKey: 'monitor' },
	{ slug: 'game', labelKey: 'game' },
	{ slug: 'blog', labelKey: 'blog' },
	{ slug: 'storage', labelKey: 'storage' },
] as const;

export const APPSTORE_CATEGORIES = APPSTORE_CATEGORY_META.map((item) => item.slug);

export const APPSTORE_TREND_RANKS = [1, 2, 3, 4, 5] as const;
