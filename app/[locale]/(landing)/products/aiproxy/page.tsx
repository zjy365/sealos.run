import type { Metadata } from 'next';
import { FramedQuestionIcon, ModelIcon } from '@/assets/icons';
import { getAiproxyModels } from '@/libs/aiproxy/utils';
import { Icon } from '@/libs/components/ui/icon';
import { VerticalDashedLine } from '@/libs/components/VerticalDashedLine';
import { Config } from '@/libs/config';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { CTASection } from './sections/CTASection';
import { FAQSection, faqs } from './sections/FAQSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';
import { MigGuideSection } from './sections/MigGuideSection';
import { ModelsSection } from './sections/ModelsSection';

const SITE_URL = 'https://sealos.run';
const SITE_NAME = 'Sealos';
const PAGE_PATH = '/products/aiproxy';
const AIPROXY_DOC_HREF = '/docs/guides/ai-proxy';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';
	const title = 'AI Proxy - 全球 AI 大模型统一接入平台，一键生成 API Key - Sealos';
	const description =
		'Sealos AI Proxy 用一个 API Key 接入 100+ 主流大模型，覆盖语言、语音、图片、视频等多模态能力。统一计费、按量付费，免去多平台密钥管理，快速集成到你的 AI 应用。';

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

export default async function AiproxyPage() {
	const { signinLink } = Config.components.navbar;
	const models = getAiproxyModels();
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}${PAGE_PATH}#webpage`,
				url: `${SITE_URL}${PAGE_PATH}`,
				name: 'AI Proxy',
				description:
					'Sealos AI Proxy 用一个 API Key 接入 100+ 主流大模型，覆盖语言、语音、图片、视频等多模态能力。统一计费、按量付费，免去多平台密钥管理，快速集成到你的 AI 应用。',
				inLanguage: 'zh-CN',
			},
			{
				'@type': 'SoftwareApplication',
				'@id': `${SITE_URL}${PAGE_PATH}#software`,
				name: 'Sealos AI Proxy',
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'Cloud',
				url: `${SITE_URL}${PAGE_PATH}`,
				description: '统一接入全球 AI 大模型的平台，支持 API Key 管理、OpenAI 协议兼容与多模型调用。',
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
						item: `${SITE_URL}${PAGE_PATH}`,
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: 'AI Proxy',
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

			<section className='relative container mx-auto py-16 pt-4 pr-6 pb-20 pl-16 sm:pl-24'>
				<VerticalDashedLine>
					<Icon
						src={ModelIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<ModelsSection models={models} />
			</section>

			<section className='relative container mx-auto'>
				{/* Decoration line is inside the section */}
				<MigGuideSection signinHref={signinLink} />
			</section>

			<section className='relative container mx-auto py-16 pt-20 pr-6 pl-16 sm:pl-24'>
				<VerticalDashedLine iconY='4.5rem'>
					<Icon
						src={FramedQuestionIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<FAQSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-20'>
					<CTASection docHref={AIPROXY_DOC_HREF} />
				</div>
			</section>
		</div>
	);
}
