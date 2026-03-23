import { BootstrapSection } from './sections/BootstrapSection';
import { CTASection } from './sections/CTASection';
import { HeroSection } from './sections/HeroSection';
import { SolutionsGridSection } from './sections/SolutionsGridSection';

export default async function SolutionsPage() {
	return (
		<div className='flex w-full flex-col'>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection />
			</section>

			<section
				id='solutions'
				className='container mx-auto px-6 py-16'
			>
				<SolutionsGridSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<BootstrapSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
