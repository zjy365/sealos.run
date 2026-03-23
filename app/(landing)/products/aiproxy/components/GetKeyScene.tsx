'use client';

import Image from 'next/image';
import React from 'react';
import { Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/components/ui/accordion';
import { Icon } from '@/libs/components/ui/icon';
import {
	GuideGetkeyCopykeyImage,
	GuideGetkeyCreatekeyImage,
	GuideGetkeyDesktopImage,
	GuideGetkeyOpenappImage,
} from '../assets';

const steps = [
	{
		number: Number01Icon,
		title: '获取 API Key',
		description: '访问 Sealos Cloud，打开 AI Proxy，点击「新建」按钮创建新的 API Key',
		image: GuideGetkeyCreatekeyImage,
	},
	{
		number: Number02Icon,
		title: '复制 API Endpoint 和 API Key',
		description: '复制生成的 API Endpoint 和 API Key，用于后续调用',
		image: GuideGetkeyCopykeyImage,
	},
	{
		number: Number03Icon,
		title: '配置应用',
		description: '将 API Endpoint 和 API Key 配置到你的应用中',
		image: GuideGetkeyDesktopImage,
	},
	{
		number: Number04Icon,
		title: '开始使用',
		description: '完成配置后，即可开始使用 AI Proxy 服务',
		image: GuideGetkeyOpenappImage,
	},
];

export function GetKeyScene() {
	const [value, setValue] = React.useState<string | undefined>(undefined);

	return (
		<Accordion
			type='single'
			collapsible
			value={value}
			onValueChange={setValue}
			className='w-full'
		>
			{steps.map((step, index) => (
				<AccordionItem
					key={step.title}
					value={`step-${index}`}
					className='border-none'
				>
					<AccordionTrigger className='text-left'>
						<div className='flex items-center gap-4'>
							<Icon
								src={step.number}
								className='text-brand size-6'
							/>
							<span className='text-lg font-medium'>{step.title}</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className='flex flex-col gap-4 pl-10'>
							<p className='text-muted-foreground'>{step.description}</p>
							<div className='flex h-64 w-full items-center justify-center overflow-hidden border border-zinc-200 bg-zinc-50'>
								<Image
									src={step.image}
									alt={step.title}
									className='h-full w-full object-contain'
								/>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
