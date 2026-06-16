import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';

export const faqs = [
	{
		question: '应用商店支持什么类型的项目？',
		answer: '支持数据库、博客、AI 应用、开发工具等各类开源项目模板，适合快速部署常见云原生应用。',
	},
	{
		question: '部署应用是否需要自己写 YAML？',
		answer: '通常不需要。应用商店已提供可直接使用的模板，选择应用后即可发起部署，降低上手门槛。',
	},
	{
		question: '是否支持一键部署开源应用？',
		answer: '支持。你可以像安装 App 一样选择模板并完成部署，减少环境配置和安装步骤。',
	},
	{
		question: '找不到想要的项目怎么办？',
		answer: '可以在页面下方提交 GitHub 仓库地址，平台会协助生成部署模板并补充到应用商店中。',
	},
	{
		question: '应用商店适合哪些用户？',
		answer: '适合希望快速体验、测试或上线开源应用的开发者、团队和企业用户，尤其适合不想手动维护复杂部署流程的场景。',
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
					围绕模板部署、使用门槛和项目提交，整理了应用商店的常见问题。
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
