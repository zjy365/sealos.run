import { Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';

const examples = [
	{
		icon: Number01Icon,
		title: '1 分钟部署 AI Agent 平台',
		description: '应用商店一键部署 FastGPT，秒级启动企业级 AI Agent。',
		tag: '应用商店',
	},
	{
		icon: Number02Icon,
		title: '10 秒完成全球 200+ 模型调用',
		description: '智能负载均衡 + 按需计费，5秒创建多模型聚合服务。',
		tag: 'AI Proxy',
	},
	{
		icon: Number03Icon,
		title: '3 分钟发布一个博客网站',
		description: '文件批量上传，静态网站托管，3分钟绑定域名',
		tag: '对象存储',
	},
	{
		icon: Number04Icon,
		title: '10 分钟开发上线一个AI应用',
		description: '预装多语言全栈开发环境，零配置本地AI 编码，平台一键部署上线。',
		tag: 'DevBox',
	},
];

export function ExamplesSection() {
	return (
		<div className='flex w-full flex-col items-start gap-6'>
			<h2 className='text-3xl font-semibold'>快速上云</h2>
			<div className='flex w-full items-start gap-10'>
				{examples.map((example) => (
					<div
						key={example.title}
						className='flex flex-1 flex-col items-start gap-4'
					>
						<div className='flex w-full flex-col items-start gap-2.5'>
							<div className='flex items-center gap-2'>
								<Icon
									src={example.icon}
									className='text-brand size-6'
								/>
								<h3 className='text-lg'>{example.title}</h3>
							</div>
							<p className='text-muted-foreground text-sm whitespace-pre-wrap'>{example.description}</p>
						</div>
						<Badge variant='outline'>
							<div className='bg-brand size-1.5 rounded-full' />
							{example.tag}
						</Badge>
					</div>
				))}
			</div>
		</div>
	);
}
