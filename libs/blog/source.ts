import { loader } from 'fumadocs-core/source';
import { blog as blogSource } from '@/.source';
import { i18n } from '@/libs/i18n/fumadocs';

export const blog = loader({
	i18n,
	baseUrl: '/blog',
	source: blogSource.toFumadocsSource(),
});
