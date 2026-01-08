'use client';

import React from 'react';

interface VerticalDashedLineProps {
	children?: React.ReactNode;
	iconY?: string;
	mask?: [string, string][];
}

export function VerticalDashedLine({ children, iconY = '0.5rem', mask }: VerticalDashedLineProps) {
	const maskId = React.useId();

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
							x='-1.25rem'
							y='-1.25rem'
							width='2.5rem'
							height='2.5rem'
							style={{
								transformOrigin: '0 0',
								transition: 'transform 300ms',
							}}
						>
							<div className='text-brand flex h-full items-center justify-center'>{children}</div>
						</foreignObject>
					</g>
				)}
			</svg>
		</div>
	);
}
