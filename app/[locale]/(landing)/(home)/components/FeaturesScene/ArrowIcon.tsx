import type { ArrowDirection } from '../../utils/features-config.types';

export function ArrowIcon({
	size = 8,
	height,
	width,
	direction = 'down',
}: {
	size?: number;
	height?: number;
	width?: number;
	direction?: ArrowDirection;
}) {
	const isHorizontal = direction === 'left' || direction === 'right';
	const arrowLength = isHorizontal ? (width ?? size) : (height ?? size);
	const arrowWidth = isHorizontal ? (height ?? size) : (width ?? size);
	const centerX = arrowWidth / 2;
	const centerY = arrowLength / 2;
	const arrowHeadSize = 2;

	const getLineCoords = () => {
		switch (direction) {
			case 'down':
				return {
					x1: centerX,
					y1: 0,
					x2: centerX,
					y2: arrowLength - arrowHeadSize,
				};
			case 'up':
				return {
					x1: centerX,
					y1: arrowLength,
					x2: centerX,
					y2: arrowHeadSize,
				};
			case 'right':
				return {
					x1: 0,
					y1: centerY,
					x2: arrowLength - arrowHeadSize,
					y2: centerY,
				};
			case 'left':
				return {
					x1: arrowLength,
					y1: centerY,
					x2: arrowHeadSize,
					y2: centerY,
				};
		}
	};

	const getArrowHeadPath = () => {
		switch (direction) {
			case 'down':
				return `M${centerX - arrowHeadSize} ${arrowLength - arrowHeadSize}L${centerX} ${arrowLength}L${centerX + arrowHeadSize} ${arrowLength - arrowHeadSize}`;
			case 'up':
				return `M${centerX - arrowHeadSize} ${arrowHeadSize}L${centerX} 0L${centerX + arrowHeadSize} ${arrowHeadSize}`;
			case 'right':
				return `M${arrowLength - arrowHeadSize} ${centerY - arrowHeadSize}L${arrowLength} ${centerY}L${arrowLength - arrowHeadSize} ${centerY + arrowHeadSize}`;
			case 'left':
				return `M${arrowHeadSize} ${centerY - arrowHeadSize}L0 ${centerY}L${arrowHeadSize} ${centerY + arrowHeadSize}`;
		}
	};

	const coords = getLineCoords();
	const arrowPath = getArrowHeadPath();

	return (
		<svg
			width={isHorizontal ? arrowLength : arrowWidth}
			height={isHorizontal ? arrowWidth : arrowLength}
			viewBox={`0 0 ${isHorizontal ? arrowLength : arrowWidth} ${isHorizontal ? arrowWidth : arrowLength}`}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<line
				x1={coords.x1}
				y1={coords.y1}
				x2={coords.x2}
				y2={coords.y2}
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeDasharray='2 2'
			/>
			<path
				d={arrowPath}
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	);
}
