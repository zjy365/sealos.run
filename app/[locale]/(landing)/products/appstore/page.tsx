import type { Metadata } from 'next';
import Image from 'next/image';
import { getAppStoreTemplates } from '@/libs/appstore/utils';
import { Config } from '@/libs/config';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { ReqBgImage } from './assets';
import { AppStoreSearchExperience } from './sections/AppStoreSearchExperience';
import { CTASection } from './sections/CTASection';
import { FAQSection, faqs } from './sections/FAQSection';
import { RequestSection } from './sections/RequestSection';
import { TrendsSection } from './sections/TrendsSection';

const SITE_URL = 'https://sealos.run';
const SITE_NAME = 'Sealos';
const PAGE_PATH = '/products/appstore';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = '应用商店 - 1000+ 开源项目模板一键部署 - Sealos';
	const description =
		'Sealos 应用商店收录 1000+ 开源项目模板，已部署超 10 万应用实例。无需配置 YAML，搜索项目名称即可像安装 App 一样一键部署数据库、AI、博客、开发工具等开源应用。';

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

export default async function AppStorePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const templates = getAppStoreTemplates(locale);
	const templateRequestFormConfig = Config.pages.appstore.templateRequestForm;
	const templateDeployUrlTemplate = Config.pages.appstore.templateDeployUrlTemplate;
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: '应用商店',
				description:
					'Sealos 应用商店收录 1000+ 开源项目模板，已部署超 10 万应用实例。无需配置 YAML，搜索项目名称即可像安装 App 一样一键部署数据库、AI、博客、开发工具等开源应用。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'SoftwareApplication',
				'@id': `${SITE_URL}${PAGE_PATH}#software`,
				name: 'Sealos App Store',
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'Cloud',
				url: `${SITE_URL}${PAGE_PATH}`,
				description: '提供开源项目模板一键部署能力的应用商店，适合快速安装数据库、AI、博客和开发工具等应用。',
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'CNY',
					description: '注册即可开始使用',
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
						item: `${SITE_URL}${PAGE_PATH}`,
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: '应用商店',
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
			<AppStoreSearchExperience
				templates={templates}
				templateDeployUrlTemplate={templateDeployUrlTemplate}
			/>

			<section className='container mx-auto px-6 py-16'>
				<TrendsSection
					locale={locale}
					templateDeployUrlTemplate={templateDeployUrlTemplate}
				/>
			</section>

			<section className='relative w-full overflow-hidden py-16'>
				<div className='pointer-events-none absolute inset-x-0 bottom-0 -z-10 select-none'>
					<div className='mx-auto w-full max-w-360 min-w-200'>
						<Image
							src={ReqBgImage}
							alt=''
							className='h-auto w-full'
						/>
					</div>
				</div>
				<div className='container mx-auto px-6'>
					<RequestSection templateRequestFormConfig={templateRequestFormConfig} />
				</div>
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FAQSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
