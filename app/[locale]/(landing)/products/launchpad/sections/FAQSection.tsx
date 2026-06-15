import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';

export const faqs = [
	{
		question: '是否支持直接部署 Docker 镜像？',
		answer: '支持。只需填写 Docker 镜像地址和端口信息，即可在 Sealos 上完成容器应用部署，无需自己编写 Kubernetes YAML。',
	},
	{
		question: '部署后是否支持自动 HTTPS？',
		answer: '支持。应用绑定域名后可以自动申请和续期 HTTPS 证书，适合官网、API 服务和后台系统直接上线。',
	},
	{
		question: '是否支持弹性伸缩和高可用？',
		answer: '支持。Sealos 可根据资源负载进行弹性伸缩，并借助 Kubernetes 的调度与健康检查能力提升应用可用性。',
	},
	{
		question: '适合部署哪些类型的应用？',
		answer: '适合部署官网、管理后台、API 服务、微服务、内部工具以及大多数基于 Docker 镜像交付的 Web 应用。',
	},
	{
		question: '计费方式是怎样的？',
		answer: '采用按量计费方式，根据实际资源使用情况结算，适合需要灵活控制成本的开发团队和企业项目。',
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
					围绕 Docker 应用部署、HTTPS、弹性伸缩和计费方式，整理了最常见的问题。
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
