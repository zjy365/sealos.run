import type { Metadata } from 'next';
import { Config } from '@/libs/config';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { BootstrapSection } from './sections/BootstrapSection';
import { CTASection } from './sections/CTASection';
import { HeroSection } from './sections/HeroSection';
import { SolutionsGridSection } from './sections/SolutionsGridSection';

const SITE_URL = 'https://sealos.run';
const SITE_NAME = 'Sealos';
const PAGE_PATH = '/solutions';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = '行业解决方案 - 云原生、AI 与应用部署方案 - Sealos';
	const description =
		'Sealos 行业解决方案覆盖云原生平台建设、AI 应用落地、开发环境标准化、应用交付与企业私有化部署，帮助企业快速完成基础设施升级与业务上线。';

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

export default async function SolutionsPage() {
	const githubHref =
		Config.components.footer.socialLinks.find((link) => link.name === 'Github')?.url ??
		'https://github.com/labring/sealos';
	const contactFormConfig = Config.pages.solutions.contactForm;
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: '行业解决方案',
				description:
					'Sealos 行业解决方案覆盖云原生平台建设、AI 应用落地、开发环境标准化、应用交付与企业私有化部署。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'Service',
				'@id': `${SITE_URL}${PAGE_PATH}#service`,
				name: 'Sealos 行业解决方案',
				serviceType: 'Cloud Native Solution',
				provider: {
					'@type': 'Organization',
					name: 'Sealos',
					url: SITE_URL,
				},
				url: `${SITE_URL}${PAGE_PATH}`,
				description: '面向企业数字化升级的云原生、AI 与应用部署解决方案。',
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
						name: '解决方案',
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
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection contactFormConfig={contactFormConfig} />
			</section>

			<section
				id='solutions'
				className='container mx-auto px-6 py-16'
			>
				<SolutionsGridSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<BootstrapSection
					githubHref={githubHref}
					contactFormConfig={contactFormConfig}
				/>
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
