import { CalculatorSection } from './sections/CalculatorSection';
import { CTASection } from './sections/CTASection';
import { FAQSection } from './sections/FAQSection';
import { HeroSection } from './sections/HeroSection';

export default async function PaygPricingPage() {
	return (
		<div className='flex w-full flex-col'>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection />
			</section>

			<section>
				<CalculatorSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FAQSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
