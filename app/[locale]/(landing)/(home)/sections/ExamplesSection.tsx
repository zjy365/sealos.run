import { Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';

const examples = [
	{
		icon: Number01Icon,
		title: '1 分钟启动企业级应用',
		description: '应用商店一键部署数据库、中间件、N8N、FastGPT 等常用服务，免配置、免运维，打开即用。',
		tag: '应用商店',
		href: '/products/appstore',
	},
	{
		icon: Number02Icon,
		title: '10 秒接入全球 200+ 主流大模型',
		description: '聚合 OpenAI/Claude 等前沿模型，智能分流保障高可用，一个 Key 畅连全球 AI。',
		tag: 'AI Proxy',
		href: '/products/aiproxy',
	},
	{
		icon: Number03Icon,
		title: '3 分钟发布网站与静态资源',
		description: '对象存储内置静态托管能力，支持批量上传、自定义域名和 CDN 加速，博客、文档、资源站一键上线。',
		tag: '对象存储',
		href: '/products/oss',
	},
	{
		icon: Number04Icon,
		title: '10 分钟开发上线一个应用',
		description: '云端预设开发环境，支持本地 IDE 与 AI 编码工具接入，无缝衔接一键部署上线。',
		tag: 'DevBox',
		href: '/products/devbox',
	},
];

export function ExamplesSection() {
	return (
		<div className='flex w-full flex-col items-start gap-6'>
			<h2 className='text-xl font-semibold sm:text-3xl'>快速上手</h2>
			<div className='grid w-full grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4'>
				{examples.map((example) => (
					<Link
						key={example.title}
						href={example.href}
						className='group flex flex-col items-start gap-4 transition-opacity hover:opacity-80'
					>
						<div className='flex w-full flex-col items-start gap-2.5'>
							<div className='flex flex-col gap-2 md:flex-row md:items-center'>
								<Icon
									src={example.icon}
									className='text-brand size-6'
								/>
								<h3 className='text-sm group-hover:text-brand md:text-base 2xl:text-lg'>
									{example.title}
								</h3>
							</div>
							<p className='text-muted-foreground text-xs whitespace-pre-wrap md:text-sm'>
								{example.description}
							</p>
						</div>
						<Badge variant='outline'>
							<div className='bg-brand size-1.5 rounded-full' />
							{example.tag}
						</Badge>
					</Link>
				))}
			</div>
		</div>
	);
}
