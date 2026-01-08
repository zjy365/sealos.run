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
		<div className='text-brand absolute top-54 -z-10 h-[calc(100%-13.5rem)] w-full overflow-visible'>
			<svg
				key={windowWidth}
				className='h-full w-full'
				preserveAspectRatio='none'
				style={{ overflow: 'visible' }}
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<g>
					<line
						x1='calc(50% - 1.5rem)'
						y1='0'
						x2='calc(50% - 1.5rem)'
						y2='calc(100% - 12rem)'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
					/>
					<line
						x1='calc(50% - 1.5rem)'
						y1='calc(100% - 12rem)'
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
