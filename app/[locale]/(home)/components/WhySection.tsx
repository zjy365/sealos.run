import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { QuestionMarkIcon } from '@/libs/components/ui/sealos-icons';
import AiTranslatorImage from '../images/ai-translator.svg';
import NoCliffImage from '../images/no-cliff.svg';
import VisualOrchestrationImage from '../images/visual-orchestration.svg';
import { WhyUseCard } from './WhyUseCard';

export async function WhySection() {
	const t = await getTranslations('pages.home.why');

	return (
		<section className='container mt-36'>
			<h2 className='flex items-baseline text-4xl font-medium'>
				<span>
					<span className='text-blue-600'>{t('title.why')}</span>
					<span> {t('title.sealosBrain')}</span>
				</span>
				<QuestionMarkIcon className='ml-4 h-6 w-6 text-blue-600' />
			</h2>
			<div className='mt-2 text-gray-500'>{t('description')}</div>

			<div className='mt-10 flex gap-6'>
				<WhyUseCard
					title={t('features.aiTranslator.title')}
					description={t('features.aiTranslator.description')}
				>
					<Image
						src={AiTranslatorImage}
						alt={t('features.aiTranslator.imageAlt')}
					/>
				</WhyUseCard>
				<WhyUseCard
					title={t('features.visualOrchestration.title')}
					description={t('features.visualOrchestration.description')}
				>
					<Image
						src={VisualOrchestrationImage}
						alt={t('features.visualOrchestration.imageAlt')}
					/>
				</WhyUseCard>
				<WhyUseCard
					title={t('features.noCliff.title')}
					description={t('features.noCliff.description')}
				>
					<Image
						src={NoCliffImage}
						alt={t('features.noCliff.imageAlt')}
					/>
				</WhyUseCard>
			</div>
		</section>
	);
}
