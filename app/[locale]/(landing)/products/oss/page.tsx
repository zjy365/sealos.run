import type { Metadata } from 'next';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { CTASection } from './sections/CTASection';
import { FAQSection, faqs } from './sections/FAQSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';
import { ScenariosSection } from './sections/ScenariosSection';
import { TypesSection } from './sections/TypesSection';

const SITE_URL = 'https://sealos.run';
const PAGE_PATH = '/products/oss';
const OSS_DOC_HREF = '/docs/getting-started/create-object-storage';
const OSS_CREATE_HREF = 'https://cloud.sealos.run/?openapp=system-objectstorage%3F%2FbucketConfig%3F';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = 'S3 对象存储 - 云原生对象存储，兼容 S3 协议 - Sealos';
	const description =
		'Sealos S3 对象存储兼容主流 S3 协议与工具链，支持静态资源托管、数据备份归档和 AI 数据集存储。按需付费、从 GB 到 PB 无缝扩展，适合企业和开发者快速上线。';

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

export default async function OssPage() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: 'S3 对象存储',
				description:
					'Sealos S3 对象存储兼容主流 S3 协议与工具链，支持静态资源托管、数据备份归档和 AI 数据集存储。按需付费、从 GB 到 PB 无缝扩展，适合企业和开发者快速上线。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'SoftwareApplication',
				'@id': `${SITE_URL}${PAGE_PATH}#software`,
				name: 'Sealos Object Storage',
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'Cloud',
				url: `${SITE_URL}${PAGE_PATH}`,
				description: '兼容 S3 协议的云原生对象存储服务，支持静态资源托管、备份归档与 AI 数据集存储。',
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'CNY',
					description: '按量付费，注册即可开始使用',
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
						item: `${SITE_URL}/products/oss`,
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: 'S3 对象存储',
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
				<HeroSection createHref={OSS_CREATE_HREF} />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<ScenariosSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FeaturesSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<TypesSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FAQSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-20'>
					<CTASection
						createHref={OSS_CREATE_HREF}
						docHref={OSS_DOC_HREF}
					/>
				</div>
			</section>
		</div>
	);
}
