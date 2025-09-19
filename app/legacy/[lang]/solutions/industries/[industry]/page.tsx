import { notFound } from 'next/navigation';
import Footer from '@/libs/legacy/components/footer';
import Header from '@/libs/legacy/components/header';
import { getAllIndustries, getIndustryConfig } from '@/libs/legacy/config/industries';
import { appDomain } from '@/libs/legacy/config/site';
import type { languagesType } from '@/libs/legacy/utils/i18n';
import { generatePageMetadata } from '@/libs/legacy/utils/metadata';
import CoreProducts from './components/CoreProducts';
import ImplementationBenefits from './components/ImplementationBenefits';
import IndustryBenefits from './components/IndustryBenefits';
import IndustryChallenges from './components/IndustryChallenges';
import IndustryCTA from './components/IndustryCTA';
// Components
import IndustryOverview from './components/IndustryOverview';
import IndustryProducts from './components/IndustryProducts';
import IndustryStats from './components/IndustryStats';
import IndustryVisualBreak from './components/IndustryVisualBreak';

interface PageProps {
	params: Promise<{ lang: languagesType; industry: string }>;
}

export async function generateStaticParams() {
	const industries = getAllIndustries();
	return industries.map((industrySlug) => ({
		industry: industrySlug,
	}));
}

export async function generateMetadata({ params }: PageProps) {
	const resolvedParams = await params;
	const config = getIndustryConfig(resolvedParams.industry);

	if (!config) {
		return {};
	}

	return generatePageMetadata({
		title: config.metadata.title,
		description: config.metadata.description,
		keywords: config.metadata.keywords,
		pathname: `/solutions/industries/${config.slug}`,
	});
}

export default async function IndustryPage({ params }: PageProps) {
	const resolvedParams = await params;
	const config = getIndustryConfig(resolvedParams.industry);

	if (!config) {
		notFound();
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
			<Header lang={resolvedParams.lang} />

			{/* Hero Section */}
			<main className='container mx-auto px-4 pt-20 sm:px-6 lg:px-8'>
				{/* Industry Overview Section with integrated CTAs */}
				<IndustryOverview
					industryName={config.name}
					industrySlug={config.slug}
					title={config.title}
					overviewParagraphs={config.overview.paragraphs}
					ctaText={config.hero.ctaText ?? 'Get Started'}
					ctaUrl={config.hero.ctaUrl ?? appDomain}
					description={config.hero.description}
					introText={config.hero.introText}
					centralIcon={config.centralIcon}
				/>

				{/* Visual Break */}
				<IndustryVisualBreak config={config.visualBreak} />

				{/* Challenges Section */}
				<IndustryChallenges
					challenges={config.challenges}
					industryName={config.name}
				/>

				{/* Why Sealos Section */}
				<IndustryBenefits
					benefits={config.benefits}
					industryName={config.name}
				/>

				{/* Statistics Section */}
				<IndustryStats
					stats={config.stats}
					industryName={config.name}
				/>

				{/* Core Sealos Products Section */}
				<CoreProducts industryName={config.name} />

				{/* Industry-Specific Products Section */}
				<IndustryProducts
					products={config.products}
					industryName={config.name}
				/>

				{/* Implementation Benefits */}
				<ImplementationBenefits benefits={config.implementation} />

				{/* CTA Section */}
				<IndustryCTA config={config} />
			</main>

			<Footer lang={resolvedParams.lang} />
		</div>
	);
}
