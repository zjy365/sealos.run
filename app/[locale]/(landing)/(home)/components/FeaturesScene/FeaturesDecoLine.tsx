'use client';

import { useInView } from 'motion/react';
import type { StaticImageData } from 'next/image';
import React from 'react';
import { AiProxyIcon, AppLaunchpadIcon, DatabaseIcon, DevboxIcon, ObjectStorageIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { cn } from '@/libs/utils/styling';

interface VerticalDashedLineProps {
	children?: React.ReactNode;
	iconY?: string;
	mask?: [string, string][];
	appIcons?: Record<string, { icon: StaticImageData }>;
	activeIndex?: number | null;
	onIconClick?: (index: number) => void;
	/**
	 * Class name overrides
	 * You can override icon base size using Tailwind arbitrary value: [--icon-base-size:3rem]
	 * You can override active scale using Tailwind arbitrary value: [--icon-active-scale:1.3333]
	 * Example for responsive sizing: [--icon-base-size:1.5rem] sm:[--icon-base-size:3rem]
	 */
	className?: string;
}

const DEFAULT_APP_ICONS: Record<string, { icon: StaticImageData }> = {
	'app-launchpad': {
		icon: AppLaunchpadIcon,
	},
	devbox: {
		icon: DevboxIcon,
	},
	database: {
		icon: DatabaseIcon,
	},
	'ai-proxy': {
		icon: AiProxyIcon,
	},
	'object-storage': {
		icon: ObjectStorageIcon,
	},
};

export function FeaturesDecoLine({
	children,
	iconY = '0.5rem',
	mask,
	appIcons = DEFAULT_APP_ICONS,
	activeIndex,
	onIconClick,
	className,
}: VerticalDashedLineProps) {
	const iconRef = React.useRef<HTMLDivElement>(null);
	const measureRef = React.useRef<HTMLDivElement>(null);
	const probeRef = React.useRef<HTMLDivElement | null>(null);

	const isVisible = useInView(iconRef, {
		margin: '-20% 0px -20% 0px',
		amount: 0.1,
	});
	const maskId = React.useId();

	const [resolvedMaskRects, setResolvedMaskRects] = React.useState<
		Array<{
			x: number;
			y: number;
			width: number;
			height: number;
			cx: number;
			cy: number;
		} | null>
	>([]);
	const [resolvedMaskBaseWidth, setResolvedMaskBaseWidth] = React.useState<number | null>(null);
	const [resolvedAppIcons, setResolvedAppIcons] = React.useState<
		Array<{ centerX: number; centerY: number; size: number } | null>
	>([]);
	const [resolvedLineY10Rem, setResolvedLineY10Rem] = React.useState<number | null>(null);
	const [resolvedLineY9Rem, setResolvedLineY9Rem] = React.useState<number | null>(null);
	const [resolvedIconBox, setResolvedIconBox] = React.useState<{
		x: number;
		y: number;
		size: number;
	} | null>(null);
	const [resolvedMainIconTranslateY, setResolvedMainIconTranslateY] = React.useState<number | null>(null);
	const [resolvedMainIconScale, setResolvedMainIconScale] = React.useState(1);
	const [resolvedMainIconMaskRect, setResolvedMainIconMaskRect] = React.useState<{
		x: number;
		y: number;
		width: number;
		height: number;
		cx: number;
		cy: number;
	} | null>(null);

	const evaluate = React.useCallback((expr: string, prop: 'left' | 'top' | 'width' | 'height') => {
		const container = measureRef.current;
		if (!container) return null;

		let probe = probeRef.current;
		if (!probe) {
			probe = document.createElement('div');
			probe.style.position = 'absolute';
			probe.style.left = '0px';
			probe.style.top = '0px';
			probe.style.width = '0px';
			probe.style.height = '0px';
			probe.style.pointerEvents = 'none';
			probe.style.visibility = 'hidden';
			container.appendChild(probe);
			probeRef.current = probe;
		}

		probe.style.left = '0px';
		probe.style.top = '0px';
		probe.style.width = '0px';
		probe.style.height = '0px';
		probe.style[prop] = expr;

		const raw = getComputedStyle(probe)[prop];
		const value = Number.parseFloat(raw);
		return Number.isFinite(value) ? value : null;
	}, []);

	React.useLayoutEffect(() => {
		const container = measureRef.current;
		if (!container) return;

		let raf = 0;
		const recompute = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const containerWidth = container.clientWidth;
				setResolvedMaskBaseWidth(containerWidth ? containerWidth + 1 : null);
				const centerX = containerWidth / 2;

				const y10 = evaluate('calc(100% - 10rem)', 'top');
				const y9 = evaluate('calc(100% - 9rem)', 'top');
				setResolvedLineY10Rem(y10);
				setResolvedLineY9Rem(y9);

				const mainTranslateY = evaluate(`calc(var(--icon-base-size) / 2 + ${iconY})`, 'top');
				setResolvedMainIconTranslateY(mainTranslateY);

				const baseSize = evaluate('var(--icon-base-size)', 'width');
				const activeSize = evaluate('calc(var(--icon-base-size) * var(--icon-active-scale))', 'width');
				if (baseSize != null) {
					setResolvedIconBox({
						x: -baseSize / 2,
						y: -baseSize / 2,
						size: baseSize,
					});
				}
				if (baseSize != null && activeSize != null && baseSize !== 0) {
					setResolvedMainIconScale(isVisible ? activeSize / baseSize : 1);
				} else {
					setResolvedMainIconScale(1);
				}

				if (baseSize != null && mainTranslateY != null) {
					setResolvedMainIconMaskRect({
						x: centerX - baseSize / 2,
						y: mainTranslateY - baseSize / 2,
						width: baseSize,
						height: baseSize,
						cx: centerX,
						cy: mainTranslateY,
					});
				} else {
					setResolvedMainIconMaskRect(null);
				}

				if (!mask || mask.length === 0) {
					setResolvedMaskRects([]);
				} else {
					const rects: Array<{
						x: number;
						y: number;
						width: number;
						height: number;
						cx: number;
						cy: number;
					} | null> = [];
					for (const [y1, y2] of mask) {
						const centerY = evaluate(`calc((${y1} + ${y2}) / 2)`, 'top');
						const height = evaluate(`calc(${y2} - ${y1})`, 'height');
						const width = baseSize;
						if (centerY == null || height == null || width == null) {
							rects.push(null);
							continue;
						}
						const centerX = containerWidth / 2;
						rects.push({
							x: centerX - width / 2,
							y: centerY - height / 2,
							width,
							height,
							cx: centerX,
							cy: centerY,
						});
					}
					setResolvedMaskRects(rects);
				}

				const appEntries = Object.entries(appIcons);
				const appIconSize = evaluate(
					'clamp(1.5rem, calc(var(--icon-base-size) * 0.5833333), 1.75rem)',
					'width',
				);
				const appIconHalf = appIconSize != null ? appIconSize / 2 : null;
				const appIconCenters: Array<{
					centerX: number;
					centerY: number;
					size: number;
				} | null> = [];

				for (let index = 0; index < appEntries.length; index += 1) {
					if (appIconSize == null || appIconHalf == null) {
						appIconCenters.push(null);
						continue;
					}

					const gaps = appEntries.length > 1 ? appEntries.length - 1 : 1;
					const iconYPos =
						appEntries.length > 1
							? `calc(10rem + 0.875rem + 1rem + calc(calc(100% - 20rem - 2rem - 1.75rem) / ${gaps}) * ${index})`
							: 'calc(10rem + 0.875rem + 1rem)';

					const centerX = containerWidth;
					const centerY = evaluate(iconYPos, 'top');
					if (centerY == null) {
						appIconCenters.push(null);
						continue;
					}

					appIconCenters.push({ centerX, centerY, size: appIconSize });
				}
				setResolvedAppIcons(appIconCenters);
			});
		};

		recompute();

		const ResizeObserverCtor = globalThis.ResizeObserver;
		if (!ResizeObserverCtor) return () => cancelAnimationFrame(raf);

		const ro = new ResizeObserverCtor(recompute);
		ro.observe(container);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, [appIcons, evaluate, iconY, isVisible, mask]);

	return (
		<div
			className={cn(
				'text-brand absolute top-0 left-4 z-0 h-full w-6 overflow-visible [--icon-active-scale:1.3333] [--icon-base-size:2.5rem] sm:left-6 sm:w-12 sm:[--icon-base-size:3rem]',
				className,
			)}
		>
			<div
				ref={measureRef}
				className='pointer-events-none invisible absolute inset-0'
				aria-hidden='true'
			/>
			<svg
				className='h-full w-full'
				preserveAspectRatio='none'
				style={{ overflow: 'visible' }}
				xmlns='http://www.w3.org/2000/svg'
				role='graphics-symbol'
			>
				<defs>
					<mask
						id={maskId}
						maskUnits='userSpaceOnUse'
					>
						<rect
							x='0'
							y='0'
							width={resolvedMaskBaseWidth ?? '100%'}
							height='100%'
							fill='white'
						/>
						{resolvedMainIconMaskRect && (
							<rect
								x={resolvedMainIconMaskRect.x}
								y={resolvedMainIconMaskRect.y}
								width={resolvedMainIconMaskRect.width}
								height={resolvedMainIconMaskRect.height}
								transform={
									resolvedMainIconScale === 1
										? undefined
										: `translate(${resolvedMainIconMaskRect.cx} ${resolvedMainIconMaskRect.cy}) scale(${resolvedMainIconScale}) translate(${-resolvedMainIconMaskRect.cx} ${-resolvedMainIconMaskRect.cy})`
								}
								fill='black'
							/>
						)}
						{mask?.map(([y1, y2], index) => {
							const resolved = resolvedMaskRects[index];
							if (!resolved) return null;

							return (
								<rect
									key={`${y1}-${y2}`}
									x={resolved.x}
									y={resolved.y}
									width={resolved.width}
									height={resolved.height}
									transform={
										resolvedMainIconScale === 1
											? undefined
											: `translate(${resolved.cx} ${resolved.cy}) scale(${resolvedMainIconScale}) translate(${-resolved.cx} ${-resolved.cy})`
									}
									fill='black'
								/>
							);
						})}

						{/* App Icon masks - fixed size, not affected by scale */}
						{Object.entries(appIcons).map(([slug], index) => {
							const resolved = resolvedAppIcons[index];
							if (!resolved) return null;
							return (
								<rect
									key={`icon-mask-${slug}`}
									x={resolved.centerX - resolved.size / 2}
									y={resolved.centerY - resolved.size / 2}
									width={resolved.size}
									height={resolved.size}
									fill='black'
								/>
							);
						})}
					</mask>
				</defs>

				<g>
					<line
						x1='50%'
						y1='0'
						x2='50%'
						y2='9rem'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
					<line
						x1='50%'
						y1='9rem'
						x2='100%'
						y2='10rem'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
					<line
						x1='100%'
						y1='10rem'
						x2='100%'
						y2={resolvedLineY10Rem ?? '100%'}
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
					<line
						x1='100%'
						y1={resolvedLineY10Rem ?? '100%'}
						x2='50%'
						y2={resolvedLineY9Rem ?? '100%'}
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
					<line
						x1='50%'
						y1={resolvedLineY9Rem ?? '100%'}
						x2='50%'
						y2='100%'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
				</g>

				{children && (
					<g
						style={{
							transform: `translate(50%, ${resolvedMainIconTranslateY ?? 0}px)`,
							transformOrigin: '0 0',
						}}
					>
						<foreignObject
							x={resolvedIconBox?.x ?? 0}
							y={resolvedIconBox?.y ?? 0}
							width={resolvedIconBox?.size ?? 0}
							height={resolvedIconBox?.size ?? 0}
							style={
								{
									'--icon-scale': resolvedMainIconScale,
									transform: 'scale(var(--icon-scale))',
									transformOrigin: 'center',
									transformBox: 'fill-box',
									transition: 'transform 300ms',
								} as React.CSSProperties
							}
						>
							<div
								ref={iconRef}
								className={cn(
									'flex h-full items-center justify-center',
									isVisible ? 'text-brand' : 'text-muted-foreground',
								)}
							>
								{children}
							</div>
						</foreignObject>
					</g>
				)}

				{/* App Icons */}
				<g>
					{Object.entries(appIcons).map(([slug, { icon }], index, arr) => {
						// top margin + 50% icon height + inset + (100% - y margins - y offsets - icon height) / gaps * (index - 1)
						const iconYPos = `calc(10rem + 0.875rem + 1rem + calc(calc(100% - 20rem - 2rem - 1.75rem) / ${arr.length - 1}) * ${index})`;
						const resolved = resolvedAppIcons[index];
						// Map icon order to feature index: app-launchpad(0), devbox(1), database(2), ai-proxy(3), object-storage(4)
						const featureIndexMap: Record<string, number> = {
							'app-launchpad': 0,
							devbox: 1,
							database: 2,
							'ai-proxy': 3,
							'object-storage': 4,
						};
						const featureIndex = featureIndexMap[slug] ?? index;
						const isActive = activeIndex === featureIndex;

						return (
							<g
								key={`app-icon-${slug}`}
								style={{
									transform: resolved
										? `translate(${resolved.centerX}px, ${resolved.centerY}px)`
										: `translate(100%, ${iconYPos})`,
									transformOrigin: '0 0',
								}}
							>
								<foreignObject
									x={resolved ? -resolved.size / 2 : '-0.875rem'}
									y={resolved ? -resolved.size / 2 : '-0.875rem'}
									width={resolved ? resolved.size : '1.75rem'}
									height={resolved ? resolved.size : '1.75rem'}
								>
									<button
										type='button'
										onClick={() => onIconClick?.(featureIndex)}
										className={cn(
											'hover:text-brand flex h-full w-full cursor-pointer items-center justify-center transition-colors outline-none focus:outline-none',
											isActive
												? 'text-brand'
												: 'text-muted-foreground/50 focus-visible:text-muted-foreground',
										)}
										aria-label={`切换到${slug}`}
									>
										<Icon
											src={icon}
											className='size-full'
										/>
									</button>
								</foreignObject>
							</g>
						);
					})}
				</g>
			</svg>
		</div>
	);
}
