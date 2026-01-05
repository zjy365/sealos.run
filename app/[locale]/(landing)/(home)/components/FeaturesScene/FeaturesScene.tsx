'use client';

import React from 'react';
import { DefaultAppIcon } from '../DefaultAppIcon';
import { AppBoxSvg } from './AppBoxSvg';

type AppBoxState = 'idle' | 'hover' | 'active';

interface BoxConfig {
	position: { x: number; y: number };
	// Idle state colors
	idleBgColor: string;
	idleStrokeColor: string;
	idleFrameGradient: { from: string; to: string };
	// Active state colors
	activeBgGradient: { from: string; to: string };
	activeFrameGradient: { from: string; to: string };
	activeStroke: string;
	title: string;
}

export const FeaturesScene: React.FC = () => {
	const id = React.useId();
	const floorGradientId = `${id}-floor-gradient`;
	const floorClipId = `${id}-floor-clip`;
	const [activeBoxIndex, setActiveBoxIndex] = React.useState<number | null>(null);
	const [hoverBoxIndex, setHoverBoxIndex] = React.useState<number | null>(null);

	// Unified offset for manual alignment adjustment
	const offsetX = 1;
	const offsetY = -24;

	// Box configuration data: five boxes with positions and styles
	const boxes: BoxConfig[] = [
		{
			// Top midpoint (top edge center)
			position: { x: 131 + offsetX, y: 30 + offsetY },
			idleBgColor: 'hsla(0, 0%, 98%, 1)',
			idleStrokeColor: 'hsla(237, 26%, 59%, 0.3)',
			idleFrameGradient: { from: 'hsla(221, 59%, 44%, 1)', to: 'hsla(0, 0%, 100%, 0)' },
			activeBgGradient: { from: '#E0E0EB', to: '#F6F6F6' },
			activeFrameGradient: { from: '#182474', to: 'white' },
			activeStroke: '#CBCBDB',
			title: 'Application Box 1',
		},
		{
			// Left midpoint (left edge center)
			position: { x: -4 + offsetX, y: 103 + offsetY },
			idleBgColor: 'hsla(0, 0%, 96%, 1)',
			idleStrokeColor: 'hsla(237, 26%, 59%, 0.3)',
			idleFrameGradient: { from: 'hsla(221, 59%, 44%, 1)', to: 'hsla(0, 0%, 100%, 0)' },
			activeBgGradient: { from: '#E0E0EB', to: '#F6F6F6' },
			activeFrameGradient: { from: '#182474', to: 'white' },
			activeStroke: '#CBCBDB',
			title: 'Application Box 2',
		},
		{
			// Center
			position: { x: 131 + offsetX, y: 103 + offsetY },
			idleBgColor: 'hsla(0, 0%, 97%, 1)',
			idleStrokeColor: 'hsla(237, 26%, 59%, 0.3)',
			idleFrameGradient: { from: 'hsla(221, 59%, 44%, 1)', to: 'hsla(0, 0%, 100%, 0)' },
			activeBgGradient: { from: '#E0E0EB', to: '#F6F6F6' },
			activeFrameGradient: { from: '#182474', to: 'white' },
			activeStroke: '#CBCBDB',
			title: 'Application Box 3',
		},
		{
			// Right midpoint (right edge center)
			position: { x: 266 + offsetX, y: 103 + offsetY },
			idleBgColor: 'hsla(0, 0%, 95%, 1)',
			idleStrokeColor: 'hsla(237, 26%, 59%, 0.3)',
			idleFrameGradient: { from: 'hsla(221, 59%, 44%, 1)', to: 'hsla(0, 0%, 100%, 0)' },
			activeBgGradient: { from: '#E0E0EB', to: '#F6F6F6' },
			activeFrameGradient: { from: '#182474', to: 'white' },
			activeStroke: '#CBCBDB',
			title: 'Application Box 4',
		},
		{
			// Bottom midpoint (bottom edge center)
			position: { x: 131.5 + offsetX, y: 180 + offsetY },
			idleBgColor: 'hsla(0, 0%, 99%, 1)',
			idleStrokeColor: 'hsla(237, 26%, 59%, 0.3)',
			idleFrameGradient: { from: 'hsla(221, 59%, 44%, 1)', to: 'hsla(0, 0%, 100%, 0)' },
			activeBgGradient: { from: '#E0E0EB', to: '#F6F6F6' },
			activeFrameGradient: { from: '#182474', to: 'white' },
			activeStroke: '#CBCBDB',
			title: 'Application Box 5',
		},
	];

	const getBoxState = (index: number): AppBoxState => {
		if (activeBoxIndex === index) return 'active';
		if (hoverBoxIndex === index) return 'hover';
		return 'idle';
	};

	const handleBoxPointerEnter = (index: number) => {
		if (activeBoxIndex !== index) {
			setHoverBoxIndex(index);
		}
	};

	const handleBoxPointerLeave = (index: number) => {
		if (activeBoxIndex !== index) {
			setHoverBoxIndex(null);
		}
	};

	const handleBoxClick = (index: number) => {
		setActiveBoxIndex(activeBoxIndex === index ? null : index);
		setHoverBoxIndex(null);
	};

	const handleBoxKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			setActiveBoxIndex(activeBoxIndex === index ? null : index);
			setHoverBoxIndex(null);
		}
	};

	return (
		<div
			className='relative inline-block'
			style={{ aspectRatio: '414 / 367', height: '367px' }}
		>
			<svg
				viewBox='0 0 414 367'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='absolute inset-0'
			>
				<title>Features Floor</title>
				{/* Floor SVG content */}
				<g
					stroke='#e9ebff'
					strokeDasharray='0.5 15'
					strokeLinecap='round'
					strokeWidth='2'
				>
					<path
						d='M1-1h213.46'
						transform='rotate(-29.85 656 -243.66)skewX(.7)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 195.88 286.97)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 183.47 279.77)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 171.06 272.57)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 158.65 265.38)'
					/>
					<path
						d='M1-1h213.46'
						transform='rotate(-30.56 545.7 -138.6)skewY(.7)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 133.83 250.98)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 121.42 243.79)'
					/>
					<path
						d='M1-1h213.46'
						transform='rotate(-29.85 498.34 -86.2)skewX(.7)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 96.6 229.4)'
					/>
					<path
						d='M1-1h213.46'
						transform='rotate(-30.56 448.81 -43)skewY(.7)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 71.78 215)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 59.37 207.8)'
					/>
					<path
						d='M1-1h213.46'
						transform='rotate(-29.85 399.8 12.2)skewX(.7)'
					/>
					<path
						d='M1-1h213.46'
						transform='matrix(.87 -.5 .5 .86 34.16 193.4)'
					/>
					<path
						d='M1-1h213.46'
						transform='rotate(-29.85 359 52.7)skewX(.7)'
					/>
				</g>
				<path
					stroke={`url(#${floorGradientId})`}
					strokeWidth='.5'
					d='m167.8 91.57 40.52-25.14 37.41 25.14M376 165.16l37.51 20.77m0 0v63.37m0-63.37-37.51 23.06M37.66 165.6.5 185.93m0 0v52.47m0-52.47 37.16 20.97m133.76 76.37 36.9 22.02m0 0 37.41-22.71m-37.4 22.71v60.9'
				/>
				<g clipPath={`url(#${floorClipId})`}>
					<path
						fill='#8d8d8d'
						fillRule='evenodd'
						d='M304.58 260.42c.25-.16.44-.05.43.24l-.08 3.13 2.65-1.66c.24-.16.44-.05.43.24s-.21.65-.46.8l-2.65 1.67-.08 3.13c-.01.28-.22.64-.46.8-.25.15-.44.04-.43-.25l.09-3.13-2.65 1.67c-.25.15-.44.04-.43-.25 0-.29.2-.64.45-.8l2.65-1.66.09-3.13c0-.29.21-.65.45-.8'
						clipRule='evenodd'
					/>
				</g>
				<text
					xmlSpace='preserve'
					fill='#8d8d8d'
					fontFamily='PingFang SC'
					fontSize='12'
					letterSpacing='0em'
					style={{ whiteSpace: 'pre' }}
					transform='matrix(.85 -.53 -.03 1 313.3 249.98)'
				>
					<tspan
						x='0'
						y='12.82'
					>
						更多
					</tspan>
				</text>
				<defs>
					<linearGradient
						id={floorGradientId}
						x1='207'
						x2='207'
						y1='57.7'
						y2='374.06'
						gradientUnits='userSpaceOnUse'
					>
						<stop
							offset='.21'
							stopColor='#dfdfdf'
						/>
						<stop
							offset='.81'
							stopColor='#005bff'
						/>
					</linearGradient>
					<clipPath id={floorClipId}>
						<path
							fill='#fff'
							d='m299.34 261.66 10.6-6.66-.33 12.52L299 274.2z'
						/>
					</clipPath>
				</defs>
			</svg>
			{/* Five AppBoxSvg components positioned absolutely */}
			{boxes.map((box, index) => {
				const state = getBoxState(index);
				const height = state === 'idle' ? 0.333 : state === 'hover' ? 0.333 : 1;
				const boxKey = `app-box-${box.position.x}-${box.position.y}`;

				return (
					<button
						key={boxKey}
						type='button'
						className='absolute border-0 bg-transparent p-0'
						style={{
							left: `${box.position.x}px`,
							top: `${box.position.y}px`,
							cursor: 'pointer',
						}}
						onPointerEnter={() => handleBoxPointerEnter(index)}
						onPointerLeave={() => handleBoxPointerLeave(index)}
						onClick={() => handleBoxClick(index)}
						onKeyDown={(e) => handleBoxKeyDown(index, e)}
					>
						<AppBoxSvg
							height={height}
							boxBgGradient={box.activeBgGradient}
							boxFrameGradient={box.activeFrameGradient}
							boxStroke={box.activeStroke}
							defaultBgColor={box.idleBgColor}
							defaultStrokeColor={box.idleStrokeColor}
							defaultFrameGradient={box.idleFrameGradient}
							title={box.title}
							state={state}
						>
							<DefaultAppIcon />
						</AppBoxSvg>
					</button>
				);
			})}
		</div>
	);
};

export default FeaturesScene;
