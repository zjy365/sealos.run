import { ClockCounterIcon, CloudBoxIcon, CubesIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { VerticalDashedLine } from '@/libs/components/VerticalDashedLine';
import { StepsSectionLine } from './components/StepsSectionLine';
import { BestPracticesSection } from './sections/BestPracticesSection';
import { CTASection } from './sections/CTASection';
import { CloudCollaborationSection, QuickReleaseSection, UnifiedEnvironmentSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';
import { StepsSection } from './sections/StepsSection';

export default async function DevBoxPage() {
	return (
		<div className='flex w-full flex-col'>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection />
			</section>

			<section className='relative container mx-auto px-6 pt-16 pb-30'>
				<StepsSectionLine />

				<StepsSection />
			</section>

			<section className='relative container mx-auto pt-4 pr-6 pb-12 pl-24'>
				<VerticalDashedLine
					iconSize='2.5rem'
					mask={[['5.5rem', '7rem']]}
					iconY='4.5rem'
				>
					<Icon
						src={CloudBoxIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<UnifiedEnvironmentSection />
			</section>

			<section className='relative container mx-auto pt-4 pr-6 pb-12 pl-24'>
				<VerticalDashedLine
					iconSize='2.5rem'
					mask={[['5rem', '7rem']]}
					iconY='4.5rem'
				>
					<Icon
						src={CubesIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<CloudCollaborationSection />
			</section>

			<section className='relative container mx-auto pt-4 pr-6 pb-12 pl-24'>
				<VerticalDashedLine
					iconSize='2.5rem'
					mask={[['5rem', '7rem']]}
					iconY='4.5rem'
				>
					<Icon
						src={ClockCounterIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<QuickReleaseSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<BestPracticesSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-20'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
