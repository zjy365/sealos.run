import type { Metadata } from 'next';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { LegalPage } from '../components/LegalPage';
import { legalPages } from '../utils/legal-pages';

const SITE_URL = 'https://sealos.run';
const PAGE_PATH = '/legal/privacy-policy';
const content = legalPages.privacyPolicy;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';

	return {
		metadataBase: new URL(SITE_URL),
		title: `${content.title} - Sealos`,
		description: content.description,
		alternates: {
			canonical: PAGE_PATH,
			languages: { zh: PAGE_PATH },
		},
		openGraph: {
			type: 'article',
			siteName: 'Sealos',
			url: `${SITE_URL}${PAGE_PATH}`,
			title: `${content.title} - Sealos`,
			description: content.description,
			locale: 'zh_CN',
		},
		robots: {
			index: isIndexableLocale,
			follow: true,
		},
	};
}

export default function PrivacyPolicyPage() {
	return <LegalPage content={content} />;
}
