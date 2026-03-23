import { remarkNpm } from 'fumadocs-core/mdx-plugins';
import { pageSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';

const docsFrontmatterSchema = pageSchema.extend({
	keywords: z.union([z.string(), z.array(z.string())]).optional(),
	seoTitle: z.string().optional(),
	seoDescription: z.string().optional(),
});

export const docs = defineDocs({
	dir: 'content/docs',
	docs: {
		schema: docsFrontmatterSchema,
	},
});

export const blog = defineDocs({
	dir: 'content/blog',
});

export const appstore = defineDocs({
	dir: 'content/appstore',
	docs: {
		schema: pageSchema.extend({
			category: z.string().optional(),
			starsText: z.string().optional(),
			versionText: z.string().optional(),
			trendDeltaText: z.string().optional(),
			thumbnail: z.string().optional(),
			rank: z.coerce.number().int().min(1).max(5).optional(),
		}),
	},
});

export default defineConfig({
	plugins: [lastModified()],
	mdxOptions: {
		remarkPlugins: [remarkNpm],
	},
});
