'use client';

import { animate, motion, useMotionValue } from 'motion/react';
import React from 'react';
import { cn } from '@/libs/utils/styling';
import { Input } from './input';

export type ShinyInputProps = {
	inputProps?: React.ComponentProps<typeof Input>;
};

export function ShinyInput({ inputProps }: ShinyInputProps) {
	const [focused, setFocused] = React.useState(false);
	const color = 'var(--color-blue-600)';

	// [TODO] Specify in props
	// Geometry
	const INSET = 3;
	const SEG_LEN = 120; // px
	const SPEED = 360; // px/s

	// Refs & anim
	const svgRef = React.useRef<SVGSVGElement | null>(null);
	const [perimeter, setPerimeter] = React.useState(0);
	const offset = useMotionValue(0); // strokeDashoffset controller
	const opacity = useMotionValue(0); // glow opacity
	const loopAnim = React.useRef<ReturnType<typeof animate> | null>(null);
	const fadeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	// Measure perimeter (px)
	React.useEffect(() => {
		const el = svgRef.current;
		if (!el) return;
		const calc = () => {
			const rect = el.getBoundingClientRect();
			const w = Math.max(0, rect.width - INSET * 2);
			const h = Math.max(0, rect.height - INSET * 2);
			const p = 2 * (w + h);
			setPerimeter(p);
		};
		calc();
		const ro = new ResizeObserver(calc);
		ro.observe(el);

		return () => ro.disconnect();
	}, []);

	const startLoop = React.useCallback(() => {
		if (!perimeter) return;
		loopAnim.current?.stop();
		const now = offset.get();
		const dur = perimeter / SPEED;
		loopAnim.current = animate(offset, [now, now - perimeter], {
			duration: dur,
			ease: 'linear',
			repeat: Infinity,
			repeatType: 'loop',
		});
	}, [offset, perimeter]);

	// Focus / blur
	React.useEffect(() => {
		if (focused) {
			if (fadeTimer.current) {
				clearTimeout(fadeTimer.current);
				fadeTimer.current = null;
			}
			animate(opacity, 1, { duration: 0.25 });
			startLoop();
		} else {
			// keep moving while fading out; stop after fade completes
			animate(opacity, 0, { duration: 0.25 });
			fadeTimer.current = setTimeout(() => {
				loopAnim.current?.stop();
				loopAnim.current = null;
			}, 250);
		}
		return () => {
			if (fadeTimer.current) {
				clearTimeout(fadeTimer.current);
				fadeTimer.current = null;
			}
		};
	}, [focused, opacity, startLoop]);

	// Keep speed after resize without phase jump
	React.useEffect(() => {
		if (perimeter && focused) startLoop();
	}, [perimeter, focused, startLoop]);

	// Single visible segment
	const dashArray = React.useMemo(() => {
		return `${SEG_LEN} ${Math.max(1, Math.round(Math.max(0, perimeter - SEG_LEN)))}`;
	}, [perimeter]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: This is for vfx only
		<div
			className='relative w-full'
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
		>
			{/* Input */}
			<div className='relative'>
				<Input
					{...inputProps}
					className={cn(
						'h-14 w-full rounded-none border-none bg-transparent px-6 text-lg shadow-none focus-visible:ring-0',
						inputProps?.className,
					)}
				/>
			</div>

			{/* Dashed border */}
			<svg
				role='graphics-symbol'
				className='pointer-events-none absolute inset-0 h-full w-full'
				xmlns='http://www.w3.org/2000/svg'
				preserveAspectRatio='none'
			>
				<rect
					x={INSET}
					y={INSET}
					width={`calc(100% - ${INSET * 2}px)`}
					height={`calc(100% - ${INSET * 2}px)`}
					fill='none'
					stroke={color}
					strokeWidth='1'
					strokeDasharray='4 4'
					vectorEffect='non-scaling-stroke'
				/>
				<rect
					x='0.5'
					y='0.5'
					width='5'
					height='5'
					fill={color}
					vectorEffect='non-scaling-stroke'
				/>
				<rect
					x='calc(100% - 5.5px)'
					y='0.5'
					width='5'
					height='5'
					fill={color}
					vectorEffect='non-scaling-stroke'
				/>
				<rect
					x='0.5'
					y='calc(100% - 5.5px)'
					width='5'
					height='5'
					fill={color}
					vectorEffect='non-scaling-stroke'
				/>
				<rect
					x='calc(100% - 5.5px)'
					y='calc(100% - 5.5px)'
					width='5'
					height='5'
					fill={color}
					vectorEffect='non-scaling-stroke'
				/>
			</svg>

			{/* Glow segment */}
			<motion.svg
				ref={svgRef}
				role='graphics-symbol'
				className='pointer-events-none absolute inset-0 h-full w-full'
				xmlns='http://www.w3.org/2000/svg'
				preserveAspectRatio='none'
			>
				<defs>
					{/** biome-ignore lint/correctness/useUniqueElementIds: SVG */}
					<linearGradient
						id='segment'
						x1='0'
						y1='0'
						x2='100%'
						y2='100%'
						gradientUnits='userSpaceOnUse'
					>
						<stop
							offset='0%'
							stopColor='white'
						/>
						<stop
							offset='25%'
							stopColor={color}
						/>
						<stop
							offset='50%'
							stopColor='white'
						/>
						<stop
							offset='75%'
							stopColor={color}
						/>
					</linearGradient>
				</defs>

				<motion.rect
					x={INSET}
					y={INSET}
					width={`calc(100% - ${INSET * 2}px)`}
					height={`calc(100% - ${INSET * 2}px)`}
					fill='none'
					stroke={`url(#segment)`}
					strokeWidth='2'
					vectorEffect='non-scaling-stroke'
					strokeDasharray={dashArray}
					style={{
						strokeDashoffset: offset,
						opacity,
					}}
				/>
			</motion.svg>
		</div>
	);
}
