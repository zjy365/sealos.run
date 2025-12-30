export function SimpleIcon(
	props: React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement> & { d: string },
) {
	return (
		<svg
			role='graphics-symbol'
			viewBox='0 0 24 24'
			fill='currentColor'
			className='size-full'
			{...props}
			d={undefined}
		>
			<path d={props.d} />
		</svg>
	);
}
