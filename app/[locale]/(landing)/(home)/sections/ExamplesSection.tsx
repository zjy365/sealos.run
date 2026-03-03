import { Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';

const examples = [
	{
		icon: Number01Icon,
		title: '1 分钟搭建企业级 AI Agent',
		description: '应用商店一键部署，集成 FastGPT、N8N等，秒级启动专属企业 AI 助手。',
		tag: '应用商店',
	},
	{
		icon: Number02Icon,
		title: '10 秒接入全球 200+ 主流大模型 ',
		description: '聚合 OpenAI/Claude 等前沿模型，智能分流保障高可用，一个 Key 畅连全球 AI。',
		tag: 'AI Proxy',
	},
	{
		icon: Number03Icon,
		title: ' 3 分钟上线博客',
		description: '极简静态托管服务，支持批量上传与自定义域名',
		tag: '对象存储',
	},
	{
		icon: Number04Icon,
		title: '10 分钟开发上线一个AI应用',
		description: '云端预设开发环境，零配置开启本地 AI 编码，无缝衔接一键部署上线。',
		tag: 'DevBox',
	},
];

export function ExamplesSection() {
	return (
		<div className='flex w-full flex-col items-start gap-6'>
			<h2 className='text-xl font-semibold sm:text-3xl'>开发者首选</h2>
			<div className='grid w-full grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4'>
				{examples.map((example) => (
					<div
						key={example.title}
						className='flex flex-col items-start gap-4'
					>
						<div className='flex w-full flex-col items-start gap-2.5'>
							<div className='flex flex-col gap-2 md:flex-row md:items-center'>
								<Icon
									src={example.icon}
									className='text-brand size-6'
								/>
								<h3 className='text-sm md:text-base 2xl:text-lg'>{example.title}</h3>
							</div>
							<p className='text-muted-foreground text-xs whitespace-pre-wrap md:text-sm'>
								{example.description}
							</p>
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
