'use client';

import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import React from 'react';
import { TickedDiskImage } from '../assets';

const MILESTONE_CONTENT = {
	title: {
		prefix: 'Sealos',
		highlight: '里程碑',
	},
	subtitle: '多年技术锤炼，构筑坚实的云计算基础',
} as const;

type MilestoneYear = {
	year: string;
	content: string;
};

const MILESTONES: MilestoneYear[] = [
	{ year: '2021', content: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
	{ year: '2022', content: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB' },
	{ year: '2023', content: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC' },
	{ year: '2024', content: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD' },
	{ year: '2025', content: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE' },
];

type DialLayoutConfig = {
	startAngleDeg: number;
	stepAngleDeg: number;
	radiusRatio: number;
	markerRadiusRatio: number;
	markerRotateOffsetDeg: number;
	labelRotateOffsetDeg: number;
	labelStandDeg: number;
	labelTextRotateDeg: number;
};

type Dial3dConfig = {
	perspectivePx: number;
	tiltXDeg: number;
	tiltYDeg: number;
	tiltZDeg: number;
};

type DialScrollConfig = {
	pageStepProgress: number;
	rotateStepDeg: number;
};

const DIAL_LAYOUT_CONFIG: DialLayoutConfig = {
	startAngleDeg: 90 + 18,
	stepAngleDeg: -18,
	radiusRatio: 0.348,
	markerRadiusRatio: 0.385,
	markerRotateOffsetDeg: 30,
	labelRotateOffsetDeg: 90,
	labelStandDeg: 0,
	labelTextRotateDeg: 180,
};

const DIAL_SCROLL_CONFIG: DialScrollConfig = {
	// Milestones occupy 0..(len-1) steps, with an extra empty step at 1.00.
	// So each milestone step should happen before the end: stepProgress = 1 / len.
	pageStepProgress: 1 / MILESTONES.length,
	rotateStepDeg: 18,
};

const DIAL_3D_CONFIG: Dial3dConfig = {
	perspectivePx: 900,
	tiltXDeg: -60,
	tiltYDeg: -16,
	tiltZDeg: 0,
};

function degToRad(deg: number) {
	return (deg * Math.PI) / 180;
}

/**
 * Convert a dial angle + radius into a 2D translate vector (px).
 * Angle convention: 0deg points to the right; positive values rotate clockwise (screen coordinates).
 */
function getDialTranslatePx(params: { angleDeg: number; radiusPx: number }) {
	const rad = degToRad(params.angleDeg);
	return {
		x: Math.cos(rad) * params.radiusPx,
		y: Math.sin(rad) * params.radiusPx,
	};
}

const HEX_CLIP_PATH = 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0 50%)';

const DIAL_ROTATE_TRANSITION = {
	type: 'spring',
	stiffness: 90,
	damping: 18,
} as const;

const CALLOUT_LINE_CONFIG = {
	kinkDxPx: 28.26,
	kinkDyPx: 33.52,
	baselineYRatio: 0.62,
	endPaddingPx: 16,
	textOffsetYPx: 10,
	strokeWidth: 1,
	dash: '2 2',
} as const;

function MilestoneGraphic() {
	const scrollWrapRef = React.useRef<HTMLDivElement | null>(null);
	const stageRef = React.useRef<HTMLDivElement | null>(null);
	const dialRef = React.useRef<HTMLDivElement | null>(null);
	const markerRefs = React.useRef<Array<HTMLDivElement | null>>([]);
	const [dialSizePx, setDialSizePx] = React.useState<number>(0);
	const [scrollStep, setScrollStep] = React.useState(0);
	const [callout, setCallout] = React.useState<{
		x: number;
		y: number;
		stageWidth: number;
		stageHeight: number;
	} | null>(null);
	const { scrollYProgress } = useScroll({
		target: scrollWrapRef,
		/**
		 * 0: when the section enters viewport (top hits bottom)
		 * 1: when the section ends (bottom hits top)
		 */
		offset: ['start end', 'end start'],
	});

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		const { pageStepProgress } = DIAL_SCROLL_CONFIG;
		if (!Number.isFinite(latest) || !Number.isFinite(pageStepProgress) || pageStepProgress <= 0) {
			return;
		}

		// Reserve an extra empty step at the end:
		// step 0..(MILESTONES.length-1) => milestones
		// step MILESTONES.length => empty (scrollYProgress ~ 1.00)
		const maxStep = Math.max(0, MILESTONES.length);

		// Motion's scroll progress often never reaches exactly 1 due to rounding.
		// We treat "near 1" as the final empty step instead of the last milestone step.
		const nearEnd = latest >= 1 - 1e-4;
		const nextStep = nearEnd
			? maxStep
			: Math.min(maxStep, Math.max(0, Math.floor((latest + 1e-6) / pageStepProgress)));

		setScrollStep((prev) => (prev === nextStep ? prev : nextStep));
	});

	const dialRotateZDeg = scrollStep * DIAL_SCROLL_CONFIG.rotateStepDeg;
	const activeMilestoneIndex = scrollStep >= MILESTONES.length ? null : Math.max(0, scrollStep);
	const dialRotateZ = DIAL_3D_CONFIG.tiltZDeg + dialRotateZDeg;

	const measureActiveMarker = React.useCallback(() => {
		if (activeMilestoneIndex == null) {
			setCallout(null);
			return;
		}

		const stage = stageRef.current;
		const marker = markerRefs.current[activeMilestoneIndex];
		if (!stage || !marker) {
			return;
		}

		const stageRect = stage.getBoundingClientRect();
		const markerRect = marker.getBoundingClientRect();
		const x = markerRect.left - stageRect.left + markerRect.width / 2;
		const y = markerRect.top - stageRect.top + markerRect.height / 2;

		setCallout((prev) => {
			if (
				prev &&
				Math.abs(prev.x - x) < 0.5 &&
				Math.abs(prev.y - y) < 0.5 &&
				Math.abs(prev.stageWidth - stageRect.width) < 0.5 &&
				Math.abs(prev.stageHeight - stageRect.height) < 0.5
			) {
				return prev;
			}
			return {
				x,
				y,
				stageWidth: stageRect.width,
				stageHeight: stageRect.height,
			};
		});
	}, [activeMilestoneIndex]);

	React.useEffect(() => {
		if (activeMilestoneIndex == null) {
			setCallout(null);
			return;
		}

		let raf = 0;
		const start = performance.now();
		const tick = () => {
			measureActiveMarker();
			if (performance.now() - start < 500) {
				raf = requestAnimationFrame(tick);
			}
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [activeMilestoneIndex, measureActiveMarker]);

	React.useEffect(() => {
		const el = dialRef.current;
		if (!el) {
			return;
		}

		const update = (width: number, height: number) => {
			setDialSizePx(Math.max(0, Math.min(width, height)));
		};

		update(el.offsetWidth, el.offsetHeight);

		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (!entry) {
				return;
			}
			update(entry.contentRect.width, entry.contentRect.height);
		});

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const yearNodes = React.useMemo(() => {
		if (!dialSizePx) {
			return [];
		}

		const {
			startAngleDeg,
			stepAngleDeg,
			radiusRatio,
			markerRadiusRatio,
			markerRotateOffsetDeg,
			labelRotateOffsetDeg,
			labelStandDeg,
			labelTextRotateDeg,
		} = DIAL_LAYOUT_CONFIG;
		const labelRadiusPx = dialSizePx * radiusRatio;
		const markerRadiusPx = dialSizePx * markerRadiusRatio;

		return MILESTONES.map((item, index) => {
			const angleDeg = startAngleDeg + index * stepAngleDeg;
			const labelPosition = getDialTranslatePx({
				angleDeg,
				radiusPx: labelRadiusPx,
			});
			const markerPosition = getDialTranslatePx({
				angleDeg,
				radiusPx: markerRadiusPx,
			});
			const isActive = activeMilestoneIndex === index;

			const labelTransform = [
				`translate3d(calc(-50% + ${labelPosition.x.toFixed(2)}px), calc(-50% + ${labelPosition.y.toFixed(2)}px), 0px)`,
				`rotateZ(${(angleDeg + labelRotateOffsetDeg).toFixed(2)}deg)`,
				`rotateX(${labelStandDeg}deg)`,
			].join(' ');

			return (
				<React.Fragment key={item.year}>
					<div
						className='bg-brand absolute top-1/2 left-1/2 h-3 w-3'
						ref={(el) => {
							markerRefs.current[index] = el;
						}}
						style={{
							transform: `translate3d(calc(-50% + ${markerPosition.x.toFixed(2)}px), calc(-50% + ${markerPosition.y.toFixed(2)}px), 0px) rotateZ(${(angleDeg + markerRotateOffsetDeg).toFixed(2)}deg)`,
							transformOrigin: '50% 50%',
							clipPath: HEX_CLIP_PATH,
							opacity: isActive ? 1 : 0,
							transition: 'opacity 250ms ease-in-out',
							willChange: 'opacity',
						}}
					/>
					<div
						className='text-muted-foreground absolute top-1/2 left-1/2 text-[9px] leading-none select-none'
						style={{
							transform: labelTransform,
							transformOrigin: '50% 100%',
							transformStyle: 'preserve-3d',
						}}
					>
						<span
							className='block'
							style={{
								transform: `rotateZ(${labelTextRotateDeg}deg)`,
								transformOrigin: '50% 50%',
							}}
						>
							{item.year}
						</span>
					</div>
				</React.Fragment>
			);
		});
	}, [activeMilestoneIndex, dialSizePx]);

	return (
		<div
			ref={scrollWrapRef}
			className='relative w-full'
			style={{
				// Reserve an extra viewport for the final empty step.
				height: `${(MILESTONES.length + 1) * 100}vh`,
			}}
		>
			<div
				ref={stageRef}
				className='sticky top-0 flex h-screen w-full items-center justify-center'
				style={{
					perspective: `${DIAL_3D_CONFIG.perspectivePx}px`,
					perspectiveOrigin: '50% 50%',
				}}
			>
				<div
					ref={dialRef}
					className='relative mx-auto w-full max-w-3xl'
					style={{
						scale: 2,
					}}
				>
					<div
						className='relative'
						style={{
							contain: 'paint',
							WebkitMaskImage:
								'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,1) calc(100% + 1rem))',
							maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,1) calc(100% + 1rem))',
							WebkitMaskRepeat: 'no-repeat',
							maskRepeat: 'no-repeat',
							WebkitMaskSize: '100% 100%',
							maskSize: '100% 100%',
						}}
					>
						<motion.div
							className='relative'
							style={{
								transformStyle: 'preserve-3d',
								rotateX: DIAL_3D_CONFIG.tiltXDeg,
								rotateY: DIAL_3D_CONFIG.tiltYDeg,
								willChange: 'transform',
								backfaceVisibility: 'hidden',
							}}
							animate={{ rotateZ: dialRotateZ }}
							transition={DIAL_ROTATE_TRANSITION}
						>
							<Image
								src={TickedDiskImage}
								alt='Milestone dial'
								className='h-auto w-full'
								priority
							/>
						</motion.div>
					</div>

					<motion.div
						className='absolute inset-0'
						style={{
							transformStyle: 'preserve-3d',
							rotateX: DIAL_3D_CONFIG.tiltXDeg,
							rotateY: DIAL_3D_CONFIG.tiltYDeg,
							pointerEvents: 'none',
							willChange: 'transform',
							backfaceVisibility: 'hidden',
						}}
						animate={{ rotateZ: dialRotateZ }}
						transition={DIAL_ROTATE_TRANSITION}
					>
						<div className='relative h-full w-full'>{yearNodes}</div>
					</motion.div>
				</div>

				{activeMilestoneIndex != null && callout && (
					<div className='pointer-events-none absolute inset-0'>
						{(() => {
							const baselineY = Math.max(1, callout.stageHeight * CALLOUT_LINE_CONFIG.baselineYRatio);
							const slope = CALLOUT_LINE_CONFIG.kinkDxPx / CALLOUT_LINE_CONFIG.kinkDyPx;
							const dy = Math.max(0, callout.y - baselineY);
							const kinkX = callout.x + dy * slope;
							const kinkY = baselineY;
							const endX = callout.stageWidth - CALLOUT_LINE_CONFIG.endPaddingPx;
							const endY = baselineY;

							return (
								<>
									{/** biome-ignore lint/a11y/noSvgWithoutTitle: Decorative */}
									<svg
										className='text-brand absolute inset-0'
										width='100%'
										height='100%'
									>
										<path
											d={[
												`M ${callout.x.toFixed(2)} ${callout.y.toFixed(2)}`,
												`L ${kinkX.toFixed(2)} ${kinkY.toFixed(2)}`,
												`L ${endX.toFixed(2)} ${endY.toFixed(2)}`,
											].join(' ')}
											fill='none'
											stroke='currentColor'
											strokeWidth={CALLOUT_LINE_CONFIG.strokeWidth}
											strokeDasharray={CALLOUT_LINE_CONFIG.dash}
											vectorEffect='non-scaling-stroke'
										/>
									</svg>
									<div
										className='text-foreground absolute text-md leading-none font-medium'
										style={{
											left: callout.stageWidth - CALLOUT_LINE_CONFIG.endPaddingPx,
											top: baselineY - CALLOUT_LINE_CONFIG.textOffsetYPx,
											transform: 'translate(-100%, -100%)',
											whiteSpace: 'nowrap',
										}}
									>
										{MILESTONES[activeMilestoneIndex]?.content ?? ''}
									</div>
								</>
							);
						})()}
					</div>
				)}
			</div>
		</div>
	);
}

export function MilestoneSection() {
	const milestone = MILESTONE_CONTENT;
	const sectionRef = React.useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});
	/**
	 * Make header visible only in a middle band:
	 * 1. fade in 0 -> 1
	 * 2. keep 1
	 * 3. fade out 1 -> 0
	 * 4. 0
	 */
	const headerOpacity = useTransform(scrollYProgress, [0, 0.125, 0.15, 0.85, 0.875, 1], [0, 0, 1, 1, 0, 0]);

	return (
		<div
			ref={sectionRef}
			className='pointer-events-none -mt-96 flex w-full flex-col items-center gap-16'
		>
			<motion.div
				className='sticky top-96 flex max-w-2xl flex-col items-center gap-4 text-center'
				style={{ opacity: headerOpacity }}
			>
				<h2 className='text-3xl leading-none font-semibold'>
					{milestone.title.prefix} <span className='text-brand'>{milestone.title.highlight}</span>
				</h2>
				<p className='text-muted-foreground text-base leading-normal'>{milestone.subtitle}</p>
			</motion.div>

			<div className='w-full'>
				<div className='mx-auto w-full max-w-7xl'>
					<MilestoneGraphic />
				</div>
			</div>
		</div>
	);
}
