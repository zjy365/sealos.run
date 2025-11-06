import CategoriesAndListSection from './sections/CategoriesAndListSection';
import CTABannerSection from './sections/CTABannerSection';
import HeroSection from './sections/HeroSection';
import HotAndSubscribeSection from './sections/HotAndSubscribeSection';
import HotPostsSection from './sections/HotPostsSection';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	return (
		<main className='min-h-screen'>
			<HeroSection />
			<HotAndSubscribeSection locale={locale} />
			<HotPostsSection locale={locale} />
			<CategoriesAndListSection locale={locale} />
			<CTABannerSection />
		</main>
	);
}
