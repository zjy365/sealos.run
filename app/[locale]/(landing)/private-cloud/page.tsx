import type { Metadata } from 'next';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { ArchSection } from './sections/ArchSection';
import { ComparisonSection } from './sections/ComparisonSection';
import { CTASection } from './sections/CTASection';
import { HeroSection } from './sections/HeroSection';
import { ScenarioSection } from './sections/ScenarioSection';

const SITE_URL = 'https://sealos.run';
const SITE_NAME = 'Sealos';
const PAGE_PATH = '/private-cloud';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = '企业私有云 - 云原生私有化部署平台与 Kubernetes 方案 - Sealos';
	const description =
		'Sealos 企业私有云为企业提供安全可控、开箱即用的云原生私有化部署平台，支持 Kubernetes、信创国产化、多云异构适配、统一应用管理与标准化交付。';

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

export default async function PrivateCloudPage() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: '企业私有云',
				description:
					'Sealos 企业私有云为企业提供安全可控、开箱即用的云原生私有化部署平台，支持 Kubernetes、信创国产化、多云异构适配、统一应用管理与标准化交付。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'SoftwareApplication',
				'@id': `${SITE_URL}${PAGE_PATH}#software`,
				name: 'Sealos Private Cloud',
				applicationCategory: 'BusinessApplication',
				operatingSystem: 'Cloud',
				url: `${SITE_URL}${PAGE_PATH}`,
				description: '面向企业私有化部署的云原生平台，支持 Kubernetes、统一交付、运维治理与国产化适配。',
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
						name: '私有化',
						item: `${SITE_URL}${PAGE_PATH}`,
					},
				],
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
			<section className='container mx-auto px-6 pt-12 pb-4'>
				<HeroSection />
			</section>

			<section className='container mx-auto px-6 pb-24'>
				<ScenarioSection />
			</section>

			<section className='relative container mx-auto px-6 pb-24'>
				<ArchSection />
			</section>

			<section className='container mx-auto px-6 pb-20'>
				<ComparisonSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
