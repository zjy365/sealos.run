'use client';

import { motion, useAnimationFrame, useInView, useMotionValue, useTransform } from 'motion/react';
import Image from 'next/image';
import React from 'react';
import { CubeIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { AppsSectionImage } from '../assets';

type AppIconData = {
	name: string;
	iconSrc: typeof CubeIcon;
	x: number;
	y: number;
	orbitRadius?: number;
};

const APPS_CONTENT = {
	title: {
		prefix: '丰富的',
		highlight: '应用池',
	},
	subtitle: 'Sealos 强大的生态体系和多样化的服务支持，助您无忧上云',
} as const;

const SVG_VIEW_BOX = {
	width: 1010,
	height: 422,
} as const;

const ORBIT_CENTER = {
	x: 513.217,
	// -50% y Offset
	y: 208.78 - 32,
} as const;

const CENTER_ORBIT_RADIUS = 166.621;
const CENTER_ORBIT_START_ANGLE = -90;

const GROUP_REVEAL_DURATION = 0.55;
const GROUP_REVEAL_STAGGER = 0.22;
const SIDE_ICON_POP_STAGGER = 0.06;
const CENTER_ORBIT_SECONDS = 16;
const SIDE_FRAME_SIZE = { width: 35.201, height: 50 } as const;

function mirrorFrameToNormalX(mirroredX: number) {
	return mirroredX - SIDE_FRAME_SIZE.width;
}

const LEFT_APPS: AppIconData[] = [
	{ name: '应用 1', iconSrc: CubeIcon, x: 125.225, y: 27.826 },
	{ name: '应用 2', iconSrc: CubeIcon, x: 216.326, y: 27.826 },
	{ name: '应用 3', iconSrc: CubeIcon, x: 80.225, y: 106.826 },
	{ name: '应用 4', iconSrc: CubeIcon, x: 171.326, y: 106.826 },
	{ name: '应用 5', iconSrc: CubeIcon, x: 35.225, y: 185.826 },
	{ name: '应用 6', iconSrc: CubeIcon, x: 126.326, y: 185.826 },
	{ name: '应用 7', iconSrc: CubeIcon, x: 80.317, y: 264.809 },
	{ name: '应用 8', iconSrc: CubeIcon, x: 171.418, y: 264.809 },
	{ name: '应用 9', iconSrc: CubeIcon, x: 126.326, y: 343.37 },
	{ name: '应用 10', iconSrc: CubeIcon, x: 217.427, y: 343.37 },
];

const RIGHT_APPS: AppIconData[] = [
	{
		name: '应用 11',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(884.653),
		y: 27.826,
	},
	{
		name: '应用 12',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(793.552),
		y: 27.826,
	},
	{
		name: '应用 13',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(929.653),
		y: 106.826,
	},
	{
		name: '应用 14',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(838.552),
		y: 106.826,
	},
	{
		name: '应用 15',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(974.653),
		y: 185.826,
	},
	{
		name: '应用 16',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(883.552),
		y: 185.826,
	},
	{
		name: '应用 17',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(929.56),
		y: 264.809,
	},
	{
		name: '应用 18',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(838.459),
		y: 264.809,
	},
	{
		name: '应用 19',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(883.551),
		y: 343.37,
	},
	{
		name: '应用 20',
		iconSrc: CubeIcon,
		x: mirrorFrameToNormalX(792.45),
		y: 343.37,
	},
];

const CENTER_APPS: AppIconData[] = [
	{
		name: '核心应用 1',
		iconSrc: CubeIcon,
		x: 304.353,
		y: 127.28,
		orbitRadius: CENTER_ORBIT_RADIUS,
	},
	{
		name: '核心应用 2',
		iconSrc: CubeIcon,
		x: 479.521,
		y: 11.237,
		orbitRadius: CENTER_ORBIT_RADIUS,
	},
	{
		name: '核心应用 3',
		iconSrc: CubeIcon,
		x: 642.695,
		y: 127.28,
		orbitRadius: CENTER_ORBIT_RADIUS,
	},
	{
		name: '核心应用 4',
		iconSrc: CubeIcon,
		x: 588.537,
		y: 299.875,
		orbitRadius: CENTER_ORBIT_RADIUS,
	},
	{
		name: '核心应用 5',
		iconSrc: CubeIcon,
		x: 372.766,
		y: 299.875,
		orbitRadius: CENTER_ORBIT_RADIUS,
	},
];

function toPercentX(px: number) {
	return `${(px / SVG_VIEW_BOX.width) * 100}%`;
}

function toPercentY(px: number) {
	return `${(px / SVG_VIEW_BOX.height) * 100}%`;
}

function getAppCenter(position: { x: number; y: number }, size: { width: number; height: number }) {
	return {
		x: position.x + size.width / 2,
		y: position.y + size.height / 2,
	};
}

function SideIconItem({ item, delay, visible }: { item: AppIconData; delay: number; visible: boolean }) {
	const center = getAppCenter(item, SIDE_FRAME_SIZE);

	return (
		<div
			className='absolute -translate-x-1/2 -translate-y-1/2 -rotate-90 sm:rotate-0'
			style={{
				left: toPercentX(center.x),
				top: toPercentY(center.y),
			}}
		>
			<motion.div
				className='bg-background/95 flex h-full w-full flex-col items-center justify-center'
				initial={{ opacity: 0, scale: 0.75, y: 14 }}
				animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.75, y: 14 }}
				transition={{ duration: 0.28, delay, ease: 'easeOut' }}
				style={{ originX: 0.5, originY: 0.5, transformOrigin: '50% 50%' }}
			>
				<Icon
					src={item.iconSrc}
					className='text-brand size-4 sm:size-8'
				/>
				<p className='text-foreground mt-1 scale-75 text-[8px] leading-none whitespace-nowrap sm:scale-100 sm:text-[10px]'>
					{item.name}
				</p>
			</motion.div>
		</div>
	);
}

function CenterOrbitItem({
	item,
	visible,
	delay,
	onHoverChange,
	orbitAngle,
	orbitScale,
	baseAngle,
}: {
	item: AppIconData;
	visible: boolean;
	delay: number;
	onHoverChange: (hovered: boolean) => void;
	orbitAngle: ReturnType<typeof useMotionValue<number>>;
	orbitScale: number;
	baseAngle: number;
}) {
	const orbitRadius = (item.orbitRadius ?? CENTER_ORBIT_RADIUS) * orbitScale;

	const orbitRotate = useTransform(orbitAngle, (value) => value + baseAngle);
	const counterRotate = useTransform(orbitAngle, (value) => -value - baseAngle);

	return (
		<motion.div
			className='absolute'
			initial={{ opacity: 0, y: 18 }}
			animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
			transition={{ duration: 0.4, delay, ease: 'easeOut' }}
			style={{
				left: toPercentX(ORBIT_CENTER.x),
				top: toPercentY(ORBIT_CENTER.y),
				x: '-50%',
				y: '-50%',
				rotate: orbitRotate,
				willChange: 'transform',
			}}
		>
			<motion.div
				className='origin-center -rotate-90 sm:rotate-0'
				style={{
					x: orbitRadius,
					y: '-50%',
					rotate: counterRotate,
					originX: 0.5,
					originY: 0.5,
					willChange: 'transform',
				}}
			>
				<motion.div
					className='bg-background/95 flex aspect-square size-8 cursor-pointer flex-col items-center justify-center sm:size-20'
					whileHover={{
						x: [0, -2, 2, -2, 2, 0],
					}}
					transition={{ duration: 0.36, ease: 'easeInOut' }}
					onHoverStart={() => onHoverChange(true)}
					onHoverEnd={() => onHoverChange(false)}
				>
					<Icon
						src={item.iconSrc}
						className='text-brand size-full'
					/>
					<p className='text-foreground mt-2 scale-75 text-[10px] leading-none whitespace-nowrap sm:scale-100 sm:text-sm'>
						{item.name}
					</p>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}

export function AppsSection() {
	const sectionRef = React.useRef<HTMLDivElement | null>(null);
	const orbitRootRef = React.useRef<HTMLDivElement | null>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
	const [orbitPaused, setOrbitPaused] = React.useState(false);
	const [orbitScale, setOrbitScale] = React.useState(1);
	const orbitAngle = useMotionValue(0);

	React.useLayoutEffect(() => {
		const element = orbitRootRef.current;
		if (!element) {
			return;
		}

		const updateScale = () => {
			const rect = element.getBoundingClientRect();
			if (!rect.width) {
				return;
			}

			setOrbitScale(rect.width / SVG_VIEW_BOX.width);
		};

		updateScale();

		const resizeObserver = new ResizeObserver(updateScale);
		resizeObserver.observe(element);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	useAnimationFrame((_, delta) => {
		if (orbitPaused || !isInView) {
			return;
		}

		const next = orbitAngle.get() + (360 / CENTER_ORBIT_SECONDS) * (delta / 1000);
		orbitAngle.set(next % 360);
	});

	const leftDelay = 0;
	const centerDelay = leftDelay + GROUP_REVEAL_STAGGER;
	const rightDelay = centerDelay + GROUP_REVEAL_STAGGER;
	const leftPopStart = leftDelay + GROUP_REVEAL_DURATION;
	const rightPopStart = rightDelay + GROUP_REVEAL_DURATION;
	const centerOrbitStepAngle = 360 / CENTER_APPS.length;

	return (
		<div
			ref={sectionRef}
			className='flex w-full flex-col items-center gap-16 pb-[calc(200vw-16rem)] sm:pb-0'
		>
			<div className='flex max-w-2xl flex-col items-center gap-4 text-center'>
				<h2 className='text-3xl leading-none font-semibold'>
					{APPS_CONTENT.title.prefix}
					<span className='text-brand'>{APPS_CONTENT.title.highlight}</span>
				</h2>
				<p className='text-muted-foreground text-base leading-normal'>{APPS_CONTENT.subtitle}</p>
			</div>

			<div className='w-full scale-[calc(calc(1010/422)-0.25)] rotate-90 sm:scale-100 sm:rotate-0'>
				<div
					ref={orbitRootRef}
					className='relative mx-auto w-full max-w-6xl translate-x-[40%] sm:translate-x-0'
					style={{
						aspectRatio: `${SVG_VIEW_BOX.width} / ${SVG_VIEW_BOX.height}`,
					}}
				>
					<motion.div
						className='absolute inset-0'
						initial={{ opacity: 0, y: 28 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
						transition={{
							duration: GROUP_REVEAL_DURATION,
							delay: rightDelay,
							ease: 'easeOut',
						}}
					>
						{RIGHT_APPS.map((item, index) => (
							<SideIconItem
								// biome-ignore lint/suspicious/noArrayIndexKey: has index related delay
								key={index}
								item={item}
								visible={isInView}
								delay={rightPopStart + index * SIDE_ICON_POP_STAGGER}
							/>
						))}
					</motion.div>

					<motion.div
						className='absolute inset-0'
						initial={{ opacity: 0, y: 28 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
						transition={{
							duration: GROUP_REVEAL_DURATION,
							delay: leftDelay,
							ease: 'easeOut',
						}}
					>
						{LEFT_APPS.map((item, index) => (
							<SideIconItem
								// biome-ignore lint/suspicious/noArrayIndexKey: has index related delay
								key={index}
								item={item}
								visible={isInView}
								delay={leftPopStart + index * SIDE_ICON_POP_STAGGER}
							/>
						))}
					</motion.div>

					<motion.div
						className='absolute inset-0'
						initial={{ opacity: 0, y: 28 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
						transition={{
							duration: GROUP_REVEAL_DURATION,
							delay: centerDelay,
							ease: 'easeOut',
						}}
					>
						{CENTER_APPS.map((item, index) => {
							const baseAngle = CENTER_ORBIT_START_ANGLE + centerOrbitStepAngle * index;

							return (
								<CenterOrbitItem
									// biome-ignore lint/suspicious/noArrayIndexKey: has index related delay
									key={index}
									item={item}
									visible={isInView}
									delay={centerDelay + 0.2 + index * 0.06}
									onHoverChange={setOrbitPaused}
									orbitAngle={orbitAngle}
									orbitScale={orbitScale}
									baseAngle={baseAngle}
								/>
							);
						})}
					</motion.div>

					<div className='pointer-events-none absolute inset-0'>
						<Image
							src={AppsSectionImage}
							alt=''
							fill
							className='object-contain'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
