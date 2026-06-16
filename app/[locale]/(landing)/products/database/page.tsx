import type { Metadata } from 'next';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { CapsSection } from './sections/CapsSection';
import { CTASection } from './sections/CTASection';
import { DatabasesSection } from './sections/DatabasesSection';
import { FAQSection, faqs } from './sections/FAQSection';
import { HeroSection } from './sections/HeroSection';

const SITE_URL = 'https://sealos.run';
const PAGE_PATH = '/products/database';
const DATABASE_CREATE_HREF = 'https://hzh.sealos.run/?openapp=system-dbprovider%3F%2Fdb%2Fedit%3F';
const DATABASE_DOC_HREF = '/docs/getting-started/create-database';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = '云数据库 - 一键部署 MySQL、PostgreSQL、Redis、MongoDB - Sealos';
	const description =
		'Sealos 云数据库支持一键部署 MySQL、PostgreSQL、Redis、MongoDB、Kafka 和 Milvus，内置自动备份、故障自愈、监控告警与按量计费，适合生产环境快速上线。';

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
			siteName: 'Sealos',
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

export default async function DatabasePage() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: '云数据库',
				description:
					'Sealos 云数据库支持一键部署 MySQL、PostgreSQL、Redis、MongoDB、Kafka 和 Milvus，内置自动备份、故障自愈、监控告警与按量计费，适合生产环境快速上线。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'SoftwareApplication',
				'@id': `${SITE_URL}${PAGE_PATH}#software`,
				name: 'Sealos Database',
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'Cloud',
				url: `${SITE_URL}${PAGE_PATH}`,
				description: '一键部署云数据库的平台，支持 MySQL、PostgreSQL、Redis、MongoDB 等数据库服务。',
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'CNY',
					description: '按量计费，注册即可开始使用',
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
						name: '产品',
						item: `${SITE_URL}/products/database`,
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: '云数据库',
						item: `${SITE_URL}${PAGE_PATH}`,
					},
				],
			},
			{
				'@type': 'FAQPage',
				'@id': `${SITE_URL}${PAGE_PATH}#faq`,
				mainEntity: faqs.map((faq) => ({
					'@type': 'Question',
					name: faq.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: faq.answer,
					},
				})),
			},
		],
	};

	return (
		<div className='flex w-full flex-col'>
			<script
				type='application/ld+json'
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires raw HTML injection
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection createHref={DATABASE_CREATE_HREF} />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<DatabasesSection createHref={DATABASE_CREATE_HREF} />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<CapsSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FAQSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-20'>
					<CTASection
						createHref={DATABASE_CREATE_HREF}
						docHref={DATABASE_DOC_HREF}
					/>
				</div>
			</section>
		</div>
	);
}
