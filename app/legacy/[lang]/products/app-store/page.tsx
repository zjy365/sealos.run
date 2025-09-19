import Footer from '@/libs/legacy/components/footer';
import Header from '@/libs/legacy/components/header';
import Hero from '@/libs/legacy/components/header/hero';
import { templateDomain } from '@/libs/legacy/config/site';
import { LANGUAGES, type languagesType } from '@/libs/legacy/utils/i18n';
import { generatePageMetadata } from '@/libs/legacy/utils/metadata';
import Feature from './components/feature';
import FooterCta from './components/footerCta';
import HighlightedApps from './components/highlighted-apps-server';

// Define translations for different languages
const translations = {
	en: {
		title: {
			main: 'Deploy Applications in One Click',
			sub: 'Transform complex Kubernetes deployments into simple app store experiences.',
		},
	},
	'zh-cn': {
		title: {
			main: '一键部署应用程序',
			sub: '将复杂的 Kubernetes 部署转换为简单的应用商店体验.',
		},
	},
};

// Generate static params for all supported languages
export async function generateStaticParams() {
	return LANGUAGES.map((lang) => ({
		lang: lang,
	}));
}

// Generate metadata function that supports internationalization
export async function generateMetadata(props: { params: Promise<{ lang: languagesType }> }) {
	const params = await props.params;
	const t = translations[params.lang] || translations.en;
	return generatePageMetadata({
		title: 'App Store' + ' | ' + t.title.sub,
		description: t.title.main + ' ' + t.title.sub,
		pathname: '/products/app-store',
		lang: params.lang,
	});
}

export default async function AppStorePage(props: { params: Promise<{ lang: languagesType }> }) {
	const params = await props.params;
	const t = translations[params.lang] || translations.en;

	return (
		<div className='h-full bg-[#EBF2FF]'>
			<Header lang={params.lang} />
			<main className='custom-container px-8 pt-14 md:px-[15%]'>
				<Hero
					title={t.title}
					mainTitleEmphasis={2}
					getStartedLink={templateDomain}
					lang={params.lang}
					testimonial={false}
					videoCta={false}
				></Hero>
				<Feature />
				<div
					id='deploy'
					className='scroll-m-0'
				/>

				<HighlightedApps lang={params.lang} />
				<FooterCta />
			</main>
			<div className='mt-[140px] h-[1px] bg-[#DDE7F7]'></div>
			<Footer lang={params.lang} />
		</div>
	);
}
