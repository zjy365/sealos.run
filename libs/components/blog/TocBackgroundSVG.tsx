'use client';

type BackgroundSvgProps = {
	path: string;
	width: number;
	height: number;
};

export function TocBackgroundSVG({ path, width, height }: BackgroundSvgProps) {
	const paddedWidth = width + 10; // avoid horizontal clipping from stroke width
	return (
		<svg
			className='pointer-events-none absolute top-0 left-0'
			width={paddedWidth}
			height={height}
			viewBox={`0 0 ${paddedWidth} ${height}`}
			style={{ overflow: 'visible' }}
			role='graphics-symbol'
		>
			<path
				d={path}
				stroke='var(--color-blue-600)'
				strokeWidth={1}
				fill='none'
				strokeDasharray='4 4'
				strokeLinecap='square'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default TocBackgroundSVG;
