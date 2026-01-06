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
			title: '一键容器化',
			description: '预配置 Docker 命令及 YAML 文件，只需填写镜像地址，自动构建运行',
			image: FeatureContainerImage,
		},
		{
			title: '弹性伸缩',
			description: '预配置 Docker 命令及 YAML 文件，只需填写镜像地址，自动构建运行',
			image: FeatureElasticImage,
		},
		{
			title: '免费域名',
			description: '每个应用默认分配二级域名，默认配置HTTPS，支持绑定自己的域名',
			image: FeatureDomainImage,
		},
		{
			title: '安全隔离',
			description: '每个应用默认分配二级域名，默认配置HTTPS，支持绑定自己的域名',
			image: FeatureIsolationImage,
		},
		{
			title: '按量扣费',
			description: '基于实际资源使用量，每小时计费，暂停不计费，支持定时开关机',
			image: FeaturePaygImage,
		},
		{
			title: '持续集成和部署',
			description: '内置 CI/CD 能力，只需更新镜像地址，便可自动构建和重新部署应用',
			image: FeatureCicdImage,
		},
	];

	return (
		<div className='flex flex-col gap-8'>
			<h2 className='text-center text-3xl font-semibold'>Docker 容器化部署功能特性</h2>

			<div className='grid grid-cols-1 items-end gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
