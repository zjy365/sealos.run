import Image from 'next/image';
import { HighIsolationImage, HighPerfImage, HighStabilityImage } from '../assets';

const securityFeatures = [
	{
		title: '超大规模集群调度',
		description: '核心自研轻量级负载均衡引擎，轻松支撑数万节点并发运行。性能无损，从容应对海量业务吞吐。',
		image: HighPerfImage,
	},
	{
		title: '99.995% 可用性',
		description: '深度调优的高性能网关，以极低资源消耗保障业务连续在线。提供 99.995% SLA 承诺，业务稳如泰山。',
		image: HighStabilityImage,
	},
	{
		title: '沙箱级多维安全隔离',
		description:
			'采用虚拟化级强隔离方案。通过内核级技术（Firecracker/Cilium）构建独立安全沙箱，彻底杜绝多租户干扰。',
		image: HighIsolationImage,
	},
];

export function SecuritySection() {
	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-semibold sm:text-3xl'>安全稳定</h2>
			<p className='text-muted-foreground mt-4 text-xs sm:text-base'>
				从内核级隔离到金融级 SLA 承诺，让您的每一次业务请求都得到可靠响应。{' '}
			</p>
			<div className='mt-8 grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-3'>
				{securityFeatures.map((feature) => (
					<div
						key={feature.title}
						className='relative z-20 -mb-52 flex w-full flex-col items-start pb-64'
					>
						<div className='relative flex h-64 w-full items-center justify-center'>
							<Image
								src={feature.image}
								alt={feature.title}
								className='h-56 w-full max-w-sm object-contain lg:h-48'
							/>
						</div>
						<div className='relative flex w-full flex-col items-start gap-2 px-8 whitespace-pre-wrap'>
							<h3 className='w-full text-xl font-medium'>{feature.title}</h3>
							<p className='text-muted-foreground w-full text-sm'>{feature.description}</p>
						</div>

						<div className='absolute -z-10 mt-32 h-64 w-full border border-zinc-100 bg-zinc-100' />
					</div>
				))}
			</div>
		</div>
	);
}
