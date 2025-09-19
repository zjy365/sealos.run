import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Footer from '@/libs/legacy/components/footer';
import Header from '@/libs/legacy/components/header';
import Hero from '@/libs/legacy/components/header/hero';
import RedirectSuggest from '@/libs/legacy/components/redirectSuggest';
import ScrollProgressWrapper from '@/libs/legacy/components/scroll-progress-wrapper';
import { TailwindIndicator } from '@/libs/legacy/components/tailwind-indicator';
import { CallToActionSection } from '@/libs/legacy/components/ui/call-to-action-section';
import { appDomain } from '@/libs/legacy/config/site';
import { i18n, type languagesType } from '@/libs/legacy/utils/i18n';
import Desktop from './components/desktop';
import HeroBenefits from './components/hero-benefits';
import ProblemsAndSolutions from './components/problems-solutions';
import Trusted from './components/trusted';
import WhyChooseUs from './components/why-choose-us';

const FAQ = dynamic(() => import('./components/faq'), {
	loading: () => <div className='min-h-[400px]' />,
});

const WorkflowShowcase = dynamic(() => import('./components/workflow-showcase'), {
	loading: () => <div className='min-h-[400px]' />,
});

const DevBoxShowcase = dynamic(() => import('./components/devbox-showcase'), {
	loading: () => <div className='min-h-[600px]' />,
});

// Define translations only for strings used directly in this component
const translations = {
	en: {
		title: {
			main: 'End Cloud Complexity. Start Building.',
			sub: 'Enterprise-grade infrastructure as simple as your desktop',
		},
		desktop: {
			title: 'Experience Sealos Cloud OS',
			description:
				'Try Sealos interactive desktop experience. Click on modules to explore their features, drag windows around, and resize them just like a real desktop environment.',
		},
	},
	'zh-cn': {
		title: {
			main: '终结云复杂性，开始构建',
			sub: '企业级基础设施，如桌面般简单',
		},
		desktop: {
			title: '体验 Sealos 云操作系统',
			description: '尝试 Sealos 的交互式桌面体验。点击模块探索其功能，拖拽窗口，就像真实的桌面环境一样调整大小。',
		},
	},
};

export default async function HomePage(props: { params: Promise<{ lang: languagesType }> }) {
	const params = await props.params;
	const lang = i18n.languages.includes(params.lang) ? params.lang : i18n.defaultLanguage;
	const t = translations[lang] || translations.en;

	return (
		<div className='h-full bg-[#EBF2FF]'>
			<Header lang={lang} />
			<ScrollProgressWrapper />

			<main className='custom-container px-8 pt-14 pb-20 md:px-[15%]'>
				<Hero
					title={t.title}
					mainTitleEmphasis={2}
					getStartedLink={appDomain}
					lang={lang}
				>
					<div className='mx-auto hidden max-w-7xl sm:block'>
						<Suspense
							fallback={
								<div className='flex min-h-[600px] items-center justify-center'>
									<div className='animate-pulse text-gray-500'>Loading desktop experience...</div>
								</div>
							}
						>
							<Desktop />
						</Suspense>
					</div>

					<div className='mt-12'>
						<HeroBenefits lang={lang} />
					</div>
				</Hero>
			</main>

			<div className='space-y-20'>
				<div className='custom-container px-8 md:px-[15%]'>
					<ProblemsAndSolutions lang={lang} />
				</div>

				<div className='custom-container px-8 md:px-[15%]'>
					<DevBoxShowcase lang={lang} />
				</div>

				<div className='custom-container px-8 md:px-[15%]'>
					<Trusted lang={lang} />
				</div>

				<div className='custom-container px-8 md:px-[15%]'>
					<WorkflowShowcase lang={lang} />
				</div>

				<div className='custom-container px-8 md:px-[15%]'>
					<WhyChooseUs lang={lang} />
				</div>

				<div className='custom-container px-8 md:px-[15%]'>
					<FAQ lang={lang} />
				</div>

				<div className='custom-container px-8 md:px-[15%]'>
					<CallToActionSection
						title='Develop, Build, Deploy, and Scale Without Limits'
						buttonText='Get Started'
					/>
				</div>
			</div>

			<div className='mt-[140px] h-[1px] bg-[#DDE7F7]'></div>
			<Footer lang={lang} />
			<TailwindIndicator />
			<RedirectSuggest />
		</div>
	);
}
