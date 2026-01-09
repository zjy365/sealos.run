'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import React from 'react';
import { ApiIcon, KeyIcon, ListIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';
import { ApiCallScene } from '../components/ApiCallScene';
import { GetKeyScene } from '../components/GetKeyScene';
import { ParamsScene } from '../components/ParamsScene';

const SCENE_COUNT = 3;

const scenes = [
	{
		id: 'getkey',
		icon: KeyIcon,
		subtitle: '获取API Key',
		description: '访问 Sealos Cloud，打开 AI Proxy，点击「新建」按钮创建新的 API Key',
		component: GetKeyScene,
	},
	{
		id: 'apicall',
		icon: ApiIcon,
		subtitle: 'API 调用示例',
		description: '使用标准 OpenAI 兼容接口，快速集成到你的应用中',
		component: ApiCallScene,
	},
	{
		id: 'params',
		icon: ListIcon,
		subtitle: '参数说明',
		description: '了解 API 参数配置，灵活控制模型行为',
		component: ParamsScene,
	},
];

export function MigGuideSection() {
	const containerRef = React.useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	const sceneIndex = useTransform(scrollYProgress, [0, 1 / SCENE_COUNT, 2 / SCENE_COUNT, 1], [0, 1, 2, 2], {
		clamp: true,
	});

	const [activeSceneIndex, setActiveSceneIndex] = React.useState(0);

	React.useEffect(() => {
		const unsubscribe = sceneIndex.on('change', (latest) => {
			const index = Math.floor(latest);
			const clampedIndex = Math.max(0, Math.min(SCENE_COUNT - 1, index));
			setActiveSceneIndex(clampedIndex);
		});

		return () => {
			unsubscribe();
		};
	}, [sceneIndex]);

	const activeScene = scenes[activeSceneIndex];
	const ActiveSceneComponent = activeScene.component;

	return (
		<div
			ref={containerRef}
			className='flex items-stretch gap-12'
			style={{ minHeight: '200vh' }}
		>
			<div className='border-brand sticky top-64 flex h-[calc(100dvh-24rem)] flex-1 flex-col justify-between border-r border-dashed py-12'>
				<div className='flex flex-col gap-8'>
					<h2 className='text-4xl font-semibold'>从 OpenAI 生态零成本迁移</h2>
					<AnimatePresence mode='wait'>
						<motion.div
							key={activeScene.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className='flex flex-col gap-2'
						>
							<div className='flex items-center gap-2'>
								<Icon
									src={activeScene.icon}
									className='text-brand size-6'
								/>
								<span className='text-2xl'>{activeScene.subtitle}</span>
							</div>
							<p className='text-muted-foreground text-base'>{activeScene.description}</p>
						</motion.div>
					</AnimatePresence>
				</div>
				<div className='flex justify-end pr-4'>
					<LandingOutlineButton
						href='#'
						size='lg'
					>
						快速开始
					</LandingOutlineButton>
				</div>
			</div>

			<div className='sticky top-64 ml-auto flex h-[calc(100dvh-24rem)] w-1/2 max-w-2xl shrink-0 items-start justify-center py-12'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeScene.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className='w-full'
					>
						<ActiveSceneComponent />
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
