import { remarkNpm } from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
	dir: 'content/docs',
});

export const blog = defineDocs({
	dir: 'content/blog',
});

export default defineConfig({
	lastModifiedTime: 'git',
	mdxOptions: {
		remarkPlugins: [remarkNpm],
	},
});
