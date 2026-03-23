'use client';

type HighlightSvgProps = {
	path: string;
	width: number;
	height: number;
	gradientId: string;
	gradientStart?: number;
	gradientEnd?: number;
};

export function TocHighlightSVG({
	path,
	width,
	height,
	gradientId,
	gradientStart = 0,
	gradientEnd = 100,
}: HighlightSvgProps) {
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
			<defs>
				<linearGradient
					id={gradientId}
					x1='0%'
					y1='0%'
					x2='0%'
					y2='100%'
				>
					<stop
						offset='0%'
						stopColor='rgb(59 130 246)'
						stopOpacity='0'
						style={{ transition: 'offset 200ms ease, stop-opacity 200ms ease' }}
					/>
					<stop
						offset={`${gradientStart}%`}
						stopColor='rgb(59 130 246)'
						stopOpacity='0'
						style={{ transition: 'offset 200ms ease, stop-opacity 200ms ease' }}
					/>
					<stop
						offset={`${gradientEnd}%`}
						stopColor='rgb(59 130 246)'
						stopOpacity='1'
						style={{ transition: 'offset 200ms ease, stop-opacity 200ms ease' }}
					/>
					<stop
						offset={`${gradientEnd}%`}
						stopColor='rgb(59 130 246)'
						stopOpacity='0'
						style={{ transition: 'offset 200ms ease, stop-opacity 200ms ease' }}
					/>
					<stop
						offset='100%'
						stopColor='rgb(59 130 246)'
						stopOpacity='0'
						style={{ transition: 'offset 200ms ease, stop-opacity 200ms ease' }}
					/>
				</linearGradient>
			</defs>
			<path
				d={path}
				stroke={`url(#${gradientId})`}
				strokeWidth={5}
				fill='none'
				strokeLinecap='square'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default TocHighlightSVG;
