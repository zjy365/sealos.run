'use client';

import React from 'react';
import { cn } from '@/libs/utils/styling';

interface VerticalDashedLineProps {
	children?: React.ReactNode;
	iconY?: string;
	mask?: [string, string][];
}

export function VerticalDashedLine({ children, iconY = '0.5rem', mask }: VerticalDashedLineProps) {
	const iconRef = React.useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = React.useState(false);
	const maskId = React.useId();

	React.useEffect(() => {
		if (!iconRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					setIsVisible(entry.isIntersecting);
				}
			},
			{
				rootMargin: '-20% 0px -20% 0px',
				threshold: 0.1,
			},
		);

		observer.observe(iconRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div className='text-brand absolute top-0 left-6 z-0 h-full overflow-visible'>
			<svg
				className='h-full w-12'
				preserveAspectRatio='none'
				style={{ overflow: 'visible' }}
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
									width='3rem'
									height={`calc(${y2} - ${y1})`}
									fill='black'
									transform='translate(-1.5rem, 0)'
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
							transform: `translate(50%, calc(1.5rem + ${iconY}))`,
							transformOrigin: '0 0',
						}}
					>
						<foreignObject
							x='-1.5rem'
							y='-1.5rem'
							width='3rem'
							height='3rem'
							style={{
								transform: isVisible ? 'scale(1.3333)' : 'scale(1)',
								transformOrigin: '0 0',
								transition: 'transform 300ms',
							}}
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
			</svg>
		</div>
	);
}
