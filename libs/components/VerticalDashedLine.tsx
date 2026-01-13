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
	 * You can override icon size using Tailwind arbitrary value: [--icon-size:3rem] (default: 3rem)
	 * You can override base scale using Tailwind arbitrary value: [--icon-scale-base:1] (default: 1)
	 * You can override active scale using Tailwind arbitrary value: [--icon-scale-active:1.3333] (default: 1.3333)
	 * Example for responsive scaling: [--icon-scale-base:0.8] sm:[--icon-scale-base:1]
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
	// Always call useInView hook, but only use result when enableScrollAnimation is true
	const inViewResult = useInView(iconRef, {
		margin: '-20% 0px -20% 0px',
		amount: 0.1,
	});
	const isVisible = enableScrollAnimation ? inViewResult : false;
	const maskId = React.useId();

	// Calculate current scale for mask (base scale * active scale if visible, otherwise base scale)
	const currentScale =
		enableScrollAnimation && isVisible
			? 'calc(var(--icon-scale-base) * var(--icon-scale-active))'
			: 'var(--icon-scale-base)';

	return (
		<div
			className={cn(
				'text-brand absolute top-0 left-6 z-0 h-full w-12 overflow-visible [--icon-scale-active:1.3333] [--icon-scale-base:1] [--icon-size:3rem]',
				className,
			)}
			style={{ '--icon-scale-current': currentScale } as React.CSSProperties}
		>
			<svg
				className='h-full w-full'
				style={{ overflow: 'visible' }}
				preserveAspectRatio='none'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				{mask && mask.length > 0 && (
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
							{mask.map(([y1, y2]) => {
								// Scale from center: calculate center position, then offset by half of scaled dimensions
								const centerY = `(${y1} + ${y2}) / 2`;
								const height = `${y2} - ${y1}`;
								const scaledHeight = `(${height}) * var(--icon-scale-current)`;
								const scaledY = `(${centerY}) - (${scaledHeight}) / 2`;
								const scaledWidth = `var(--icon-size) * var(--icon-scale-current)`;
								const scaledX = `50% - (${scaledWidth}) / 2`;

								return (
									<rect
										key={`${y1}-${y2}`}
										x={`calc(${scaledX})`}
										y={`calc(${scaledY})`}
										width={`calc(${scaledWidth})`}
										height={`calc(${scaledHeight})`}
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
					mask={mask && mask.length > 0 ? `url(#${maskId})` : undefined}
				/>

				{children && (
					<g
						style={{
							transform: `translate(50%, calc(calc(var(--icon-size) * var(--icon-scale-base)) / 2 + ${iconY}))`,
							transformOrigin: '0 0',
						}}
					>
						<foreignObject
							x='calc(calc(var(--icon-size) * var(--icon-scale-base)) / -2)'
							y='calc(calc(var(--icon-size) * var(--icon-scale-base)) / -2)'
							width='calc(var(--icon-size) * var(--icon-scale-base))'
							height='calc(var(--icon-size) * var(--icon-scale-base))'
							style={
								{
									'--icon-scale':
										enableScrollAnimation && isVisible ? 'var(--icon-scale-active)' : '1',
									transform: 'scale(var(--icon-scale))',
									transformOrigin: '0 0',
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
