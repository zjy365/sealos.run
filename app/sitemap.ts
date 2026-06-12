import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/libs/blog/utils';

const SITE_URL = 'https://sealos.run';

const staticRoutes: Array<{
	path: string;
	changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
	priority: number;
}> = [
	{ path: '/', changeFrequency: 'weekly', priority: 1 },
	{ path: '/about-us', changeFrequency: 'monthly', priority: 0.7 },
	{ path: '/pricing/payg', changeFrequency: 'monthly', priority: 0.8 },
	{ path: '/private-cloud', changeFrequency: 'monthly', priority: 0.8 },
	{ path: '/solutions', changeFrequency: 'monthly', priority: 0.8 },
	{ path: '/products/devbox', changeFrequency: 'monthly', priority: 0.8 },
	{ path: '/products/database', changeFrequency: 'monthly', priority: 0.8 },
	{ path: '/products/appstore', changeFrequency: 'monthly', priority: 0.8 },
	{ path: '/products/aiproxy', changeFrequency: 'monthly', priority: 0.8 },
	{ path: '/products/oss', changeFrequency: 'monthly', priority: 0.8 },
	{ path: '/products/launchpad', changeFrequency: 'monthly', priority: 0.8 },
	{ path: '/blog', changeFrequency: 'daily', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
		url: `${SITE_URL}${route.path}`,
		lastModified: now,
		changeFrequency: route.changeFrequency,
		priority: route.priority,
	}));

	const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
		url: `${SITE_URL}${post.url}`,
		lastModified: post.date ? new Date(post.date) : now,
		changeFrequency: 'monthly',
		priority: 0.6,
	}));

	return [...staticEntries, ...blogEntries];
}
