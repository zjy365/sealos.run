import { ConnectorIcon, KeyIcon, ModelIcon, MonitorIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';

const features = [
	{
		icon: ConnectorIcon,
		title: '统一 API 访问',
		description: '标准化接口，OpenAI 兼容，最小改动迁移。',
	},
	{
		icon: KeyIcon,
		title: '一键密钥管理',
		description: '平台内直接创建/禁用/删除，多平台无需分别注册。',
	},
	{
		icon: MonitorIcon,
		title: '集中计费与监控',
		description: '按量计费、费用明细、调用日志、Token 统计与筛选。',
	},
	{
		icon: ModelIcon,
		title: '全球模型覆盖',
		description: 'GPT、Claude、DeepSeek、Qwen、Doubao、ERNIE、GLM、Gemini 等。',
	},
];

export function FeaturesSection() {
	return (
		<div className='flex flex-col gap-8'>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
				{features.map((feature) => (
					<div
						key={feature.title}
						className='flex flex-col gap-4 border-zinc-100 bg-linear-to-b from-zinc-100 to-zinc-50 p-6'
					>
						<div className='flex size-12 items-center justify-center'>
							<Icon
								src={feature.icon}
								className='text-brand size-12'
							/>
						</div>
						<h3 className='text-xl font-medium'>{feature.title}</h3>
						<p className='text-muted-foreground text-sm'>{feature.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}
