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
	{
		year: '2018',
		content: '2018 年 8 月，提交第一行代码，解决 Kubernetes 高可用安装复杂、缺乏文档的问题。',
	},
	{
		year: '2021',
		content: '2021 年，项目霸榜 GitHub 趋势榜，并获得奇绩创坛（陆奇团队）投资。',
	},
	{
		year: '2022',
		content: '2022 年 3 月，推出 v4.0 版本，引入集群镜像能力，实现“一次构建，到处运行”。',
	},
	{
		year: '2023',
		content: '2023 年 6 月，Sealos 公有云版本正式上线。',
	},
	{
		year: '2024',
		content: '2024 年 12 月，获得阿里云战略投资，并发布 Sealos 5.0。',
	},
	{
		year: '2025',
		content: '2025 年，累计注册用户超 30 万，在线应用服务超 5 万。',
	},
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
	activeEndProgress: number;
	rotateStepDeg: number;
	scrollVhPerMilestone: number;
	extraScrollVh: number;
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
	activeEndProgress: 0.88,
	rotateStepDeg: 18,
	scrollVhPerMilestone: 56,
	extraScrollVh: 72,
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

const CALLOUT_LINE_CONFIG = {
	kinkDxPx: 28.26,
	kinkDyPx: 33.52,
	baselineYRatio: 0.62,
	endPaddingPx: 16,
	textOffsetYPx: 10,
	strokeWidth: 1,
	dash: '2 2',
	// Ensure the callout label sits above the marker on narrow screens
	minGapAboveMarkerPx: 24,
	// Guarantee a minimum horizontal segment length for the callout label
	minSegmentWidthPx: 160,
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
	const continuousStep = useTransform(
		scrollYProgress,
		[0, DIAL_SCROLL_CONFIG.activeEndProgress],
		[0, MILESTONES.length - 1],
		{
			clamp: true,
		},
	);
	const dialRotateZ = useTransform(
		continuousStep,
		(value) => DIAL_3D_CONFIG.tiltZDeg + value * DIAL_SCROLL_CONFIG.rotateStepDeg,
	);

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		const { activeEndProgress } = DIAL_SCROLL_CONFIG;
		if (!Number.isFinite(latest) || !Number.isFinite(activeEndProgress) || activeEndProgress <= 0) {
			return;
		}

		const nextStep =
			latest >= activeEndProgress
				? MILESTONES.length
				: Math.min(
						MILESTONES.length - 1,
						Math.max(0, Math.round((latest / activeEndProgress) * (MILESTONES.length - 1))),
					);

		setScrollStep((prev) => (prev === nextStep ? prev : nextStep));
	});

	const activeMilestoneIndex = scrollStep >= MILESTONES.length ? null : Math.max(0, scrollStep);

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

	useMotionValueEvent(dialRotateZ, 'change', () => {
		requestAnimationFrame(() => {
			measureActiveMarker();
		});
	});

	React.useEffect(() => {
		const el = dialRef.current;
		if (!el) {
			return;
		}

		const update = (width: number, height: number) => {
			setDialSizePx(Math.max(0, Math.min(width, height)));
		};

		update(el.offsetWidth, el.offsetHeight);

		const observer =
			typeof ResizeObserver !== 'undefined'
				? new ResizeObserver((entries) => {
						const entry = entries[0];
						if (!entry) {
							return;
						}
						update(entry.contentRect.width, entry.contentRect.height);
						// Re-measure callout when dial size changes
						requestAnimationFrame(() => {
							measureActiveMarker();
						});
					})
				: null;

		if (observer) observer.observe(el);
		return () => observer?.disconnect();
	}, [measureActiveMarker]);

	// Ensure callout responds to container size changes (e.g., viewport/responsive layout changes)
	React.useEffect(() => {
		if (activeMilestoneIndex == null) {
			return;
		}

		const stage = stageRef.current;
		if (!stage) {
			return;
		}

		let raf = 0;
		const ro =
			typeof ResizeObserver !== 'undefined'
				? new ResizeObserver(() => {
						cancelAnimationFrame(raf);
						raf = requestAnimationFrame(() => {
							measureActiveMarker();
						});
					})
				: null;

		ro?.observe(stage);
		return () => {
			ro?.disconnect();
			cancelAnimationFrame(raf);
		};
	}, [activeMilestoneIndex, measureActiveMarker]);

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
				height: `${MILESTONES.length * DIAL_SCROLL_CONFIG.scrollVhPerMilestone + DIAL_SCROLL_CONFIG.extraScrollVh}vh`,
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
								rotateZ: dialRotateZ,
								willChange: 'transform',
								backfaceVisibility: 'hidden',
							}}
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
							rotateZ: dialRotateZ,
							pointerEvents: 'none',
							willChange: 'transform',
							backfaceVisibility: 'hidden',
						}}
					>
						<div className='relative h-full w-full'>{yearNodes}</div>
					</motion.div>
				</div>

				{activeMilestoneIndex != null && callout && (
					<div className='pointer-events-none absolute inset-0'>
						{(() => {
							const baseY = Math.max(1, callout.stageHeight * CALLOUT_LINE_CONFIG.baselineYRatio);
							// Keep the callout line/label above the marker by a minimum gap
							const desiredMaxY = Math.max(1, callout.y - CALLOUT_LINE_CONFIG.minGapAboveMarkerPx);
							const baselineY = Math.min(baseY, desiredMaxY);
							const slope = CALLOUT_LINE_CONFIG.kinkDxPx / CALLOUT_LINE_CONFIG.kinkDyPx;
							const dy = Math.max(0, callout.y - baselineY);
							const endX = callout.stageWidth - CALLOUT_LINE_CONFIG.endPaddingPx;
							const kinkXRaw = callout.x + dy * slope;
							// Ensure the horizontal segment has a minimum width to avoid 1-char lines
							const kinkX = Math.max(8, Math.min(kinkXRaw, endX - CALLOUT_LINE_CONFIG.minSegmentWidthPx));
							const kinkY = baselineY;
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
									{(() => {
										// The label should not extend left of the polyline's kink.
										// Constrain its max width to the available segment length.
										const availableWidth = Math.max(1, endX - kinkX - 8);

										return (
											<div
												className='text-foreground text-md absolute font-medium'
												style={{
													left: callout.stageWidth - CALLOUT_LINE_CONFIG.endPaddingPx,
													top: baselineY - CALLOUT_LINE_CONFIG.textOffsetYPx,
													transform: 'translate(-100%, -100%)',
													maxWidth: availableWidth,
													whiteSpace: 'normal',
													overflowWrap: 'break-word',
													wordBreak: 'normal',
													textWrap: 'balance',
													width: '100%',
													WebkitHyphens: 'auto',
													hyphens: 'auto',
													textAlign: 'right',
													lineHeight: 1.2,
												}}
											>
												{MILESTONES[activeMilestoneIndex]?.content ?? ''}
											</div>
										);
									})()}
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

	return (
		<div className='pointer-events-none flex w-full flex-col items-center gap-4'>
			<div className='flex max-w-2xl flex-col items-center gap-4 text-center'>
				<h2 className='text-3xl leading-none font-semibold'>
					{milestone.title.prefix} <span className='text-brand'>{milestone.title.highlight}</span>
				</h2>
				<p className='text-muted-foreground text-base leading-normal'>{milestone.subtitle}</p>
			</div>

			<div className='w-full'>
				<div className='mx-auto w-full max-w-7xl'>
					<MilestoneGraphic />
				</div>
			</div>
		</div>
	);
}
