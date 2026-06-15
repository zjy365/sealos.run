import type { Metadata } from 'next';
import { Config } from '@/libs/config';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { CalculatorSection } from './sections/CalculatorSection';
import { CTASection } from './sections/CTASection';
import { FAQSection } from './sections/FAQSection';
import { HeroSection } from './sections/HeroSection';
import { paygFaqs } from './utils/payg.faq';

const SITE_URL = 'https://sealos.run';
const SITE_NAME = 'Sealos';
const PAGE_PATH = '/pricing/payg';

const metadataByLocale = {
	zh: {
		title: '低成本云服务器，0.5 核起按小时计费 - 应用部署成本计算器 - Sealos',
		description:
			'Sealos 按量计费云服务器，CPU 低至 ¥0.017/核·小时，0.5 核轻量配置即可起步，暂停不计费。在线计算器实时估算官网、SaaS、数据库与 AI 应用的部署成本，新用户注册即送 ¥100 代金券。',
		locale: 'zh_CN',
	},
} as const;

const faqJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: paygFaqs.map((faq) => ({
		'@type': 'Question',
		name: faq.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: faq.answer,
		},
	})),
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const actualLocale = getPrimaryLocale(locale);
	const isIndexableLocale = actualLocale === 'zh';
	const canonicalPath = PAGE_PATH;
	const metadata = metadataByLocale.zh;

	return {
		metadataBase: new URL(SITE_URL),
		title: metadata.title,
		description: metadata.description,
		alternates: {
			canonical: canonicalPath,
			languages: {
				zh: PAGE_PATH,
			},
		},
		openGraph: {
			type: 'website',
			siteName: SITE_NAME,
			url: `${SITE_URL}${PAGE_PATH}`,
			title: metadata.title,
			description: metadata.description,
			locale: metadata.locale,
		},
		twitter: {
			card: 'summary_large_image',
			site: '@Sealos_io',
			title: metadata.title,
			description: metadata.description,
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

export default async function PaygPricingPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const { signinLink } = Config.components.navbar;
	const actualLocale = getPrimaryLocale(locale);
	const shouldRenderSeoLocaleNotice = actualLocale !== 'zh';

	return (
		<div className='flex w-full flex-col'>
			{!shouldRenderSeoLocaleNotice && (
				<script
					type='application/ld+json'
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires raw HTML injection
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
				/>
			)}
			{shouldRenderSeoLocaleNotice && (
				<div className='sr-only'>
					This page currently uses the Chinese pricing content and canonical SEO version.
				</div>
			)}
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection />
			</section>

			<section>
				<CalculatorSection signinHref={signinLink} />
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
