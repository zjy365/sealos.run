'use client';

import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { cn } from '@/libs/utils/styling';
import { FeaturesScene } from '../components/FeaturesScene';
import { FeaturesHeader } from '../components/FeaturesScene/FeaturesHeader';
import { FeaturesImage } from '../components/FeaturesScene/FeaturesImage';
import { FeaturesList } from '../components/FeaturesScene/FeaturesList';
import { aiproxyConfig, databaseConfig, devboxConfig, launchpadConfig, ossConfig } from '../utils/features-config';
import styles from './FeaturesSectionClient.module.css';

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
	if (!currentConfig) {
		return null;
	}

	return (
		<div className='w-full'>
			<div className={cn(styles['featuresGrid'], 'grid w-full gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-2')}>
				{/* 标题部分 */}
				<div className={cn('[grid-area:header]', 'relative')}>
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

				{/* 场景部分 */}
				<div className={cn('[grid-area:scene]', 'shrink-0')}>
					<FeaturesScene
						activeBoxIndex={activeBoxIndex}
						onBoxClick={handleIndexChange}
					/>
				</div>

				{/* 列表部分 */}
				<div className='[grid-area:list]'>
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

				{/* 图片部分 */}
				<div className={cn('[grid-area:image]', 'relative')}>
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
