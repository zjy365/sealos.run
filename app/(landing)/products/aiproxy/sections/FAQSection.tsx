import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';

const faqs = [
	{
		question: '是否支持 Claude Code / GPT?',
		answer: '是，全模型支持 claude-opus-4-6-thinking、gpt-5.4等，受区域影响，国外模型请访问 Selos.io。',
	},
	{
		question: '如何接入？需要修改现有代码吗？',
		answer: '完全兼容 OpenAI 接口标准。 您只需将现有代码或客户端（如 LangChain、NextChat）中的 BASE_URL 替换为 Sealos 的接口地址，并填入 Sealos API Key 即可，0 代码改动 实现无缝迁移。',
	},
	{
		question: '国内网络能直接访问吗？',
		answer: '支持国内直连，无需魔法。 Sealos AI Proxy 在全球多地部署了加速节点，自动优化路由。无论您身在何处，都能享受低延迟、高稳定的 API 调用体验，彻底解决 Connection Timed Out 问题。',
	},
	{
		question: '并发量有限制吗？适合生产环境吗？',
		answer: '企业级高并发支持，官方API,无论是个人调试还是企业级大规模生产环境，都能保证极高的可用性与吞吐量。',
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
