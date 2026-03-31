import { FramedQuestionIcon, ModelIcon } from '@/assets/icons';
import { getAiproxyModels } from '@/libs/aiproxy/utils';
import { Icon } from '@/libs/components/ui/icon';
import { VerticalDashedLine } from '@/libs/components/VerticalDashedLine';
import { Config } from '@/libs/config';
import { CTASection } from './sections/CTASection';
import { FAQSection } from './sections/FAQSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';
import { MigGuideSection } from './sections/MigGuideSection';
import { ModelsSection } from './sections/ModelsSection';

export default async function AiproxyPage() {
	const { signinLink } = Config.components.navbar;
	const models = getAiproxyModels();

	return (
		<div className='flex w-full flex-col'>
			<section className='container mx-auto px-6 pt-16 pb-6'>
				<HeroSection />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<FeaturesSection />
			</section>

			<section className='relative container mx-auto py-16 pt-4 pr-6 pb-20 pl-16 sm:pl-24'>
				<VerticalDashedLine>
					<Icon
						src={ModelIcon}
						className='size-full'
					/>
				</VerticalDashedLine>
				<ModelsSection models={models} />
			</section>

			<section className='relative container mx-auto'>
				{/* Decoration line is inside the section */}
				<MigGuideSection signinHref={signinLink} />
			</section>

			<section className='relative container mx-auto py-16 pt-20 pr-6 pl-16 sm:pl-24'>
				<VerticalDashedLine iconY='4.5rem'>
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
