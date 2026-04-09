export interface BlogPost {
	title: string;
	description: string;
	date: string;
	author: string;
	category: string;
	categorySlug: string;
	tags: string[];
	readingTime: number;
	views: number;
	thumbnail?: string;
	featured?: boolean;
	url: string;
	slug: string;
}

export interface BlogCategory {
	name: string;
	slug: string;
	count: number;
}
