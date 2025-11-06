import { create, insert, search } from '@orama/orama';
import { stopwords as englishStopwords } from '@orama/stopwords/english';
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import type { NextRequest } from 'next/server';
import { blog } from '@/libs/blog/source';

export const revalidate = false;

const combinedStopwords = [...mandarinStopwords, ...englishStopwords];

let searchDB: Awaited<ReturnType<typeof create>> | null = null;

/**
 * Get or create the search database instance.
 * Creates an Orama database with Mandarin tokenizer and indexes all blog posts.
 *
 * @returns The search database instance
 */
async function getSearchDB() {
	if (searchDB) {
		return searchDB;
	}

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

	const allPages = blog.getPages();

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

/**
 * Search blog posts API endpoint.
 * Supports querying by search term, locale, and optional category filter.
 *
 * @param request - Next.js request object
 * @returns JSON response with search results
 */
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('q');
	const locale = searchParams.get('locale') || 'zh';
	const category = searchParams.get('category');
	const debug = searchParams.get('debug');

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

	if (!query || query.trim() === '') {
		return Response.json({ result: [] });
	}

	try {
		const db = await getSearchDB();

		const whereConditions: Record<string, string> = {
			locale: locale,
		};

		if (category && category.trim() !== '') {
			whereConditions.category = category;
		}

		const searchResults = await search(db, {
			term: query,
			properties: ['title', 'description'],
			threshold: 0,
			limit: 20,
			boost: {
				title: 2,
				description: 1,
			},
			where: whereConditions,
		});

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
