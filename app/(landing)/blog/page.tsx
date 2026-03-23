import CategoriesAndListSection from './sections/CategoriesAndListSection';
import CTABannerSection from './sections/CTABannerSection';
import HeroSection from './sections/HeroSection';
import HotAndSubscribeSection from './sections/HotAndSubscribeSection';
import HotPostsSection from './sections/HotPostsSection';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
	return (
		<main className='min-h-screen'>
			<HeroSection />
			<HotAndSubscribeSection locale='zh' />
			<HotPostsSection locale='zh' />
			<CategoriesAndListSection locale='zh' />
			<CTABannerSection />
		</main>
	);
}
