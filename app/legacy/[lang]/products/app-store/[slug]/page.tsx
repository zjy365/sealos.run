import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/libs/legacy/components/footer';
import Header from '@/libs/legacy/components/header';
import Hero from '@/libs/legacy/components/header/hero';
import { appsConfig, getAppBySlug, getAppBySlugSync, loadAllApps } from '@/libs/legacy/config/apps';
import type { languagesType } from '@/libs/legacy/utils/i18n';
import { generatePageMetadata } from '@/libs/legacy/utils/metadata';
import AppDescription from './components/Description';
import AppFeatures from './components/Features';
import AppHeader from './components/Header';
import AppScreenshots from './components/Screenshots';
import SealosAdvantages from './components/SealosAdvantages';
import AppUseCases from './components/UseCases';
import WhyThisSoftware from './components/WhyThisSoftware';

interface AppDeployPageProps {
	params: Promise<{
		slug: string;
		lang: languagesType;
	}>;
}

// Generate static params for all apps
export async function generateStaticParams() {
	const allApps = await loadAllApps();
	return allApps.map((app) => ({
		slug: app.slug,
	}));
}

// Generate metadata for SEO
export async function generateMetadata(props: AppDeployPageProps): Promise<Metadata> {
	const params = await props.params;
	const app = await getAppBySlug(params.slug);

	if (!app) {
		return {
			title: 'App Not Found',
		};
	}

	return generatePageMetadata({
		title: `Deploy ${app.name}`,
		description: app.description,
		keywords: app.tags,
		pathname: `/products/app-store/${params.slug}`,
		lang: params.lang,
		ogType: 'app',
	});
}

// Translations
const translations = {
	en: {
		deploy: 'Deploy',
		oneClickDeploy: 'One-Click Deploy',
		features: 'Key Features',
		benefits: 'Why Choose This Solution',
		sealosAdvantages: 'Sealos Cloud Advantages',
		useCases: 'Perfect For',
		sourceCode: 'Source Code',
		website: 'Official Website',
		category: 'Category',
		deployNow: 'Deploy Now',
		learnMore: 'Learn More',
		getStarted: 'Get Started in 60 Seconds',
		deploymentBenefits: 'Deploy on Sealos Cloud',
		whyThisSoftware: 'Why This Software',
	},
	'zh-cn': {
		deploy: '部署',
		oneClickDeploy: '一键部署',
		features: '主要功能',
		benefits: '为什么选择此解决方案',
		sealosAdvantages: 'Sealos 云优势',
		useCases: '适用场景',
		sourceCode: '源代码',
		website: '官方网站',
		category: '分类',
		deployNow: '立即部署',
		learnMore: '了解更多',
		getStarted: '60 秒内开始使用',
		deploymentBenefits: '在 Sealos 云上部署',
		whyThisSoftware: '为什么选择此软件',
	},
};

export default async function AppDeployPage(props: AppDeployPageProps) {
	const params = await props.params;
	const app = await getAppBySlug(params.slug);
	const t = translations[params.lang] || translations.en;

	if (!app) {
		notFound();
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header lang={params.lang} />

			<main className='container mx-auto max-w-6xl px-4 py-8'>
				<div className='max-w-none'>
					{/* Main Content */}
					<div>
						<Hero
							title={{
								main: t.deploy + ' ' + app.name,
								sub: app.name + ' Managed Hosting',
							}}
							mainTitleEmphasis={1}
							lang={params.lang}
						/>

						<AppHeader
							app={app}
							translations={t}
							lang={params.lang}
						/>
						<AppDescription app={app} />
						<WhyThisSoftware
							app={app}
							translations={t}
						/>
						<SealosAdvantages translations={t} />
						<AppFeatures
							app={app}
							translations={t}
						/>
						<AppUseCases
							app={app}
							translations={t}
						/>
						<AppScreenshots app={app} />
					</div>
				</div>
			</main>
			<Footer lang={params.lang} />
		</div>
	);
}
