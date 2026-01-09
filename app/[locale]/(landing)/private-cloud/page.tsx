import { ArchSection } from './sections/ArchSection';
import { ComparisonSection } from './sections/ComparisonSection';
import { CTASection } from './sections/CTASection';
import { HeroSection } from './sections/HeroSection';

export default async function PrivateCloudPage() {
	return (
		<div className='flex w-full flex-col'>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection />
			</section>

			<section className='container mx-auto px-6 pb-28'>
				<ComparisonSection />
			</section>

			<section className='relative container mx-auto px-6 pt-4 pb-28'>
				<ArchSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
