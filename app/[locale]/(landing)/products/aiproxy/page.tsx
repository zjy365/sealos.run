import { AiIcon, FramedQuestionIcon, ModelIcon } from '@/assets/icons';
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

			<section className='relative container mx-auto py-16 pt-4 pr-6 pl-24'>
				<VerticalDashedLine
					iconSize='3rem'
					mask={[['0rem', '3.5rem']]}
				>
					<Icon
						src={ModelIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<ModelsSection />
			</section>

			<section className='relative container mx-auto py-16 pt-4 pr-6 pl-24'>
				<VerticalDashedLine
					iconSize='3rem'
					mask={[['3.75rem', '6.25rem']]}
					iconY='3.5rem'
				>
					<Icon
						src={AiIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<MigGuideSection />
			</section>

			<section className='relative container mx-auto py-16 pt-4 pr-6 pl-24'>
				<VerticalDashedLine
					iconSize='3rem'
					mask={[['0.75rem', '3.5rem']]}
					iconY='0.5rem'
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
