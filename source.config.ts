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
			github: z.url().optional(),
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

const githubUserSchema = z.looseObject({
	login: z.string(),
	id: z.coerce.number().int().nonnegative(),
	node_id: z.string().optional(),
	avatar_url: z.url().optional(),
	html_url: z.url().optional(),
	type: z.string().optional(),
	site_admin: z.boolean().optional(),
});

const githubLicenseSchema = z.looseObject({
	key: z.string().optional(),
	name: z.string().optional(),
	spdx_id: z.string().nullable().optional(),
	url: z.url().nullable().optional(),
	node_id: z.string().optional(),
});

const githubRepositorySchema = z.looseObject({
	id: z.coerce.number().int().nonnegative(),
	node_id: z.string(),
	name: z.string(),
	full_name: z.string(),
	private: z.boolean(),
	owner: githubUserSchema,
	html_url: z.url(),
	description: z.string().nullable().optional(),
	fork: z.boolean().optional(),
	url: z.string().optional(),
	homepage: z.string().nullable().optional(),
	language: z.string().nullable().optional(),
	topics: z.array(z.string()).optional(),
	visibility: z.string().optional(),
	default_branch: z.string().optional(),
	archived: z.boolean().optional(),
	disabled: z.boolean().optional(),
	open_issues_count: z.coerce.number().int().nonnegative().optional(),
	stargazers_count: z.coerce.number().int().nonnegative().optional(),
	watchers_count: z.coerce.number().int().nonnegative().optional(),
	subscribers_count: z.coerce.number().int().nonnegative().optional(),
	forks_count: z.coerce.number().int().nonnegative().optional(),
	network_count: z.coerce.number().int().nonnegative().optional(),
	size: z.coerce.number().int().nonnegative().optional(),
	has_issues: z.boolean().optional(),
	has_projects: z.boolean().optional(),
	has_discussions: z.boolean().optional(),
	has_wiki: z.boolean().optional(),
	has_pages: z.boolean().optional(),
	has_downloads: z.boolean().optional(),
	pushed_at: z.iso.datetime().optional(),
	updated_at: z.iso.datetime().optional(),
	created_at: z.iso.datetime().optional(),
	license: githubLicenseSchema.nullable().optional(),
});

export const githubMetadata = defineCollections({
	type: 'meta',
	dir: 'content/content/github-metadata',
	schema: githubRepositorySchema,
});

export default defineConfig({
	plugins: [lastModified()],
	mdxOptions: {
		remarkPlugins: [remarkNpm],
	},
});
