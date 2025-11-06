export interface BlogPost {
	title: string;
	description: string;
	date: string;
	author: string;
	category: string;
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

export const BLOG_CATEGORIES = [
	'Kubernetes 教程',
	'Docker 容器技术',
	'DevOps 实践',
	'微服务架构',
	'数据库管理',
	'监控告警',
	'安全加固',
	'性能优化',
	'故障排查',
] as const;

export type BlogCategoryName = (typeof BLOG_CATEGORIES)[number];
