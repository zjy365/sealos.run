import { remarkNpm } from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';

export const docs = defineDocs({
	dir: 'content/docs',
});

export const blog = defineDocs({
	dir: 'content/blog',
});

export default defineConfig({
	plugins: [lastModified()],
	mdxOptions: {
		remarkPlugins: [remarkNpm],
	},
});
