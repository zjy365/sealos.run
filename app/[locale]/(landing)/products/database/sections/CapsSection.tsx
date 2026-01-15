import type { StaticImageData } from 'next/image';
import { ApiIcon, CheckOverFrameIcon, ClockCounterIcon, ModelIcon, RocketIcon, TrendingDownIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';

const features: Array<{
	icon: StaticImageData;
	title: string;
	description: string;
}> = [
	{
		icon: ClockCounterIcon,
		title: '部署速度快 75%',
		description: '一个 YAML，全栈自动化，集群、备份、监控、安全一次性配置完成',
	},
	{
		icon: TrendingDownIcon,
		title: '成本降低 60%',
		description: '0.4元/核心，0.2元/GB，传统云数据库 30% 的价格',
	},
	{
		icon: CheckOverFrameIcon,
		title: '99.9% 可用性 SLA',
		description: '多副本 + 跨地域 + 智能故障切换，2 秒检测，5 秒自动恢复',
	},
	{
		icon: RocketIcon,
		title: '零维护开销',
		description: '自动更新、补丁和维护操作',
	},
	{
		icon: ModelIcon,
		title: 'AI 数据分析',
		description: '内置 Chat2DB，自然语言转 SQL',
	},
	{
		icon: ApiIcon,
		title: '开发者优先的 API',
		description: 'RESTful API 和 CLI 工具，无缝集成',
	},
];

export function CapsSection() {
	return (
		<div className='flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between'>
			<div className='flex max-w-md flex-col gap-4'>
				<h2 className='text-xl font-semibold sm:text-3xl'>
					为什么选择 <span className='text-brand'>Sealos 数据库</span>
				</h2>
				<p className='text-muted-foreground text-xs sm:text-base'>
					极速部署 + 企业级稳定性 + AI 智能分析，为开发者而建，受企业信赖
				</p>
			</div>

			<div className='grid flex-1 grid-cols-2 gap-12 lg:max-w-3xl'>
				{features.map((feature) => (
					<div
						key={feature.title}
						className='flex flex-col gap-4'
					>
						<div className='flex flex-col gap-3'>
							<div className='flex size-6 items-center justify-center'>
								<Icon
									src={feature.icon}
									className='text-brand size-6'
								/>
							</div>
							<div className='border-brand h-px border-t border-dashed' />
						</div>
						<div className='flex flex-col gap-1'>
							<h3 className='text-lg font-medium'>{feature.title}</h3>
							<p className='text-muted-foreground text-sm'>{feature.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
