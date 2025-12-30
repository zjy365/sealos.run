import { loader } from 'fumadocs-core/source';
import { docs } from '@/.source/server';
import { i18n } from '@/libs/i18n/fumadocs';

export const source = loader({
	i18n,
	baseUrl: '/docs',
	source: docs.toFumadocsSource(),
});
