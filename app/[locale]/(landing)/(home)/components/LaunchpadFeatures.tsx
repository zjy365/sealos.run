import type React from 'react';
import { FlatArrowRightIcon, IsolateIcon, MonitorIcon, ScaleIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';

function ArrowIcon({ size = 8, height }: { size?: number; height?: number }) {
	const arrowHeight = height ?? size;
	const centerX = size / 2;
	const arrowHeadSize = 2;

	return (
		<svg
			width={size}
			height={arrowHeight}
			viewBox={`0 0 ${size} ${arrowHeight}`}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<line
				x1={centerX}
				y1='0'
				x2={centerX}
				y2={arrowHeight - arrowHeadSize}
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeDasharray='2 2'
			/>
			<path
				d={`M${centerX - arrowHeadSize} ${arrowHeight - arrowHeadSize}L${centerX} ${arrowHeight}L${centerX + arrowHeadSize} ${arrowHeight - arrowHeadSize}`}
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	);
}

const features: Array<{
	icon: React.ReactNode;
	title: string;
	description: string;
}> = [
	{
		icon: (
			<Icon
				src={MonitorIcon}
				className='size-4 text-brand'
			/>
		),
		title: '公网测试',
		description: '系统分配二级域名，支持HTTPS访问',
	},
	{
		icon: (
			<Icon
				src={ScaleIcon}
				className='size-4 text-brand'
			/>
		),
		title: '弹性伸缩',
		description: '高峰自动扩容，低峰期自动释放资源',
	},
	{
		icon: (
			<Icon
				src={IsolateIcon}
				className='size-4 text-brand'
			/>
		),
		title: '资源隔离',
		description: '应用和租户级网络隔离能力',
	},
];

type EngineFeature =
	| {
			type: 'arrow';
			title?: string;
	  }
	| {
			type: 'block';
			title: string;
			items: string[] | string[][];
	  };

const engineFeatures: EngineFeature[] = [
	{
		type: 'arrow',
		title: '用户请求',
	},
	{
		type: 'block',
		title: '编排引擎',
		items: ['用户界面', 'YAML 编辑', '模板部署', '批量管理'],
	},
	{
		type: 'arrow',
	},
	{
		type: 'block',
		title: '编排引擎',
		items: ['配置解析', '资源计算', '生命周期管理', '弹性伸缩'],
	},
	{
		type: 'arrow',
	},
	{
		type: 'block',
		title: 'Kubernetes 集群',
		items: [
			['Deployment', 'Ingress', 'Service', 'PVC'],
			['Configmap', 'Secret', 'HPA'],
		],
	},
];

export function LaunchpadFeatures() {
	return (
		<div className='flex w-full flex-col gap-16'>
			<div className='flex w-full items-center justify-between'>
				<div className='flex flex-col gap-4'>
					<h2 className='text-3xl font-semibold'>企业级智能云平台</h2>
					<p className='text-base text-muted-foreground'>
						集应用管理、云开发、数据服务、AI
						模型四大核心能力，提供开发到运维的全链路解决方案，让应用构建、部署和管理变得更简单。
					</p>
				</div>
				<LandingOutlineButton href=''>立即体验</LandingOutlineButton>
			</div>

			<div className='flex w-full items-center gap-12'>
				{/* [TODO] Interactive area */}
				<div className='h-96 w-96 shrink-0 rounded-lg bg-zinc-100' />

				<div className='flex flex-1 flex-col gap-6'>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center gap-3'>
							<span className='text-base text-muted-foreground'>应用管理</span>
							<Button
								variant='outline'
								size='sm'
							>
								详情
								<Icon
									src={FlatArrowRightIcon}
									className='size-4'
								/>
							</Button>
						</div>
						<div className='text-2xl font-medium whitespace-pre-wrap'>
							<p>基于 Kubernetes 的可视化服务，</p>
							<p>支持所有 Docker 镜像的一键部署能力</p>
						</div>
					</div>

					<div className='flex w-full items-start gap-8'>
						<div className='flex flex-col gap-8 pt-8 w-1/3'>
							{features.map((feature) => (
								<div
									key={feature.title}
									className='flex flex-col gap-1'
								>
									<div className='flex items-center gap-2'>
										{feature.icon}
										<h3 className='text-base font-medium'>{feature.title}</h3>
									</div>
									<p className='text-sm text-zinc-500'>{feature.description}</p>
								</div>
							))}
						</div>

						<div className='min-w-96 flex-1 flex flex-col items-center gap-1.5'>
							{engineFeatures.map((feature, idx) => {
								if (feature.type === 'arrow') {
									const hasTitle = !!feature.title;

									return (
										<div
											// biome-ignore lint/suspicious/noArrayIndexKey: static content
											key={idx}
											className='flex flex-col items-center gap-0.5 w-full'
										>
											{hasTitle ? (
												<div className='relative flex items-center justify-center w-full h-8'>
													<div
														className='absolute inset-0 flex items-center justify-center text-brand'
														style={{
															clipPath:
																'polygon(0 0, 100% 0, 100% calc(50% - 0.5rem), 0 calc(50% - 0.75rem), 0 calc(50% + 0.75rem), 100% calc(50% + 0.5rem), 100% 100%, 0 100%)',
														}}
													>
														<ArrowIcon
															size={8}
															height={32}
														/>
													</div>
													<div className='relative z-10 flex items-center justify-center'>
														<p className='text-xs text-center whitespace-nowrap px-1.5'>
															{feature.title}
														</p>
													</div>
												</div>
											) : (
												<div className='flex h-4 items-center justify-center w-0'>
													<div className='flex-none text-brand'>
														<ArrowIcon size={16} />
													</div>
												</div>
											)}
										</div>
									);
								}

								if (feature.type === 'block') {
									const rows: string[][] = Array.isArray(feature.items[0])
										? (feature.items as string[][])
										: // 4 items per group
											(feature.items as string[]).reduce<string[][]>((acc, item, index) => {
												const rowIndex = Math.floor(index / 4);
												if (!acc[rowIndex]) {
													acc[rowIndex] = [];
												}
												acc[rowIndex].push(item);
												return acc;
											}, []);

									return (
										<div
											// biome-ignore lint/suspicious/noArrayIndexKey: static content
											key={idx}
											className='flex flex-col items-center gap-2 rounded border border-dashed border-zinc-400 p-2 w-full'
										>
											<span className='text-xs'>{feature.title}</span>
											<div className='flex flex-col gap-1.5 w-full'>
												{rows.map((row, rowIdx) => (
													<div
														// biome-ignore lint/suspicious/noArrayIndexKey: static content
														key={rowIdx}
														className='flex w-full gap-2'
													>
														{row.map((item) => (
															<div
																key={item}
																className='flex flex-1 items-center justify-center border border-zinc-300 p-0.5'
															>
																<span className='text-xs text-zinc-600'>{item}</span>
															</div>
														))}
													</div>
												))}
											</div>
										</div>
									);
								}

								return null;
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
