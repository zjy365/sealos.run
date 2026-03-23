import { loader } from 'fumadocs-core/source';
import { blog as blogSource } from '@/.source/server';

export const blog = loader({
	baseUrl: '/blog',
	source: blogSource.toFumadocsSource(),
});
