import type { languagesType } from '@/libs/legacy/utils/i18n';
import { generatePageMetadata } from '@/libs/legacy/utils/metadata';
import CallToAction from './components/call-to-action';
import CaseGrid from './components/case-grid';
import FeaturedCases from './components/featured-cases';
import Hero from './components/hero';
import Testimonials from './components/testimonials';
import TrustedCompanies from './components/trusted-companies';

const translations = {
	en: {
		title: 'Customer Success Stories',
		description:
			'Discover how industry leaders and technology pioneers leverage our platform to power up their applications and accelerate business growth.',
	},
	'zh-cn': {
		title: '客户成功案例',
		description: '了解行业领导者和技术先驱如何利用我们的平台为其应用提供动力并加速业务增长。',
	},
};

export async function generateMetadata(props: { params: Promise<{ lang: languagesType }> }) {
	const params = await props.params;
	const t = translations[params.lang];

	return generatePageMetadata({
		title: t.title,
		description: t.description,
		pathname: `${params.lang}/customers`,
	});
}

export default async function CasePage(props: { params: Promise<{ lang: languagesType }> }) {
	const params = await props.params;
	return (
		<main className='px-8 pt-20 md:px-[15%]'>
			<div className='space-y-16'>
				{' '}
				{/* Increased spacing between sections for better visual separation */}
				<Hero lang={params.lang} />
				<FeaturedCases lang={params.lang} />
				<CaseGrid lang={params.lang} />
				<Testimonials lang={params.lang} />
				<TrustedCompanies lang={params.lang} />
				<CallToAction lang={params.lang} />
			</div>
		</main>
	);
}
