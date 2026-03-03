import 'server-only';

import { loader } from 'fumadocs-core/source';
import { appstore as appstoreSource } from '@/.source/server';
import { i18n } from '@/libs/i18n/fumadocs';

export const appstore = loader({
	i18n,
	baseUrl: '/products/appstore',
	source: appstoreSource.toFumadocsSource(),
});
