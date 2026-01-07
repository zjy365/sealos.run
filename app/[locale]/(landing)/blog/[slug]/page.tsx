import type { MDXComponents } from 'mdx/types';
import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';
import { notFound } from 'next/navigation';
import type React from 'react';
import { DefaultBlogCoverImage } from '@/assets';

/**
 * Convert StaticImageData or string to string
 */
function getImageSrc(src: string | StaticImageData | undefined): string {
	if (!src) return '';
	if (typeof src === 'string') return src;
	return src.src;
}

import { EyeIcon, FramedCalendarIcon, FramedClockIcon, PersonIcon } from '@/assets/icons';
import { formatDate } from '@/libs/blog/date-utils';
import { blog } from '@/libs/blog/source';
import type { BlogPost } from '@/libs/blog/types';
import { Icon } from '@/libs/components/ui/icon';
import { getTranslations } from '@/libs/i18n/server';
import { getMDXComponents } from '@/mdx-components';
import { BlogSidebar } from './components/BlogSidebar';
import { TableOfContents } from './components/TableOfContents';

export async function generateStaticParams() {
	const posts = blog.getPages();
	return posts.map((post) => ({
		slug: post.slugs[0],
	}));
}

type BlogPageData = BlogPost & { body?: React.ComponentType };

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
	const { slug, locale } = await params;
	let page = blog.getPage([slug], locale);

	if (!page) {
		const altLocale = locale === 'zh' ? 'en' : 'zh';
		page = blog.getPage([slug], altLocale);
		if (!page) {
			return {};
		}
	}

	const { title, description, date, author } = page.data as Partial<BlogPageData>;

	return {
		title,
		description,
		authors: author ? [{ name: author }] : undefined,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime: date,
		},
	};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
	const { slug, locale } = await params;
	let page = blog.getPage([slug], locale);

	if (!page) {
		const altLocale = locale === 'zh' ? 'en' : 'zh';
		page = blog.getPage([slug], altLocale);
		if (!page) {
			notFound();
		}
	}

	const { title, date, author, tags, readingTime, views, body, category, description, thumbnail, featured } =
		page.data as Partial<BlogPageData> & {
			thumbnail?: string | StaticImageData;
			featured?: boolean;
		};
	const MDX = body as React.ComponentType<{ components?: MDXComponents }>;
	const t = await getTranslations({ locale });

	const normalizedUrl = page.url.replace(new RegExp(`^/${locale}`), '');
	const currentPost: BlogPost = {
		title: title || '',
		description: description || '',
		date: date || '',
		author: author || '',
		category: category || '',
		tags: tags || [],
		readingTime: readingTime || 0,
		views: views || 0,
		thumbnail: thumbnail ? getImageSrc(thumbnail) : getImageSrc(DefaultBlogCoverImage),
		featured: featured || false,
		url: normalizedUrl || '/',
		slug: page.slugs[page.slugs.length - 1] || slug,
	};

	return (
		<main className='flex min-h-screen justify-center'>
			<div className='grid grid-cols-1 py-14 xl:grid-cols-[20rem_56rem] xl:gap-8 2xl:grid-cols-[20rem_56rem_20rem] 2xl:gap-16'>
				<div className='hidden pl-4 xl:block'>
					<TableOfContents />
				</div>

				<article>
					<header className='mb-14 flex flex-col gap-6'>
						<h1 className='text-foreground text-3xl leading-none font-medium'>{title}</h1>

						<div className='flex flex-col gap-4'>
							<div className='text-foreground flex flex-wrap items-center gap-4 text-sm'>
								{!!author && (
									<div className='flex items-center gap-1'>
										<Icon
											src={PersonIcon}
											className='text-brand size-5'
										/>
										<span>{author}</span>
									</div>
								)}
								{!!date && (
									<div className='flex items-center gap-1'>
										<Icon
											src={FramedCalendarIcon}
											className='text-brand size-5'
										/>
										<span>{formatDate(date, locale)}</span>
									</div>
								)}
								{!!readingTime && (
									<div className='flex items-center gap-1'>
										<Icon
											src={FramedClockIcon}
											className='text-brand size-5'
										/>
										<span>
											{t('pages.blog.post.readingTime', {
												minutes: readingTime,
											})}
										</span>
									</div>
								)}
								{!!views && (
									<div className='flex items-center gap-1'>
										<Icon
											src={EyeIcon}
											className='text-brand size-5'
										/>
										<span>{t('pages.blog.post.views', { views })}</span>
									</div>
								)}
							</div>

							{tags && tags.length > 0 && (
								<div className='flex flex-wrap gap-2'>
									{tags.map((tag: string) => (
										<span
											key={tag}
											className='border-brand text-muted-foreground border border-dashed px-3 py-1 text-sm'
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
					</header>

					<div className='prose prose-zinc dark:prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-6 prose-a:text-primary prose-strong:text-foreground max-w-none'>
						<MDX components={getMDXComponents()} />
					</div>
				</article>

				<div className='hidden pr-4 2xl:block'>
					<BlogSidebar
						currentPost={currentPost}
						locale={locale}
					/>
				</div>
			</div>
		</main>
	);
}
