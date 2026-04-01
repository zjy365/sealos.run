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
