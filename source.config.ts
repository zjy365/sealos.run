import { remarkNpm } from 'fumadocs-core/mdx-plugins';
import { pageSchema } from 'fumadocs-core/source/schema';
import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';

const aiproxyModelTypeSchema = z.enum([
	'unknown',
	'chat-completion',
	'text-completion',
	'embedding',
	'moderation',
	'image-generation',
	'text-edit',
	'text-to-speech',
	'speech-to-text',
	'audio-translation',
	'rerank',
	'pdf-parse',
]);

const aiproxyCapabilitySchema = z.enum(['tool_choice', 'vision', 'coder']);

export const docs = defineDocs({
	dir: 'content/content/docs',
});

export const blog = defineDocs({
	dir: 'content/content/blog',
});

export const appstore = defineDocs({
	dir: 'content/content/appstore',
	docs: {
		schema: pageSchema.extend({
			category: z.string().optional(),
			deployCount: z.coerce.number().int().positive().optional(),
			starsText: z.string().optional(),
			versionText: z.string().optional(),
			trendDeltaText: z.string().optional(),
			thumbnail: z.string().optional(),
			rank: z.coerce.number().int().min(1).max(5).optional(),
		}),
	},
});

export const aiproxyModels = defineCollections({
	type: 'meta',
	dir: 'content/content/aiproxy-models',
	schema: z.object({
		name: z.string(),
		ownerKey: z.string(),
		type: aiproxyModelTypeSchema,
		contextSize: z.coerce.number().int().positive().optional(),
		maxOutputTokens: z.coerce.number().int().positive().optional(),
		maxInputTokens: z.coerce.number().int().positive().optional(),
		rpm: z.coerce.number().int().nonnegative(),
		inputPrice: z.coerce.number().nonnegative(),
		outputPrice: z.coerce.number().nonnegative(),
		capabilities: z.array(aiproxyCapabilitySchema).default([]),
	}),
});

export default defineConfig({
	plugins: [lastModified()],
	mdxOptions: {
		remarkPlugins: [remarkNpm],
	},
});
