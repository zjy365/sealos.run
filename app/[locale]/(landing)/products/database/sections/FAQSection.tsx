import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';

export const faqs = [
	{
		question: '支持哪些数据库类型？',
		answer: '支持 MySQL、PostgreSQL、Redis、MongoDB、Kafka、Milvus 等常见数据库、中间件和向量数据库，适合 Web 应用、AI 应用和微服务场景。',
	},
	{
		question: '是否支持生产环境使用？',
		answer: '支持。Sealos 云数据库内置自动备份、故障自愈与监控告警能力，适合需要高可用和稳定性的生产环境部署。',
	},
	{
		question: '是否需要自己配置主从和集群？',
		answer: '不需要。Sealos 提供可视化部署流程，帮助你减少数据库主从配置和集群维护的复杂度，降低运维门槛。',
	},
	{
		question: '计费方式是怎样的？',
		answer: '采用按量计费方式，根据实际资源使用情况结算，适合从测试环境到生产环境逐步扩容的团队和业务。',
	},
	{
		question: '创建数据库后还能继续扩容吗？',
		answer: '可以。你可以根据业务增长情况调整资源配置，更灵活地应对流量变化和数据规模增长。',
	},
];

export function FAQSection() {
	return (
		<div className='flex w-full flex-col gap-12'>
			<div className='flex w-full flex-col items-center gap-3 text-center'>
				<h2 className='text-4xl font-semibold'>
					常见问题 <span className='text-brand'>(FAQ)</span>
				</h2>
				<p className='text-muted-foreground text-sm sm:text-base'>
					围绕数据库类型、高可用、备份、扩容和计费方式，整理了最常见的问题。
				</p>
			</div>

			<div className='w-full'>
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
