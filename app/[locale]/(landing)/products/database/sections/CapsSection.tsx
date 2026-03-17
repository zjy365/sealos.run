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
		title: '秒级部署',
		description: '可视化界面配置，30秒内自动拉起包含主从架构、监控告警、自动备份的生产级数据库',
	},
	{
		icon: TrendingDownIcon,
		title: '极致降本',
		description: '0.4元/核心，0.2元/GB，闲置自动缩容，综合成本降低 60%。',
	},
	{
		icon: CheckOverFrameIcon,
		title: '高可用',
		description: '多副本跨域容灾，秒级完成主从切换，业务零感知。',
	},
	{
		icon: RocketIcon,
		title: '自动维护',
		description: '自动更新、自动补丁、自动维护，彻底告别运维负担。',
	},
	{
		icon: ModelIcon,
		title: '数据分析',
		description: '内置 Chat2DB，支持自然语言提问直接生成查询语句。',
	},
	{
		icon: ApiIcon,
		title: '云原生生态',
		description: 'RESTful API + CLI 工具，无缝集成到任何工作流。',
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
					原生集成多副本高可用架构与智能故障自愈机制，为您提供 99.9% SLA 的生产级保障。
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
