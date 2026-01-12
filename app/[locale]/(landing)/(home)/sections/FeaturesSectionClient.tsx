'use client';

import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { FeaturesScene } from '../components/FeaturesScene';
import { Features } from '../components/FeaturesScene/Features';
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

	return (
		<div className='flex w-full flex-col items-start gap-16 lg:flex-row'>
			<div className='shrink-0'>
				<FeaturesScene
					activeBoxIndex={activeBoxIndex}
					onBoxClick={handleIndexChange}
				/>
			</div>
			<div className='relative max-w-full flex-1'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeBoxIndex}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<Features config={CONFIGS[activeBoxIndex]} />
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
