import { i18n } from '@/libs/legacy/utils/i18n';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import { blog as blogPosts, docs, meta } from '@/.source';

export const source = loader({
	i18n,
	baseUrl: '/docs',
	icon(icon) {
		if (!icon) {
			// You may set a default icon
			return;
		}

		if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
	},
	source: createMDXSource(docs, meta),
});

export const blog = loader({
	i18n,
	baseUrl: '/blog',
	source: createMDXSource(blogPosts, []),
});
