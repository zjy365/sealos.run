import Image from 'next/image';
import {
	FeatureAlertImage,
	FeatureBackupImage,
	FeatureIsolationImage,
	FeaturePricingImage,
	FeatureQuickImage,
	FeatureVisualizedImage,
} from '../assets';

const features = [
	{
		title: '极速部署',
		description: '预配置镜像，自动分配存储和网络，无需手写 YAML',
		image: FeatureQuickImage,
	},
	{
		title: '可视化管理',
		description: 'Web 界面直接操作数据库，支持 SQL 执行和表结构修改',
		image: FeatureVisualizedImage,
	},
	{
		title: '自动备份',
		description: '可配置自动/手动备份，一键恢复到任意时间点，兼容 S3 存储',
		image: FeatureBackupImage,
	},
	{
		title: '自动告警',
		description: 'CPU /内存/连接数/慢查询实时追踪，支持自定义告警阈值',
		image: FeatureAlertImage,
	},
	{
		title: '按小时计费',
		description: '基于资源使用量计费，暂停不计费，支持定时开关机',
		image: FeaturePricingImage,
	},
	{
		title: '企业级隔离',
		description: '端到端加密、网络隔离和企业级访问控制',
		image: FeatureIsolationImage,
	},
];

export function FeaturesSection() {
	return (
		<div className='flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between'>
			<div className='flex max-w-sm flex-col gap-4'>
				<h2 className='text-xl font-semibold sm:text-3xl'>
					你需要的<span className='text-brand'>一切功能</span>
				</h2>
				<p className='text-muted-foreground text-xs sm:text-base'>告别多工具拼凑，从创建到分析一站搞定</p>
			</div>

			<div className='grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3 lg:max-w-4xl'>
				{features.map((feature) => (
					<div
						key={feature.title}
						className='flex flex-col gap-4'
					>
						<div className='relative h-40 w-full overflow-hidden'>
							<Image
								src={feature.image}
								alt={feature.title}
								className='object-contain object-left'
								fill
							/>
						</div>
						<div className='border-brand h-px border-t border-dashed' />
						<div className='flex flex-col gap-4'>
							<h3 className='text-lg font-medium'>{feature.title}</h3>
							<p className='text-muted-foreground text-sm'>{feature.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
