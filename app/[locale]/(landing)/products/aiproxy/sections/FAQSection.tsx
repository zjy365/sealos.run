import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';

const faqs = [
	{
		question: '是否支持 Claude Code ?',
		answer: '是，全模型支持 claude code。',
	},
	{
		question: '海外如何接入?',
		answer: '海外访问请使用 usw.sealos.io 作为 API Endpoint。',
	},
	{
		question: '为什么出现 429 (限流) ?',
		answer: '429 错误表示请求频率过高，已达到限流阈值。请检查你的调用频率，或联系客服提升限流额度。',
	},
	{
		question: '如何计费与开票?',
		answer: '按实际使用的 Token 数量计费，支持按量付费。开票请联系客服或通过控制台申请。',
	},
];

export function FAQSection() {
	return (
		<div className='flex flex-col items-stretch gap-12 lg:flex-row'>
			<div className='flex min-h-full flex-1 flex-col gap-3'>
				<h2 className='text-4xl font-semibold'>
					常见问题 <span className='text-brand'>(FAQ)</span>
				</h2>
			</div>

			<div className='max-w-2xl shrink-0 lg:ml-auto lg:w-1/2'>
				<Accordion
					type='single'
					collapsible
					className='w-full'
				>
					{faqs.map((faq, index) => (
						<AccordionItem
							key={faq.question}
							value={`faq-${index}`}
						>
							<AccordionTrigger className='text-left'>
								<span className='text-base font-medium'>{faq.question}</span>
							</AccordionTrigger>
							<AccordionContent>
								<p className='text-muted-foreground text-sm'>{faq.answer}</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	);
}
