import { create, insert, search } from '@orama/orama';
import { stopwords as englishStopwords } from '@orama/stopwords/english';
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import type { NextRequest } from 'next/server';
import { blog } from '@/libs/blog/source';

export const revalidate = false;

// 合并中英文停用词
const combinedStopwords = [...mandarinStopwords, ...englishStopwords];

// 创建搜索数据库实例（在内存中）
let searchDB: Awaited<ReturnType<typeof create>> | null = null;

async function getSearchDB() {
	if (searchDB) {
		return searchDB;
	}

	// 创建Orama数据库，配置中文分词器
	const db = await create({
		schema: {
			id: 'string',
			title: 'string',
			description: 'string',
			url: 'string',
			locale: 'string',
			category: 'string',
		},
		components: {
			tokenizer: await createTokenizer({
				language: 'mandarin',
				stopWords: combinedStopwords,
			}),
		},
	});

	// 获取所有语言的博客文章并插入到数据库
	const allPages = [
		...blog.getPages('zh'), // 获取中文文章
		...blog.getPages('en'), // 获取英文文章
	];

	for (const page of allPages) {
		await insert(db, {
			id: page.url,
			title: page.data.title,
			description: page.data.description ?? '',
			url: page.url,
			locale: page.locale ?? 'zh',
			category: (page.data as { category?: string }).category ?? '',
		});
	}

	searchDB = db;
	return db;
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('q');
	const locale = searchParams.get('locale') || 'zh'; // 默认为中文
	const category = searchParams.get('category'); // 可选的分类过滤
	const debug = searchParams.get('debug');

	// 调试模式：返回指定语言索引的文章
	if (debug === 'true') {
		const allPages = [...blog.getPages(locale)].map((page) => ({
			url: page.url,
			title: page.data.title,
			locale: page.locale,
		}));
		return Response.json({
			debug: true,
			locale,
			total: allPages.length,
			pages: allPages,
		});
	}

	// 如果没有查询，返回空结果
	if (!query || query.trim() === '') {
		return Response.json({ result: [] });
	}

	try {
		// 获取或创建搜索数据库
		const db = await getSearchDB();

		// 构建where过滤条件
		const whereConditions: Record<string, string> = {
			locale: locale,
		};

		// 如果指定了category，添加到过滤条件
		if (category && category.trim() !== '') {
			whereConditions.category = category;
		}

		// 执行搜索
		const searchResults = await search(db, {
			term: query,
			properties: ['title', 'description'],
			threshold: 0,
			limit: 20,
			boost: {
				title: 2, // 标题权重更高
				description: 1,
			},
			// 按语言和分类过滤结果
			where: whereConditions,
		});

		// 返回搜索结果
		return Response.json({
			result: searchResults.hits.map((hit) => ({
				id: hit.document.id,
				url: hit.document.url,
				title: hit.document.title,
				description: hit.document.description,
				locale: hit.document.locale,
				category: hit.document.category,
				score: hit.score,
			})),
		});
	} catch (error) {
		console.error('Search error:', error);
		return Response.json({ result: [], error: 'Search failed' }, { status: 500 });
	}
}
