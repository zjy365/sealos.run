import type { Metadata } from 'next';
import { ClockCounterIcon, CloudBoxIcon, CubesIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { VerticalDashedLine } from '@/libs/components/VerticalDashedLine';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { StepsSectionLine } from './components/StepsSectionLine';
import { CTASection } from './sections/CTASection';
import { FAQSection, faqs } from './sections/FAQSection';
import { CloudCollaborationSection, QuickReleaseSection, UnifiedEnvironmentSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';
import { StepsSection } from './sections/StepsSection';

const SITE_URL = 'https://sealos.run';
const SITE_NAME = 'Sealos';
const PAGE_PATH = '/products/devbox';
const DEVBOX_DOC_HREF = '/docs/guides/devbox';
const DEVBOX_CREATE_HREF = 'https://cloud.sealos.run/';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = 'DevBox 云开发环境 - 集开发、测试、上线于一体的云开发平台 - Sealos';
	const description =
		'Sealos DevBox 提供云开发环境与在线开发平台能力，支持 Python、Java、Go、Node.js 等主流语言框架，可配合 VS Code、JetBrains 等 IDE 使用，具备环境隔离、团队协作、自动构建镜像和一键发布上线能力，帮助开发者减少本地配置成本，快速完成开发、测试与部署。';

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

export default async function DevBoxPage() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: 'DevBox 云开发环境',
				description:
					'Sealos DevBox 提供云开发环境与在线开发平台能力，支持 Python、Java、Go、Node.js 等主流语言框架，可配合 VS Code、JetBrains 等 IDE 使用，具备环境隔离、团队协作、自动构建镜像和一键发布上线能力。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'SoftwareApplication',
				'@id': `${SITE_URL}${PAGE_PATH}#software`,
				name: 'Sealos DevBox',
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'Cloud',
				url: `${SITE_URL}${PAGE_PATH}`,
				description: '面向开发者的云开发环境，支持远程开发、环境隔离、团队协作以及一键构建发布。',
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
						name: 'DevBox 云开发环境',
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

			<section className='relative container mx-auto px-6 pt-16 pb-30'>
				<StepsSectionLine />

				<StepsSection />
			</section>

			<section className='relative container mx-auto pt-4 pr-6 pb-12 pl-16 sm:pl-24'>
				<VerticalDashedLine
					iconY='4.5rem'
					className='[--icon-base-size:2.5rem] sm:[--icon-base-size:3rem]'
				>
					<Icon
						src={CloudBoxIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<UnifiedEnvironmentSection />
			</section>

			<section className='relative container mx-auto pt-4 pr-6 pb-12 pl-16 sm:pl-24'>
				<VerticalDashedLine
					iconY='4.5rem'
					className='[--icon-base-size:2.5rem] sm:[--icon-base-size:3rem]'
				>
					<Icon
						src={CubesIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<CloudCollaborationSection />
			</section>

			<section className='relative container mx-auto pt-4 pr-6 pb-12 pl-16 sm:pl-24'>
				<VerticalDashedLine
					iconY='4.5rem'
					className='[--icon-base-size:2.5rem] sm:[--icon-base-size:3rem]'
				>
					<Icon
						src={ClockCounterIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<QuickReleaseSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FAQSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-20'>
					<CTASection
						createHref={DEVBOX_CREATE_HREF}
						docHref={DEVBOX_DOC_HREF}
					/>
				</div>
			</section>
		</div>
	);
}
