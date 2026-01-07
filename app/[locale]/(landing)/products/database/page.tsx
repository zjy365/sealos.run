import { CapsSection } from './sections/CapsSection';
import { CTASection } from './sections/CTASection';
import { DatabasesSection } from './sections/DatabasesSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';

export default async function DatabasePage() {
	return (
		<div className='flex w-full flex-col'>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<DatabasesSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<CapsSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FeaturesSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-20'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
