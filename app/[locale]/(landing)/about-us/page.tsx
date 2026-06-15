import type { Metadata } from 'next';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { AppsSection } from './sections/AppsSection';
import { CertsSection } from './sections/CertsSection';
import { ContactSection } from './sections/ContactSection';
import { CTASection } from './sections/CTASection';
import { CultureSection } from './sections/CultureSection';
import { HeroSection } from './sections/HeroSection';
import { MilestoneSection } from './sections/MilestoneSection';

const SITE_URL = 'https://sealos.run';
const SITE_NAME = 'Sealos';
const PAGE_PATH = '/about-us';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = '关于 Sealos - 云操作系统与云原生平台团队介绍 - Sealos';
	const description =
		'Sealos 专注构建云操作系统与云原生平台，提供公有云、私有云、云开发、应用管理、数据库、对象存储与 AI 应用能力，服务企业与开发者高效完成应用开发、部署与运维。';

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

export default async function AboutUsPage() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: '关于 Sealos',
				description:
					'Sealos 专注构建云操作系统与云原生平台，提供公有云、私有云、云开发、应用管理、数据库、对象存储与 AI 应用能力。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'Organization',
				'@id': `${SITE_URL}${PAGE_PATH}#organization`,
				name: '珠海环界云计算有限公司',
				alternateName: 'Sealos',
				url: SITE_URL,
				email: 'liwen@sealos.io',
				address: {
					'@type': 'PostalAddress',
					addressCountry: 'CN',
					addressRegion: '浙江省',
					addressLocality: '杭州市',
					streetAddress: '余杭区五常街道阿里巴巴数字创新生态园6幢4楼W405（西五电梯4楼）',
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
						name: '关于我们',
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
			<section>
				<HeroSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<AppsSection />
			</section>

			<section className='mx-auto w-full max-w-screen overflow-x-clip px-6 py-16'>
				<MilestoneSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<CertsSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<CultureSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<ContactSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
