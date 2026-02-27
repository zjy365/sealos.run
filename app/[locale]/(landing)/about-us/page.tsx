import { AppsSection } from './sections/AppsSection';
import { CertsSection } from './sections/CertsSection';
import { ContactSection } from './sections/ContactSection';
import { CTASection } from './sections/CTASection';
import { CultureSection } from './sections/CultureSection';
import { HeroSection } from './sections/HeroSection';
import { MilestoneSection } from './sections/MilestoneSection';

export default async function AboutUsPage() {
	return (
		<div className='flex w-full flex-col'>
			<section>
				<HeroSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<AppsSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<MilestoneSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<CertsSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<CultureSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<ContactSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
