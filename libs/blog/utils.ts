import type { StaticImageData } from 'next/image';
import React from 'react';
import { Config } from '@/libs/config';
import { getLocaleFallbackChain, resolveLocale, routing } from '@/libs/i18n/routing';
import DefaultBlogCoverImage from '../../assets/default-blog-cover.svg';
import { blog } from './source';
import type { BlogCategory, BlogPost } from './types';
import { BLOG_CATEGORIES } from './types';

/**
 * Convert StaticImageData or string to string
 */
function getImageSrc(src: string | StaticImageData | undefined): string {
	if (!src) return '';
	if (typeof src === 'string') return src;
	return src.src;
}

/**
 * Get all blog posts for a specific locale.
 * Filters posts by file extension to ensure only posts for the specified locale are returned.
 *
 * @param locale - The locale to filter posts by
 * @returns Array of blog posts sorted by date (newest first)
 */
export function getAllPosts(locale: string = routing.defaultLocale): BlogPost[] {
	return getAllPostsCached(resolveLocale(locale));
}

const getAllPostsCached = React.cache((locale: string): BlogPost[] => {
	const pages = blog.getPages(locale).filter((page) => {
		const pageLocale = resolveLocale(page.locale);
		return pageLocale === locale;
	});

	return pages
		.map((page) => {
			const data = page.data as Partial<BlogPost> & {
				thumbnail?: string;
				featured?: boolean;
			};
			const { title, description, date, author, category, tags, readingTime, views, thumbnail, featured } = data;

			const resolvedThumbnail: string = thumbnail ? getImageSrc(thumbnail) : getImageSrc(DefaultBlogCoverImage);
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
});

/**
 * Get hot posts sorted by view count.
 *
 * @param locale - The locale to filter posts by
 * @param limit - Maximum number of posts to return
 * @returns Array of hot posts
 */
export function getHotPosts(locale: string = routing.defaultLocale, limit: number = 3): BlogPost[] {
	const posts = getAllPosts(resolveLocale(locale));
	return posts.sort((a, b) => b.views - a.views).slice(0, limit);
}

/**
 * Get featured posts.
 *
 * @param locale - The locale to filter posts by
 * @param limit - Maximum number of posts to return
 * @returns Array of featured posts
 */
export function getFeaturedPosts(locale: string = routing.defaultLocale, limit: number = 3): BlogPost[] {
	const posts = getAllPosts(resolveLocale(locale));
	return posts.filter((post) => post.featured).slice(0, limit);
}

/**
 * Get posts by category.
 *
 * @param category - The category name to filter by
 * @param locale - The locale to filter posts by
 * @returns Array of posts in the specified category
 */
export function getPostsByCategory(category: string, locale: string = routing.defaultLocale): BlogPost[] {
	const posts = getAllPosts(resolveLocale(locale));
	return posts.filter((post) => post.category === category);
}

/**
 * Get all categories with post counts.
 *
 * @param locale - The locale to filter posts by
 * @returns Array of categories with post counts
 */
export function getAllCategories(locale: string = routing.defaultLocale): BlogCategory[] {
	const resolvedLocale = resolveLocale(locale);
	const posts = getAllPosts(resolvedLocale);
	const categoryCount = new Map<string, number>();

	for (const post of posts) {
		if (post.category) {
			categoryCount.set(post.category, (categoryCount.get(post.category) || 0) + 1);
		}
	}

	const categoriesMap = Config.components.blog?.categories as Record<string, string[]> | undefined;
	const configuredNames: string[] = categoriesMap?.[resolvedLocale] ?? [...BLOG_CATEGORIES];

	return configuredNames.map((name) => ({
		name,
		slug: slugify(name),
		count: categoryCount.get(name) || 0,
	}));
}

/**
 * Get posts by tag.
 *
 * @param tag - The tag to filter by
 * @param locale - The locale to filter posts by
 * @returns Array of posts with the specified tag
 */
export function getPostsByTag(tag: string, locale: string = routing.defaultLocale): BlogPost[] {
	const posts = getAllPosts(resolveLocale(locale));
	return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Get all unique tags from all posts.
 *
 * @param locale - The locale to filter posts by
 * @returns Array of unique tags sorted alphabetically
 */
export function getAllTags(locale: string = routing.defaultLocale): string[] {
	const posts = getAllPosts(resolveLocale(locale));
	const tags = new Set<string>();

	for (const post of posts) {
		for (const tag of post.tags) {
			tags.add(tag);
		}
	}

	return Array.from(tags).sort();
}

/**
 * Search posts by query string.
 * Searches in title, description, and tags.
 *
 * @param query - The search query
 * @param locale - The locale to filter posts by
 * @returns Array of matching posts
 */
export function searchPosts(query: string, locale: string = routing.defaultLocale): BlogPost[] {
	const posts = getAllPosts(resolveLocale(locale));
	const lowerQuery = query.toLowerCase();

	return posts.filter(
		(post) =>
			post.title.toLowerCase().includes(lowerQuery) ||
			post.description.toLowerCase().includes(lowerQuery) ||
			post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
	);
}

// formatDate has been moved to date-utils.ts to avoid server-only import issues

/**
 * Convert string to URL-friendly slug.
 *
 * @param text - The text to convert
 * @returns URL-friendly slug
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
 * Calculate estimated reading time in minutes.
 * Chinese: 300 characters per minute
 * English: 200 words per minute
 *
 * @param content - The content to calculate reading time for
 * @param locale - The locale
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string, locale: string = routing.defaultLocale): number {
	const resolvedLocale = resolveLocale(locale);
	const segmenter = new Intl.Segmenter(resolvedLocale, { granularity: 'word' });
	const segments = Array.from(segmenter.segment(content));
	const wordCount = segments.filter((segment) => segment.isWordLike).length;

	return Math.max(1, Math.ceil(wordCount / 200));
}

export function getPostPageByLocaleFallback(slug: string, locale: string) {
	const localeFallbackChain = getLocaleFallbackChain(resolveLocale(locale));

	for (const candidateLocale of localeFallbackChain) {
		const page = blog.getPage([slug], candidateLocale);
		if (page) {
			return page;
		}
	}

	return null;
}
