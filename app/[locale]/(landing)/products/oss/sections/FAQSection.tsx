import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';

export const faqs = [
	{
		question: '是否兼容 S3 协议？',
		answer: '兼容。Sealos 对象存储支持主流 S3 协议与工具链，可无缝对接常见 SDK、AWS CLI、rclone 等工具，降低迁移和接入成本。',
	},
	{
		question: '适合哪些使用场景？',
		answer: '适合静态资源托管、静态网站托管、数据库备份归档、AI 训练数据集存储、日志归档以及各类需要低成本海量存储的业务场景。',
	},
	{
		question: '是否支持按量计费？',
		answer: '支持。Sealos 对象存储采用按需付费模式，存多少付多少，适合从小规模业务到大规模数据增长的不同阶段。',
	},
	{
		question: '是否支持预签名 URL 和权限控制？',
		answer: '支持。你可以使用预签名 URL、访问密钥和细粒度权限控制能力，满足前端直传、临时授权下载和多角色协作等需求。',
	},
	{
		question: '是否适合做备份和归档？',
		answer: '适合。对象存储天然适合数据库冷备、系统日志归档、文件长期保存和跨区域容灾备份等场景。',
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
					围绕 S3 兼容、使用场景、计费方式和权限控制，整理了最常见的问题。
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
