import { getTranslations } from 'next-intl/server';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';
import { QuestionMarkIcon } from '@/libs/components/ui/sealos-icons';

export async function FAQSection() {
	const t = await getTranslations('pages.home.faq');

	return (
		<section className='container mt-60 flex'>
			<h2 className='w-full text-4xl font-medium'>
				<div className='flex items-baseline'>
					<span>
						<span>{t('title.any')} </span>
						<span className='text-blue-600'>{t('title.questions')}</span>
					</span>
					<QuestionMarkIcon className='ml-4 h-6 w-6' />
				</div>
				<div>
					<span>{t('title.weGotYou')}</span>
				</div>
			</h2>

			<Accordion
				type='single'
				className='w-full'
				defaultValue='item-1'
			>
				<AccordionItem
					value='item-1'
					className='border-dashed border-blue-600'
				>
					<AccordionTrigger>{t('items.kubernetes.question')}</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<p className='text-gray-500'>{t('items.kubernetes.answer')}</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem
					value='item-2'
					className='border-dashed border-blue-600'
				>
					<AccordionTrigger>{t('items.aiIntegration.question')}</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<p className='text-gray-500'>{t('items.aiIntegration.answer')}</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem
					value='item-3'
					className='border-dashed border-blue-600'
				>
					<AccordionTrigger>{t('items.freeTrial.question')}</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<p className='text-gray-500'>{t('items.freeTrial.answer')}</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
}
