import 'server-only';

import { loader } from 'fumadocs-core/source';
import { appstore as appstoreSource } from '@/.source/server';

export const appstore = loader({
	baseUrl: '/products/appstore',
	source: appstoreSource.toFumadocsSource(),
});
