'use client';

import React from 'react';

export function StepsSectionLine() {
	const [windowWidth, setWindowWidth] = React.useState(0);

	React.useEffect(() => {
		const updateWidth = () => {
			setWindowWidth(window.innerWidth);
		};

		updateWidth();
		window.addEventListener('resize', updateWidth, { passive: true });

		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	}, []);

	return (
		<div className='text-brand absolute top-54 left-0 -z-10 h-[calc(100%-13.5rem)] overflow-visible pl-6 lg:w-full'>
			{/* Mobile/Tablet: simple left vertical line */}
			<svg
				className='h-full w-full lg:hidden'
				preserveAspectRatio='none'
				style={{ overflow: 'visible' }}
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<line
					x1='1.5rem'
					y1='0'
					x2='1.5rem'
					y2='100%'
					stroke='currentColor'
					strokeWidth='1'
					strokeDasharray='4 4'
					strokeLinecap='round'
				/>
			</svg>
			{/* Desktop: complex path */}
			<svg
				key={windowWidth}
				className='hidden h-full w-full lg:block'
				preserveAspectRatio='none'
				style={{ overflow: 'visible' }}
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<g>
					<line
						x1='calc(50% - 0.75rem)'
						y1='0'
						x2='calc(50% - 0.75rem)'
						y2='calc(100% - 12.75rem)'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
					/>
					<line
						x1='calc(50% - 0.75rem)'
						y1='calc(100% - 12.75rem)'
						x2='calc(50% - 5.5rem)'
						y2='calc(100% - 8rem)'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
					/>
					<line
						x1='calc(50% - 5.5rem)'
						y1='calc(100% - 8rem)'
						x2='5.5rem'
						y2='calc(100% - 8rem)'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
					/>
					<line
						x1='5.5rem'
						y1='calc(100% - 8rem)'
						x2='1.5rem'
						y2='calc(100% - 4rem)'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
					/>
					<line
						x1='1.5rem'
						y1='calc(100% - 4rem)'
						x2='1.5rem'
						y2='100%'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
					/>
				</g>
			</svg>
		</div>
	);
}
