import { Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';
import { Icon } from '@/libs/components/ui/icon';

const faqs = [
	{
		question: 'Sealos 是如何计费的？',
		answer: ' Sealos 采用“按量计费”（Pay-as-you-go）模式，精确到小时。你只需要为你实际分配的 CPU、内存和存储资源付费。没有包年包月的强制绑定，随时可以启动或停止应用。',
	},
	{
		question: '如果我的账户余额用完了（欠费）会发生什么？我的数据会丢吗？',
		answer: '当账户余额耗尽时，系统会自动停止你的所有运行中应用（停止计算资源扣费）。你的应用配置和持久化数据会被保留 7 天。在这 7 天内，只要你重新充值，就可以一键恢复所有服务。如果超过 7 天未充值，系统将彻底回收资源并销毁数据，以保护隐私并释放空间。',
	},
	{
		question: '内外网流量怎么收费？',
		answer: '同一集群/同一区域内的应用、数据库互相访问不收取任何流量费用，外网按照标准流量单价计费。',
	},
	{
		question: '数据库（MySQL/PostgreSQL/Redis）单独收费吗？',
		answer: '数据库没有额外的“软件授权费”。在 Sealos 上，数据库也是标准的容器应用，它们的计费方式与普通应用完全一致：按照其实际占用的 CPU、内存和使用的存储盘大小进行小时计费。。',
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
