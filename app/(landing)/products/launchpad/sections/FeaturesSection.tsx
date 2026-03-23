import Image from 'next/image';
import {
	FeatureCicdImage,
	FeatureContainerImage,
	FeatureDomainImage,
	FeatureElasticImage,
	FeatureIsolationImage,
	FeaturePaygImage,
} from '../assets';

export function FeaturesSection() {
	const features = [
		{
			title: '可视化',
			description: '仅需填写镜像名称与端口，10秒即可将 Docker 容器部署至生产级集群。',
			image: FeatureContainerImage,
		},
		{
			title: '弹性伸缩',
			description: '基于 CPU/内存负载指标自动调节副本数量，在流量洪峰到来前秒级扩容，流量退去后自动缩容降本。',
			image: FeatureElasticImage,
		},
		{
			title: '域名配置',
			description: '自动申请和续期 SSL 证书，域名绑定即开启 HTTPS，无需手动配置 Nginx',
			image: FeatureDomainImage,
		},
		{
			title: '高可用',
			description: '利用 K8s 调度器自动监测实例健康状态，节点故障时毫秒级自动迁移容器，服务永不中断。',
			image: FeatureIsolationImage,
		},
		{
			title: '按量扣费',
			description: '基于实际资源使用量，每小时计费，暂停不计费，支持定时开关机',
			image: FeaturePaygImage,
		},
		{
			title: '热更新',
			description: '修改配置无需重启应用，环境变量实时生效，零停机配置变更。',
			image: FeatureCicdImage,
		},
	];

	return (
		<div className='flex flex-col gap-8'>
			<h2 className='text-center text-xl font-semibold sm:text-3xl'>功能特性</h2>

			<div className='grid grid-cols-1 items-end gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{features.map((feature) => (
					<div
						key={feature.title}
						className='relative flex flex-col pb-64'
					>
						<div className='relative z-20 -mb-64 flex flex-col'>
							<div className='flex h-64 items-center justify-center p-8'>
								<Image
									src={feature.image}
									alt={feature.title}
									className='h-56 w-full object-contain'
								/>
							</div>
							<div className='flex flex-col gap-2 p-8'>
								<h3 className='text-xl font-medium'>{feature.title}</h3>
								<p className='text-muted-foreground text-sm'>{feature.description}</p>
							</div>
						</div>
						<div className='z-10 -mb-64 h-64 w-full border border-zinc-100 bg-zinc-100' />
					</div>
				))}
			</div>
		</div>
	);
}
