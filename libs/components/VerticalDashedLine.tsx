'use client';

import { useInView } from 'motion/react';
import React from 'react';
import { cn } from '../utils/styling';

interface VerticalDashedLineProps {
	children?: React.ReactNode;
	iconY?: string;
	mask?: [string, string][];
	/**
	 * Whether to enable scroll animation for the icon
	 * @default false
	 */
	enableScrollAnimation?: boolean;
	/**
	 * Class name overrides
	 * You can override icon base size using Tailwind arbitrary value: [--icon-base-size:3rem]
	 * You can override active scale using Tailwind arbitrary value: [--icon-active-scale:1.3333]
	 * Example for responsive sizing: [--icon-base-size:1.5rem] sm:[--icon-base-size:3rem]
	 */
	className?: string;
}

export function VerticalDashedLine({
	children,
	iconY = '0rem',
	mask,
	enableScrollAnimation = false,
	className,
}: VerticalDashedLineProps) {
	const iconRef = React.useRef<HTMLDivElement>(null);
	const measureRef = React.useRef<HTMLDivElement>(null);
	const probeRef = React.useRef<HTMLDivElement | null>(null);

	// Always call useInView hook, but only use result when enableScrollAnimation is true
	const inViewResult = useInView(iconRef, {
		margin: '-20% 0px -20% 0px',
		amount: 0.1,
	});
	const isVisible = enableScrollAnimation ? inViewResult : false;
	const maskId = React.useId();
	const isActive = enableScrollAnimation && isVisible;

	const [resolvedScale, setResolvedScale] = React.useState(1);
	const [resolvedIconTranslateY, setResolvedIconTranslateY] = React.useState<number | null>(null);
	const [resolvedIconMaskRect, setResolvedIconMaskRect] = React.useState<{
		x: number;
		y: number;
		width: number;
		height: number;
		cx: number;
		cy: number;
	} | null>(null);
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
	const [resolvedIconBox, setResolvedIconBox] = React.useState<{
		x: number;
		y: number;
		size: number;
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

		// Reset to avoid cross-property influence
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
		void isActive;

		let raf = 0;
		const recompute = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const baseSize = evaluate('var(--icon-base-size)', 'width');
				const activeSize = evaluate('calc(var(--icon-base-size) * var(--icon-active-scale))', 'width');

				if (baseSize != null) {
					setResolvedIconBox({
						x: -baseSize / 2,
						y: -baseSize / 2,
						size: baseSize,
					});
				}

				const translateY = evaluate(`calc(var(--icon-base-size) / 2 + ${iconY})`, 'top');
				setResolvedIconTranslateY(translateY);

				const containerWidth = container.clientWidth;
				const centerX = containerWidth / 2;
				if (baseSize != null && translateY != null) {
					setResolvedIconMaskRect({
						x: centerX - baseSize / 2,
						y: translateY - baseSize / 2,
						width: baseSize,
						height: baseSize,
						cx: centerX,
						cy: translateY,
					});
				} else {
					setResolvedIconMaskRect(null);
				}

				if (baseSize != null && activeSize != null && baseSize !== 0) {
					setResolvedScale(isActive ? activeSize / baseSize : 1);
				} else {
					setResolvedScale(1);
				}

				if (!mask || mask.length === 0) {
					setResolvedMaskRects([]);
					return;
				}

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

					const x = centerX - width / 2;
					const y = centerY - height / 2;
					rects.push({ x, y, width, height, cx: centerX, cy: centerY });
				}
				setResolvedMaskRects(rects);
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
	}, [evaluate, iconY, isActive, mask]);

	return (
		<div
			className={cn(
				'text-brand absolute top-0 left-4 z-0 h-full w-8 overflow-visible [--icon-active-scale:1.3333] [--icon-base-size:2.5rem] sm:left-6 sm:w-12 sm:[--icon-base-size:3rem]',
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
				style={{ overflow: 'visible' }}
				preserveAspectRatio='none'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				{(resolvedIconMaskRect || (mask && mask.length > 0)) && (
					<defs>
						<mask
							id={maskId}
							maskUnits='userSpaceOnUse'
						>
							<rect
								x='0'
								y='0'
								width='100%'
								height='100%'
								fill='white'
							/>
							{resolvedIconMaskRect && (
								<rect
									x={resolvedIconMaskRect.x}
									y={resolvedIconMaskRect.y}
									width={resolvedIconMaskRect.width}
									height={resolvedIconMaskRect.height}
									transform={
										resolvedScale === 1
											? undefined
											: `translate(${resolvedIconMaskRect.cx} ${resolvedIconMaskRect.cy}) scale(${resolvedScale}) translate(${-resolvedIconMaskRect.cx} ${-resolvedIconMaskRect.cy})`
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
											resolvedScale === 1
												? undefined
												: `translate(${resolved.cx} ${resolved.cy}) scale(${resolvedScale}) translate(${-resolved.cx} ${-resolved.cy})`
										}
										fill='black'
									/>
								);
							})}
						</mask>
					</defs>
				)}
				<line
					x1='50%'
					y1='0'
					x2='50%'
					y2='100%'
					stroke='currentColor'
					strokeWidth='1'
					strokeDasharray='4 4'
					strokeLinecap='round'
					mask={resolvedIconMaskRect || (mask && mask.length > 0) ? `url(#${maskId})` : undefined}
				/>

				{children && (
					<g
						style={{
							transform: `translate(50%, ${resolvedIconTranslateY ?? 0}px)`,
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
									'--icon-scale': resolvedScale,
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
									enableScrollAnimation
										? isVisible
											? 'text-brand'
											: 'text-muted-foreground'
										: 'text-brand',
								)}
							>
								{children}
							</div>
						</foreignObject>
					</g>
				)}
			</svg>
		</div>
	);
}
