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
	 * Icon size in rem (used for foreignObject dimensions and mask width)
	 * @default '3rem'
	 */
	iconSize?: string;
	/**
	 * Width of the SVG container in rem (used for className)
	 * @default '3rem'
	 */
	width?: string;
	/**
	 * Class name overrides
	 */
	className?: string;
}

export function VerticalDashedLine({
	children,
	iconY = '0.5rem',
	mask,
	enableScrollAnimation = false,
	iconSize = '3rem',
	width = '3rem',
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

	// Calculate half of iconSize for positioning
	const iconSizeHalf = React.useMemo(() => {
		const size = parseFloat(iconSize);
		return `${size / 2}rem`;
	}, [iconSize]);

	return (
		<div className={cn('text-brand absolute top-0 left-6 z-0 h-full overflow-visible', className)}>
			<svg
				className='h-full'
				style={{ width, overflow: 'visible' }}
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
							{mask.map(([y1, y2]) => (
								<rect
									key={`${y1}-${y2}`}
									x='0'
									y={y1}
									width={iconSize}
									height={`calc(${y2} - ${y1})`}
									fill='black'
								/>
							))}
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
							transform: `translate(50%, calc(${iconSizeHalf} + ${iconY}))`,
							transformOrigin: '0 0',
						}}
					>
						<foreignObject
							x={`-${iconSizeHalf}`}
							y={`-${iconSizeHalf}`}
							width={iconSize}
							height={iconSize}
							style={{
								transform: enableScrollAnimation && isVisible ? 'scale(1.3333)' : 'scale(1)',
								transformOrigin: '0 0',
								transition: 'transform 300ms',
							}}
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
