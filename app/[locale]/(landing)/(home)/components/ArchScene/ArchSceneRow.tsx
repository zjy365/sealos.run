'use client';

import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { Number01Icon, Number02Icon, Number03Icon, Number04Icon, Number05Icon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { cn } from '@/libs/utils/styling';
import { ArchScene, type ArchSceneBoxConfig, type ArchSceneBoxes, type ArchSceneBoxKey } from './ArchScene';
import { ArchSceneDecoLine } from './ArchSceneDecoLine';

const BOX_KEYS: ArchSceneBoxKey[] = ['t', 'l', 'c', 'r', 'b'];
const DESC_NUMBER_ICONS = [Number01Icon, Number02Icon, Number03Icon, Number04Icon, Number05Icon];
const CAROUSEL_INTERVAL = 500000;

interface ArchSceneRowProps {
	item: {
		tag: string;
		alt: string;
		variant: 'left' | 'right';
		boxes: ArchSceneBoxes;
	};
}

function getAvailableBoxKeys(boxes: ArchSceneBoxes) {
	return BOX_KEYS.filter((key) => boxes[key]);
}

function getNextBoxKey(currentKey: ArchSceneBoxKey | null, boxKeys: ArchSceneBoxKey[]) {
	if (boxKeys.length === 0) {
		return null;
	}

	if (!currentKey) {
		return boxKeys[0];
	}

	const currentIndex = boxKeys.indexOf(currentKey);
	if (currentIndex === -1) {
		return boxKeys[0];
	}

	return boxKeys[(currentIndex + 1) % boxKeys.length];
}

function ArchSceneDetail({ box, variant }: { box: ArchSceneBoxConfig; variant: 'left' | 'right' }) {
	const isLeftVariant = variant === 'left';

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={box.label}
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -8 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className={cn(
					'flex min-h-40 w-full max-w-80 flex-col gap-3',
					!isLeftVariant && 'lg:items-end lg:text-right',
					isLeftVariant && 'lg:items-start lg:text-left',
				)}
			>
				<div className={cn('flex items-center gap-2', !isLeftVariant && 'lg:flex-row-reverse')}>
					<Icon
						src={box.icon}
						className='size-8 rounded-sm'
					/>
					<span className='text-lg font-medium'>{box.label}</span>
				</div>

				<ul className='flex flex-col gap-2'>
					{box.desc.map((item, index) => {
						const numberIcon = DESC_NUMBER_ICONS[index];

						return (
							<li
								key={`${box.label}-${item}`}
								className={cn(
									'text-muted-foreground flex items-center gap-2 text-sm sm:text-base',
									!isLeftVariant && 'lg:flex-row-reverse',
								)}
							>
								{numberIcon && (
									<Icon
										src={numberIcon}
										className='text-muted-foreground size-5'
									/>
								)}
								<span>{item}</span>
							</li>
						);
					})}
				</ul>
			</motion.div>
		</AnimatePresence>
	);
}

export function ArchSceneRow({ item }: ArchSceneRowProps) {
	const isLeftVariant = item.variant === 'left';
	const availableBoxKeys = React.useMemo(() => getAvailableBoxKeys(item.boxes), [item.boxes]);
	const [activeBoxKey, setActiveBoxKey] = React.useState<ArchSceneBoxKey | null>(availableBoxKeys[0] ?? null);
	const [hoveredBoxKey, setHoveredBoxKey] = React.useState<ArchSceneBoxKey | null>(null);
	const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

	const stopCarousel = React.useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	const startCarousel = React.useCallback(() => {
		stopCarousel();

		if (availableBoxKeys.length <= 1) {
			return;
		}

		intervalRef.current = setInterval(() => {
			setActiveBoxKey((currentKey) => getNextBoxKey(currentKey, availableBoxKeys) ?? null);
		}, CAROUSEL_INTERVAL);
	}, [availableBoxKeys, stopCarousel]);

	React.useEffect(() => {
		setActiveBoxKey((currentKey) => {
			if (!currentKey || !availableBoxKeys.includes(currentKey)) {
				return availableBoxKeys[0] ?? null;
			}

			return currentKey;
		});
	}, [availableBoxKeys]);

	React.useEffect(() => {
		startCarousel();

		return () => {
			stopCarousel();
		};
	}, [startCarousel, stopCarousel]);

	const activeBox = activeBoxKey ? (item.boxes[activeBoxKey] ?? null) : null;
	if (!activeBox) {
		return null;
	}

	const handleBoxClick = (key: ArchSceneBoxKey) => {
		setActiveBoxKey(key);
		startCarousel();
	};

	const handleBoxHover = (key: ArchSceneBoxKey | null) => {
		setHoveredBoxKey(key);

		if (key) {
			stopCarousel();
			return;
		}

		startCarousel();
	};

	const scene = (
		<ArchScene
			alt={item.alt}
			boxes={item.boxes}
			activeBoxKey={activeBoxKey}
			hoveredBoxKey={hoveredBoxKey}
			onBoxClick={handleBoxClick}
			onBoxHover={handleBoxHover}
		/>
	);

	const detail = (
		<div className='mx-4 w-full lg:w-80'>
			<ArchSceneDetail
				box={activeBox}
				variant={item.variant}
			/>
		</div>
	);

	const decoLine = (
		<div className='hidden lg:block'>
			<ArchSceneDecoLine
				text={item.tag}
				variant={item.variant}
			/>
		</div>
	);

	return (
		<div
			className={cn(
				'flex w-full flex-col items-start gap-6 lg:gap-4',
				isLeftVariant ? 'lg:items-start' : 'lg:items-end',
			)}
		>
			<div className='text-brand text-left text-lg font-medium lg:hidden'>{item.tag}</div>

			<div className='flex w-full flex-col items-start gap-y-6 lg:hidden'>
				{scene}
				{detail}
			</div>

			<div
				className={cn(
					'hidden w-full items-end gap-y-6 lg:flex',
					isLeftVariant ? 'justify-start' : 'justify-end',
				)}
			>
				{item.variant === 'right' ? (
					<>
						{detail}
						{decoLine}
						{scene}
					</>
				) : (
					<>
						{scene}
						{decoLine}
						{detail}
					</>
				)}
			</div>
		</div>
	);
}
