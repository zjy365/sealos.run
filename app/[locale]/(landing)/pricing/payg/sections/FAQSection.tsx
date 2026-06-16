import { Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';
import { Icon } from '@/libs/components/ui/icon';
import { paygFaqs } from '../utils/payg.faq';

export function FAQSection() {
	const icons = [Number01Icon, Number02Icon, Number03Icon, Number04Icon] as const;

	return (
		<div className='flex flex-col items-stretch gap-16'>
			<h2 className='text-center text-3xl font-semibold'>
				常见 <span className='text-brand'>FAQ</span>
			</h2>

			<Accordion
				type='single'
				collapsible
				className='w-full'
			>
				{paygFaqs.map((faq, index) => (
					<AccordionItem
						key={faq.question}
						value={`faq-${index}`}
						className='border-brand'
					>
						<AccordionTrigger className='py-7'>
							<span className='flex items-start gap-10 text-left text-xl font-medium text-black'>
								<span className='text-brand mt-0.5 shrink-0'>
									<Icon
										src={icons[index] ?? Number01Icon}
										className='size-6'
									/>
								</span>
								<span>{faq.question}</span>
							</span>
						</AccordionTrigger>
						<AccordionContent className='pb-7'>
							<p className='text-muted-foreground text-base whitespace-pre-wrap'>{faq.answer}</p>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
