import Image from 'next/image';
import {
	FeatureAccessImage,
	FeatureAnalysisImage,
	FeatureApiImage,
	FeatureElasticImage,
	FeaturePerfImage,
	FeatureReliableImage,
} from '../assets';

const features = [
	{
		title: '全球加速 & 内网互通',
		description: '容器与存储在同一集群内网高速互通，无流量费。外网支持全球 CDN 边缘加速，毫秒级响应。',
		image: FeaturePerfImage,
	},
	{
		title: '11个9 的数据持久性',
		description:
			'基于纠删码 (Erasure Coding) 与位衰减保护技术。多副本冗余存储，从根本上杜绝硬件故障导致的数据丢失。',
		image: FeatureReliableImage,
	},
	{
		title: '按量付费，零运维',
		description: '告别容量预估与扩容焦虑。存储空间随数据增长自动伸缩，存多少付多少，成本透明可控。',
		image: FeatureElasticImage,
	},
	{
		title: '100% 兼容 S3 协议',
		description:
			'无缝对接 AWS S3 SDK 与工具链（如 AWS CLI, rclone）。无需修改代码，即可将现有应用平滑迁移至 Sealos。',
		image: FeatureApiImage,
	},
	{
		title: '预签名 URL 与细粒度鉴权',
		description: '支持预签名 URL、访问密钥与细粒度权限控制，满足前端直传、临时授权与多角色访问场景。',
		image: FeatureAccessImage,
	},
	{
		title: '可视化监控与审计',
		description: '提供仪表盘级的用量统计。实时查看存储容量、API 请求数及流量带宽，让每一分钱的去向都清晰可见。',
		image: FeatureAnalysisImage,
	},
];

export function FeaturesSection() {
	return (
		<div className='flex flex-col gap-14'>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col gap-5'>
					<h2 className='text-3xl font-semibold'>
						<span className='text-brand'>核心</span>功能
					</h2>
					<p className='text-muted-foreground text-base'>企业级功能，开发者友好接口</p>
				</div>
				<div className='border-brand h-px w-full border-t border-dashed' />
			</div>

			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{features.map((feature) => (
					<div
						key={feature.title}
						className='relative flex flex-col pb-64'
					>
						<div className='relative z-20 -mb-64 flex flex-col'>
							<div className='relative flex h-64 items-center justify-center p-8'>
								<Image
									src={feature.image}
									alt={feature.title}
									className='object-contain'
									fill
								/>
							</div>
							<div className='flex flex-col gap-2 p-8'>
								<h3 className='text-xl font-medium'>{feature.title}</h3>
								<p className='text-muted-foreground min-h-[2lh] text-sm'>{feature.description}</p>
							</div>
						</div>
						<div className='z-10 -mb-64 h-64 w-full bg-zinc-100' />
					</div>
				))}
			</div>
		</div>
	);
}
