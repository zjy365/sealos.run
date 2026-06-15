import type { Metadata } from 'next';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import CategoriesAndListSection from './sections/CategoriesAndListSection';
import CTABannerSection from './sections/CTABannerSection';
import HeroSection from './sections/HeroSection';
import HotAndSubscribeSection from './sections/HotAndSubscribeSection';
import HotPostsSection from './sections/HotPostsSection';

export const dynamic = 'force-dynamic';
const SITE_URL = 'https://sealos.run';
const SITE_NAME = 'Sealos';
const PAGE_PATH = '/blog';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = 'Sealos 博客 - 云原生、Kubernetes、AI 与产品实践 - Sealos';
	const description =
		'Sealos 博客分享云原生、Kubernetes、AI 应用、数据库、运维实践与产品更新，帮助开发者和团队更高效地完成开发、部署与交付。';

	return {
		metadataBase: new URL(SITE_URL),
		title,
		description,
		alternates: {
			canonical: PAGE_PATH,
			languages: { zh: PAGE_PATH },
		},
		openGraph: {
			type: 'website',
			siteName: SITE_NAME,
			url: `${SITE_URL}${PAGE_PATH}`,
			title,
			description,
			locale: 'zh_CN',
		},
		twitter: {
			card: 'summary_large_image',
			site: '@Sealos_io',
			title,
			description,
		},
		robots: {
			index: isIndexableLocale,
			follow: true,
			googleBot: {
				index: isIndexableLocale,
				follow: true,
				'max-image-preview': 'large',
				'max-snippet': -1,
				'max-video-preview': -1,
			},
		},
	};
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: 'Sealos 博客',
				description:
					'Sealos 博客分享云原生、Kubernetes、AI 应用、数据库、运维实践与产品更新，帮助开发者和团队更高效地完成开发、部署与交付。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'Blog',
				'@id': `${SITE_URL}${PAGE_PATH}#blog`,
				name: 'Sealos 博客',
				url: `${SITE_URL}${PAGE_PATH}`,
				description: '聚焦云原生、AI、数据库与产品实践的技术博客。',
				inLanguage: 'zh-CN',
				publisher: {
					'@type': 'Organization',
					name: 'Sealos',
					url: SITE_URL,
				},
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${SITE_URL}${PAGE_PATH}#breadcrumb`,
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: '首页',
						item: SITE_URL,
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: '博客',
						item: `${SITE_URL}${PAGE_PATH}`,
					},
				],
			},
		],
	};

	return (
		<main className='min-h-screen'>
			<script
				type='application/ld+json'
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires raw HTML injection
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<HeroSection />
			<HotAndSubscribeSection locale={locale} />
			<HotPostsSection locale={locale} />
			<CategoriesAndListSection locale={locale} />
			<CTABannerSection />
		</main>
	);
}
