export function ArchSceneDecoLine({ text, variant }: { text: string; variant: 'left' | 'right' }) {
	return (
		<svg
			width={187}
			height={331}
			role='graphics-symbol'
		>
			<foreignObject
				width={187}
				height={34}
				x={0}
				y={181}
			>
				<svg
					fill='none'
					viewBox='0 0 187 34'
					role='graphics-symbol'
				>
					<path
						stroke='#005bff'
						strokeDasharray='3 3'
						d={
							variant === 'right'
								? 'M0 33.5h22.11l1.07-33H44.4l1.5 33H187'
								: 'M187 33.5h-22.11l-1.07-33H142.6l-1.5 33H0'
						}
					/>
					<text
						fill='#005bff'
						textAnchor='middle'
						fontSize='20'
						fontWeight='500'
						letterSpacing='0em'
					>
						<tspan
							x={variant === 'right' ? '114.98' : '70.98'}
							y='26.6'
						>
							{text}
						</tspan>
					</text>
				</svg>
			</foreignObject>
		</svg>
	);
}
