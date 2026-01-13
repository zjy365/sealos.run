'use client';

import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { FeaturesScene } from '../components/FeaturesScene';
import { FeaturesHeader } from '../components/FeaturesScene/FeaturesHeader';
import { FeaturesImage } from '../components/FeaturesScene/FeaturesImage';
import { FeaturesList } from '../components/FeaturesScene/FeaturesList';
import { aiproxyConfig, databaseConfig, devboxConfig, launchpadConfig, ossConfig } from '../utils/features-config';

const TOTAL_ITEMS = 5;
const CONFIGS = [launchpadConfig, devboxConfig, databaseConfig, aiproxyConfig, ossConfig];
const CAROUSEL_INTERVAL = 500000;

interface FeaturesSectionClientProps {
	activeBoxIndex: number;
	onIndexChange: (index: number) => void;
}

export function FeaturesSectionClient({ activeBoxIndex, onIndexChange }: FeaturesSectionClientProps) {
	const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
	const internalIndexRef = React.useRef(activeBoxIndex);
	const isAutoSwitchingRef = React.useRef(false);
	const lastActiveIndexRef = React.useRef(activeBoxIndex);

	// 启动轮播定时器
	const startCarousel = React.useCallback(() => {
		// 清除现有定时器
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		// 启动新定时器
		intervalRef.current = setInterval(() => {
			isAutoSwitchingRef.current = true;
			const nextIndex = (internalIndexRef.current + 1) % TOTAL_ITEMS;
			internalIndexRef.current = nextIndex;
			onIndexChange(nextIndex);
			// 重置标志，等待下一次自动切换
			setTimeout(() => {
				isAutoSwitchingRef.current = false;
			}, 100);
		}, CAROUSEL_INTERVAL);
	}, [onIndexChange]);

	// 同步外部传入的 activeBoxIndex
	React.useEffect(() => {
		internalIndexRef.current = activeBoxIndex;

		// 如果 activeBoxIndex 变化且不是自动切换导致的，重置定时器
		if (activeBoxIndex !== lastActiveIndexRef.current && !isAutoSwitchingRef.current) {
			startCarousel();
		}

		lastActiveIndexRef.current = activeBoxIndex;
	}, [activeBoxIndex, startCarousel]);

	// 自动轮播逻辑
	React.useEffect(() => {
		startCarousel();
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [startCarousel]);

	const handleIndexChange = (index: number) => {
		internalIndexRef.current = index;
		onIndexChange(index);
		// 重置定时器
		startCarousel();
	};

	const currentConfig = CONFIGS[activeBoxIndex];

	return (
		<div className='flex w-full flex-col gap-6 lg:gap-16'>
			{/* 标题部分 - 在所有断点都显示在上方 */}
			<div className='relative max-w-full'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={`header-${activeBoxIndex}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<FeaturesHeader config={currentConfig} />
					</motion.div>
				</AnimatePresence>
			</div>

			{/* 主要内容区域 */}
			<div className='flex w-full flex-col gap-8 lg:flex-row lg:gap-16'>
				{/* 左侧：FeaturesScene 和 FeaturesList 并排（sm md 断点） */}
				<div className='flex w-full flex-col gap-8 sm:flex-row md:flex-row lg:w-auto lg:flex-col xl:w-1/3 xl:flex-col'>
					<div className='shrink-0'>
						<FeaturesScene
							activeBoxIndex={activeBoxIndex}
							onBoxClick={handleIndexChange}
						/>
					</div>
					<div className='flex-1 sm:flex-none'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={`list-${activeBoxIndex}`}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
							>
								<FeaturesList config={currentConfig} />
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* 下方（sm md）/ 右侧（lg+）：图部分 */}
				<div className='relative w-full flex-1 lg:flex-auto'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={`image-${activeBoxIndex}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
						>
							<FeaturesImage config={currentConfig} />
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
