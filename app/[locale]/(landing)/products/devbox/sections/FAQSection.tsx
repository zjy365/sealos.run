import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';

export const faqs = [
	{
		question: 'DevBox 是什么？',
		answer: 'DevBox 是 Sealos 提供的云开发环境，帮助开发者在浏览器或本地 IDE 中直接连接云端工作区，完成编码、调试、构建和上线。',
	},
	{
		question: '是否支持 VS Code 和 JetBrains？',
		answer: '支持。DevBox 可以配合 VS Code Remote 和 JetBrains 等常见 IDE 使用，保留原有插件、主题和快捷键习惯，减少迁移成本。',
	},
	{
		question: '是否还需要本地安装复杂开发环境？',
		answer: '通常不需要。DevBox 可提前准备语言运行时、依赖和项目环境，开发者直接进入云端工作区即可开始开发，降低本地配置门槛。',
	},
	{
		question: 'DevBox 是否支持环境隔离和团队协作？',
		answer: '支持。每个项目都可以运行在独立云端环境中，避免互相污染，也更适合多人协作、测试验证和统一开发规范。',
	},
	{
		question: '能否在 DevBox 中直接发布应用？',
		answer: '可以。DevBox 支持在开发环境内完成镜像构建、服务更新和对外发布，适合从代码开发到应用上线的一体化流程。',
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
					围绕云开发环境、IDE 连接、环境隔离和发布流程，整理了常见问题。
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
