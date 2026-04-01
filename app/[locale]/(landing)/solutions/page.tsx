import { Config } from '@/libs/config';
import { BootstrapSection } from './sections/BootstrapSection';
import { CTASection } from './sections/CTASection';
import { HeroSection } from './sections/HeroSection';
import { SolutionsGridSection } from './sections/SolutionsGridSection';

export default async function SolutionsPage() {
	const githubHref =
		Config.components.footer.socialLinks.find((link) => link.name === 'Github')?.url ??
		'https://github.com/labring/sealos';
	const contactFormConfig = Config.pages.solutions.contactForm;

	return (
		<div className='flex w-full flex-col'>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection contactFormConfig={contactFormConfig} />
			</section>

			<section
				id='solutions'
				className='container mx-auto px-6 py-16'
			>
				<SolutionsGridSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<BootstrapSection
					githubHref={githubHref}
					contactFormConfig={contactFormConfig}
				/>
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
