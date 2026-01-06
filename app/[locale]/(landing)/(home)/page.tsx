import { ArchitectureBoxIcon, FramedCheckIcon, MoreIcon, SealosBoxIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { FeaturesSectionWrapper } from './components/FeaturesSectionWrapper';
import { VerticalDashedLine } from './components/VerticalDashedLine';
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

			<section className='container mx-auto px-6 pb-28'>
				<OrgsSection />
			</section>

			<section className='relative container mx-auto pt-4 pr-6 pb-32 pl-24'>
				<VerticalDashedLine mask={[['0rem', '3.5rem']]}>
					<Icon
						src={SealosBoxIcon}
						className='size-full'
					/>
				</VerticalDashedLine>

				<ExamplesSection />
			</section>

			<section className='relative container mx-auto h-170 pr-6 pb-28 pl-32'>
				<FeaturesSectionWrapper />
			</section>

			<section className='relative container mx-auto pr-6 pb-28 pl-24'>
				<VerticalDashedLine mask={[['0.55rem', '3.25rem']]}>
					<Icon
						src={FramedCheckIcon}
						className='size-full'
					/>
				</VerticalDashedLine>

				<SecuritySection />
			</section>

			<section className='relative container mx-auto pt-4 pr-6 pb-28 pl-24'>
				<VerticalDashedLine mask={[['0.6rem', '2.5rem']]}>
					<Icon
						src={ArchitectureBoxIcon}
						className='size-full'
					/>
				</VerticalDashedLine>

				<ArchSection />
			</section>

			<section className='relative container mx-auto pt-4 pr-6 pb-16 pl-24'>
				<VerticalDashedLine
					iconY='21rem'
					mask={[['22rem', '23.75rem']]}
				>
					<Icon
						src={MoreIcon}
						className='size-full'
					/>
				</VerticalDashedLine>

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
