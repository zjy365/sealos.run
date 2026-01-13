import { FramedQuestionIcon, ModelIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { VerticalDashedLine } from '@/libs/components/VerticalDashedLine';
import { CTASection } from './sections/CTASection';
import { FAQSection } from './sections/FAQSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';
import { MigGuideSection } from './sections/MigGuideSection';
import { ModelsSection } from './sections/ModelsSection';

export default async function AiproxyPage() {
	return (
		<div className='flex w-full flex-col'>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FeaturesSection />
			</section>

			<section className='relative container mx-auto py-16 pt-4 pr-6 pb-20 pl-24'>
				<VerticalDashedLine mask={[['0rem', '3.5rem']]}>
					<Icon
						src={ModelIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<ModelsSection />
			</section>

			<section className='relative container mx-auto'>
				{/* Decoration line is inside the section */}
				<MigGuideSection />
			</section>

			<section className='relative container mx-auto py-16 pt-20 pr-6 pl-24'>
				<VerticalDashedLine
					mask={[['4.75rem', '8.5rem']]}
					iconY='4.5rem'
				>
					<Icon
						src={FramedQuestionIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<FAQSection />
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-20'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
