import type { languagesType } from '@/lib/i18n';
import { getAllTags, getCategories, getSortedBlogPosts } from '@/lib/utils/blog-utils';
import { generateBlogMetadata } from '@/lib/utils/metadata';
import BlogContainer from './components/BlogContainer';
import BlogGrid from './components/BlogGrid';
import BlogHeader from './components/BlogHeader';

interface BlogIndexProps {
	params: Promise<{ lang: languagesType }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const translations: Record<languagesType, Record<'title' | 'description', string>> = {
	en: {
		title: 'Blog',
		description: 'Sharing our technical insights, product updates and industry news',
	},
	'zh-cn': {
		title: '博客',
		description: '分享我们的技术洞见、产品更新和行业新闻',
	},
};

export default async function BlogIndex(props: BlogIndexProps) {
	const searchParams = await props.searchParams;
	const params = await props.params;

	const { lang } = params;

	const categories = await getCategories();
	const tags = await getAllTags(undefined, lang);

	// Extract tags from URL search params
	const selectedTags = searchParams.tag
		? Array.isArray(searchParams.tag)
			? searchParams.tag
			: [searchParams.tag]
		: [];

	// Pass selected tags to filter posts
	const posts = getSortedBlogPosts({
		tags: selectedTags,
		lang: lang,
	});

	return (
		<BlogContainer>
			<BlogHeader
				title={translations[lang].title}
				description={translations[lang].description}
				lang={lang}
				categories={categories}
				tags={tags}
			/>
			<BlogGrid
				posts={posts}
				lang={lang}
			/>
		</BlogContainer>
	);
}

export const generateMetadata = generateBlogMetadata;
