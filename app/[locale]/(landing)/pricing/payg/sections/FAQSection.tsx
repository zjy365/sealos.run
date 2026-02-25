import { Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';
import { Icon } from '@/libs/components/ui/icon';

const faqs = [
	{
		question: '最小计费单位是什么？',
		answer: 'CPU/内存/存储卷/端口按小时计费，网络按流量计费；具体以控制台展示的资源单价为准。',
	},
	{
		question: '新用户有什么优惠？',
		answer: '新用户可获得 ¥100 免费额度，有效期 65 天；超出额度后按量计费。',
	},
	{
		question: '如何控制成本？',
		answer: '支持按需调整资源与暂停不计费；建议结合业务峰谷设置弹性伸缩与预算告警。',
	},
	{
		question: '支持哪些付款方式？',
		answer: '支持多种在线支付方式，企业客户也可联系商务开通对公转账等方案。',
	},
];

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
				{faqs.map((faq, index) => (
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
