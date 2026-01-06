'use client';

import Image from 'next/image';
import React from 'react';
import { Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/libs/components/ui/carousel';
import { Icon } from '@/libs/components/ui/icon';
import { cn } from '@/libs/utils/styling';
import { Step1Image, Step2Image, Step3Image, Step4Image } from '../assets';

export function StepsSection() {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);

	const steps = [
		{
			icon: Number01Icon,
			title: '基础配置',
			description: '填写 Docker 镜像地址，自定义云服务器资源，单日消耗实时预览',
			image: Step1Image,
		},
		{
			icon: Number02Icon,
			title: '网络配置',
			description: '配置网络访问方式',
			image: Step2Image,
		},
		{
			icon: Number03Icon,
			title: '高级配置',
			description: '高级配置选项',
			image: Step3Image,
		},
		{
			icon: Number04Icon,
			title: '部署成功',
			description: '应用部署完成',
			image: Step4Image,
		},
	];

	React.useEffect(() => {
		if (!api) return;

		setCurrent(api.selectedScrollSnap());

		const handleSelect = () => {
			setCurrent(api.selectedScrollSnap());
		};

		api.on('select', handleSelect);

		return () => {
			api.off('select', handleSelect);
		};
	}, [api]);

	React.useEffect(() => {
		if (!api) return;

		const interval = setInterval(() => {
			const next = (current + 1) % steps.length;
			api.scrollTo(next);
		}, 5000);

		return () => clearInterval(interval);
	}, [api, current, steps.length]);

	const handleStepClick = (index: number) => {
		api?.scrollTo(index);
	};

	return (
		<div className='flex flex-col gap-12'>
			<h2 className='text-center text-3xl font-semibold'>简单 4 步, 1 分钟完成Docker容器化部署</h2>
			<div className='flex flex-col gap-8'>
				<div className='flex items-center justify-center'>
					{steps.map((step, index) => (
						<div
							key={step.title}
							className='flex items-center'
						>
							<div className='relative flex flex-col items-center gap-2'>
								<button
									type='button'
									onClick={() => handleStepClick(index)}
									className='flex cursor-pointer flex-col items-center gap-2 transition-opacity hover:opacity-80'
									aria-label={`切换到${step.title}`}
								>
									<Icon
										src={step.icon}
										className={cn(
											'size-7',
											index <= current ? 'text-brand' : 'text-muted-foreground',
										)}
									/>
									<span
										className={cn(
											'text-sm',
											index === current
												? 'text-foreground font-semibold'
												: 'text-muted-foreground font-normal',
										)}
									>
										{step.title}
									</span>
								</button>
								{index < steps.length - 1 && (
									<div className='absolute top-3.5 left-full w-48'>
										<div className='border-border h-px border-t border-dashed' />
										{index < current && (
											<div
												className='absolute -top-px left-0 h-0.75 w-full'
												style={{
													background:
														'linear-gradient(to right, transparent, var(--color-brand))',
												}}
											/>
										)}
									</div>
								)}
							</div>
							{index < steps.length - 1 && <div className='w-48' />}
						</div>
					))}
				</div>
				<Carousel
					setApi={setApi}
					className='w-full'
					opts={{
						loop: true,
						align: 'start',
					}}
				>
					<CarouselContent>
						{steps.map((step) => (
							<CarouselItem key={step.title}>
								<div className='bg-muted/50 w-full overflow-hidden'>
									<Image
										src={step.image}
										alt={step.title}
										className='h-full w-full object-contain'
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
}
