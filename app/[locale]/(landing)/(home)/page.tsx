import { LaunchpadFeatures } from './components/LaunchpadFeatures';
import { ArchSection } from './sections/ArchSection';
import { CTASection } from './sections/CTASection';
import { ExamplesSection } from './sections/ExamplesSection';
import { HeroSection } from './sections/HeroSection';
import { OrgsSection } from './sections/OrgsSection';
import { PrivateDeploySection } from './sections/PrivateDeploySection';
import { SecuritySection } from './sections/SecuritySection';

export default async function HomePage() {
	return (
		<div className='flex w-full flex-col'>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection />
			</section>

			<section className='container mx-auto px-6 pb-16'>
				<OrgsSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<ExamplesSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<LaunchpadFeatures />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<SecuritySection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<ArchSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<PrivateDeploySection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
