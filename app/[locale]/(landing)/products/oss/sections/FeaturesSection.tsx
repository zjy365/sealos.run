import Image from 'next/image';
import {
	FeatureAccessImage,
	FeatureAnalysisImage,
	FeatureApiImage,
	FeatureElasticImage,
	FeaturePerfImage,
	FeatureReliableImage,
} from './assets';

const features = [
	{
		title: '高性能访问',
		description: '全球CDN加速，毫秒级响应时间，支持高并发访问',
		image: FeaturePerfImage,
	},
	{
		title: '安全可靠',
		description: '端到端加密，多重数据冗余，99.9999999% 数据持久性',
		image: FeatureReliableImage,
	},
	{
		title: '弹性扩展',
		description: '自动扩展存储容量，无需预规划，按使用量付费',
		image: FeatureElasticImage,
	},
	{
		title: 'RESTful API',
		description: '标准 S3 兼容 API，丰富的 SDK 支持，快速集成',
		image: FeatureApiImage,
	},
	{
		title: '访问控制',
		description: '细粒度权限管理，支持 IAM 策略和预签名 URL',
		image: FeatureAccessImage,
	},
	{
		title: '数据分析',
		description: '详细的访问日志和系统分析，实时监控存储使用情况',
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

			<div className='grid grid-cols-2 gap-6 lg:grid-cols-3'>
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
								<p className='text-muted-foreground text-sm'>{feature.description}</p>
							</div>
						</div>
						<div className='z-10 -mb-64 h-64 w-full bg-zinc-100' />
					</div>
				))}
			</div>
		</div>
	);
}
