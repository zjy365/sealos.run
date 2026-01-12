import Image from 'next/image';
import { HighIsolationImage, HighPerfImage, HighStabilityImage } from '../assets';

const securityFeatures = [
	{
		title: '高性能',
		description: '自研轻量级负载均衡器， 可支撑超大规模数万节点集群运行。',
		image: HighPerfImage,
	},
	{
		title: '高稳定',
		description: '基于高性能网关，针对用户集群调优，保障 99.995% 的超高稳定性和极低资源消耗。',
		image: HighStabilityImage,
	},
	{
		title: '强隔离',
		description: '基于 Firecracker、Cilium、OpenEBS 等技术实现用户隔离、空间隔离、计算隔离和存储的强安全隔离',
		image: HighIsolationImage,
	},
];

export function SecuritySection() {
	return (
		<div className='flex flex-col gap-8'>
			<h2 className='text-xl font-semibold sm:text-3xl'>安全稳定</h2>

			<div className='grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-3'>
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
