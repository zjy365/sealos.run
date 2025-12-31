import Image from 'next/image';
import { CheckIcon, CloudBoxIcon, FlatArrowRightIcon, PrivateCloudIcon } from '@/assets/icons';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { SealosPrivateDeployBoxImage } from '../assets';

const publicCloudFeatures = ['完全托管的 Kubernetes 服务', '完善的开发者生态支持', '零运维门槛，可视化操作界面'];

const privateCloudFeatures = ['支持离线环境部署', '数据本地化，满足合规要求', '与企业现有 IT 系统深度集成'];

export function PrivateDeploySection() {
	return (
		<div className='relative min-h-200 w-full'>
			{/* Left content */}
			<div className='absolute top-1/2 flex max-w-lg -translate-y-1/2 flex-col items-start gap-6'>
				<div className='flex flex-col items-start gap-3'>
					<p className='text-2xl font-medium'>Sealos</p>
					<h2 className='text-3xl font-semibold'>满足不同企业的多样化需求</h2>
				</div>
				<p className='text-muted-foreground text-base whitespace-pre-wrap'>
					统一的 Kubernetes
					云原生架构，提供标准化抽象层。无论底层基础设施如何变化，上层应用和运维流程保持一致，让企业以相同技术栈灵活应对公有云、私有云等不同部署需求。
				</p>
			</div>

			{/* Right content area */}
			<div className='absolute top-1/2 right-0 flex -translate-y-1/2 flex-col gap-6'>
				{/* Card area - above the image */}
				<div className='flex'>
					{/* Public cloud card - left side, overlapped by right card */}
					<div className='relative z-10 flex max-w-96 flex-col items-start gap-4 border border-zinc-200 bg-zinc-50 p-8 shadow-sm'>
						{/* Vertical dashed line connecting to image below */}
						<svg
							className='absolute top-full left-1/2 -translate-x-1/2'
							width='1'
							height='192'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<line
								x1='0.5'
								y1='0'
								x2='0.5'
								y2='100%'
								stroke='var(--color-brand)'
								strokeWidth='0.5'
								strokeDasharray='4 4'
							/>
						</svg>
						<div className='flex w-full items-start gap-3'>
							<Icon
								src={CloudBoxIcon}
								className='size-8 shrink-0'
							/>
							<div className='flex flex-1 flex-col items-start gap-1'>
								<h3 className='w-full text-xl font-medium'>公有云</h3>
								<p className='text-muted-foreground w-full text-base'>开箱即用的云操作系统</p>
							</div>
						</div>
						<div className='flex w-full flex-col items-start gap-2'>
							{publicCloudFeatures.map((feature) => (
								<div
									key={feature}
									className='flex w-full items-center gap-3'
								>
									<Icon
										src={CheckIcon}
										className='text-brand size-4 shrink-0'
									/>
									<span className='text-muted-foreground text-sm'>{feature}</span>
								</div>
							))}
						</div>
					</div>

					{/* Private cloud card - right side, overlapping left card */}
					<div className='relative top-24 -left-6 z-20 flex max-w-96 flex-col items-start gap-4 border border-zinc-200 bg-zinc-100 p-8 shadow-sm'>
						{/* Vertical dashed line connecting to image below */}
						<svg
							className='absolute top-full left-10'
							width='1'
							height='160'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<line
								x1='0.5'
								y1='0'
								x2='0.5'
								y2='100%'
								stroke='var(--color-brand)'
								strokeWidth='0.5'
								strokeDasharray='4 4'
							/>
						</svg>
						<div className='flex w-full items-start gap-3'>
							<Icon
								src={PrivateCloudIcon}
								className='text-brand size-8 shrink-0'
							/>
							<div className='flex flex-1 flex-col items-start gap-1'>
								<div className='flex w-full items-center justify-between'>
									<h3 className='text-xl font-medium'>私有云</h3>
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
								<p className='text-muted-foreground text-base'>企业级安全可控的云操作系统</p>
							</div>
						</div>
						<div className='flex w-full flex-col items-start gap-2'>
							{privateCloudFeatures.map((feature) => (
								<div
									key={feature}
									className='flex w-full items-center gap-3'
								>
									<Icon
										src={CheckIcon}
										className='text-brand size-4 shrink-0'
									/>
									<span className='text-muted-foreground text-sm'>{feature}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Image - below the cards */}
				<div className='relative top-12 left-8 z-20 overflow-hidden'>
					<Image
						src={SealosPrivateDeployBoxImage}
						alt='Sealos 私有部署架构'
						className='w-88'
					/>
					{/* Gradient mask on bottom half blending into background */}
					<div
						className='pointer-events-none absolute right-0 bottom-0 left-0'
						style={{
							height: '70%',
							background: 'linear-gradient(to bottom, transparent, var(--color-background) 70%)',
						}}
					/>
				</div>
			</div>
		</div>
	);
}
