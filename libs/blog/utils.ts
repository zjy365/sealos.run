import { Config } from '@/libs/config';
import DefaultBlogCoverImage from '../../assets/default-blog-cover.svg';
import { blog } from './source';
import type { BlogCategory, BlogPost } from './types';
import { BLOG_CATEGORIES } from './types';

/**
 * 获取所有博客文章
 */
export function getAllPosts(locale: string = 'zh'): BlogPost[] {
	// fumadocs i18n: getPages(locale) 默认会 fallback 到 defaultLanguage
	// 我们需要根据文件名过滤，只保留真正属于当前语言的文章
	const allPages = blog.getPages(locale);

	// 过滤逻辑：
	// - en locale: 只保留 .en.mdx 文件
	// - zh locale: 只保留 .zh.mdx 或没有语言后缀的 .mdx 文件
	const pages = allPages.filter((page) => {
		const filePath = page.file?.path || '';

		if (locale === 'en') {
			// en 只要 .en.mdx
			return filePath.endsWith('.en.mdx');
		}
		// zh 要 .zh.mdx 或普通 .mdx（不是 .en.mdx）
		return filePath.endsWith('.zh.mdx') || (filePath.endsWith('.mdx') && !filePath.endsWith('.en.mdx'));
	});

	return pages
		.map((page) => {
			const data = page.data as Partial<BlogPost> & {
				thumbnail?: string;
				featured?: boolean;
			};
			const { title, description, date, author, category, tags, readingTime, views, thumbnail, featured } = data;

			const resolvedThumbnail: string = thumbnail || DefaultBlogCoverImage;
			const normalizedUrl = page.url.replace(new RegExp(`^/${locale}`), '');

			return {
				title: title || '',
				description: description || '',
				date: date || '',
				author: author || '',
				category: category || '',
				tags: tags || [],
				readingTime: readingTime || 0,
				views: views || 0,
				thumbnail: resolvedThumbnail,
				featured: featured || false,
				url: normalizedUrl || '/',
				slug: page.slugs[page.slugs.length - 1] || '',
			} as BlogPost;
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 获取热门文章（根据浏览量）
 */
export function getHotPosts(locale: string = 'zh', limit: number = 3): BlogPost[] {
	const posts = getAllPosts(locale);
	return posts.sort((a, b) => b.views - a.views).slice(0, limit);
}

/**
 * 获取精选文章
 */
export function getFeaturedPosts(locale: string = 'zh', limit: number = 3): BlogPost[] {
	const posts = getAllPosts(locale);
	return posts.filter((post) => post.featured).slice(0, limit);
}

/**
 * 按分类获取文章
 */
export function getPostsByCategory(category: string, locale: string = 'zh'): BlogPost[] {
	const posts = getAllPosts(locale);
	return posts.filter((post) => post.category === category);
}

/**
 * 获取所有分类及文章数
 */
export function getAllCategories(locale: string = 'zh'): BlogCategory[] {
	const posts = getAllPosts(locale);
	const categoryCount = new Map<string, number>();

	for (const post of posts) {
		if (post.category) {
			categoryCount.set(post.category, (categoryCount.get(post.category) || 0) + 1);
		}
	}

	const categoriesMap = Config.components.blog?.categories as Record<string, string[]> | undefined;
	const configuredNames: string[] = categoriesMap?.[locale] ?? [...BLOG_CATEGORIES];

	return configuredNames.map((name) => ({
		name,
		slug: slugify(name),
		count: categoryCount.get(name) || 0,
	}));
}

/**
 * 按标签获取文章
 */
export function getPostsByTag(tag: string, locale: string = 'zh'): BlogPost[] {
	const posts = getAllPosts(locale);
	return posts.filter((post) => post.tags.includes(tag));
}

/**
 * 获取所有标签
 */
export function getAllTags(locale: string = 'zh'): string[] {
	const posts = getAllPosts(locale);
	const tags = new Set<string>();

	for (const post of posts) {
		for (const tag of post.tags) {
			tags.add(tag);
		}
	}

	return Array.from(tags).sort();
}

/**
 * 搜索文章
 */
export function searchPosts(query: string, locale: string = 'zh'): BlogPost[] {
	const posts = getAllPosts(locale);
	const lowerQuery = query.toLowerCase();

	return posts.filter(
		(post) =>
			post.title.toLowerCase().includes(lowerQuery) ||
			post.description.toLowerCase().includes(lowerQuery) ||
			post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
	);
}

/**
 * 格式化日期
 */
export function formatDate(dateString: string, locale: string = 'zh'): string {
	const date = new Date(dateString);

	if (locale === 'zh') {
		return date.toLocaleDateString('zh-CN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	}

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

/**
 * 将字符串转换为 slug
 */
function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-\u4e00-\u9fa5]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

/**
 * 计算预估阅读时间（中文按字数，英文按单词数）
 */
export function calculateReadingTime(content: string, locale: string = 'zh'): number {
	if (locale === 'zh') {
		// 中文按每分钟 300 字计算
		const chineseChars = content.replace(/[^\u4e00-\u9fa5]/g, '').length;
		return Math.ceil(chineseChars / 300);
	}
	// 英文按每分钟 200 单词计算
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / 200);
}
