import type { Metadata } from 'next';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { ComparisonSection } from './sections/ComparisonSection';
import { CTASection } from './sections/CTASection';
import { FAQSection, faqs } from './sections/FAQSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';
import { StepsSection } from './sections/StepsSection';

const SITE_URL = 'https://sealos.run';
const SITE_NAME = 'Sealos';
const PAGE_PATH = '/products/launchpad';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = 'Docker 应用部署平台 - 一键部署容器，免写 YAML - Sealos';
	const description =
		'Sealos 提供面向开发者的 Docker 应用部署平台，无需编写 YAML，即可一键部署容器应用。支持自动 HTTPS、弹性伸缩、健康自愈与按量计费，适合网站、API、微服务和内部工具快速上线。';

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

export default async function LaunchpadPage() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: 'Docker 应用部署平台',
				description:
					'Sealos 提供面向开发者的 Docker 应用部署平台，无需编写 YAML，即可一键部署容器应用。支持自动 HTTPS、弹性伸缩、健康自愈与按量计费，适合网站、API、微服务和内部工具快速上线。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'SoftwareApplication',
				'@id': `${SITE_URL}${PAGE_PATH}#software`,
				name: 'Sealos App Launchpad',
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'Cloud',
				url: `${SITE_URL}${PAGE_PATH}`,
				description: '一键部署 Docker 容器应用的云平台，支持自动 HTTPS、弹性伸缩、健康自愈与按量计费。',
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
						item: `${SITE_URL}/products/launchpad`,
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: 'Docker 应用部署平台',
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
				<HeroSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FeaturesSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<StepsSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<ComparisonSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FAQSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-20'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
