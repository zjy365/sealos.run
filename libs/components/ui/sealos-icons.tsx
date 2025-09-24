import type React from 'react';

export const QuestionMarkIcon = (props: React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		stroke='currentColor'
		viewBox='0 0 23 26'
		strokeWidth={2}
		{...props}
	>
		<title>Question mark</title>
		<path d='m1 7.059 10.061-5.71 10.654 6.046v5.7L11.06 19.142v2.608m-2.293 1.6 2.293 1.302 2.294-1.302' />
	</svg>
);

export const RightArrow = (props: React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='currentColor'
		stroke='none'
		viewBox='0 0 27 10'
		{...props}
	>
		<title>Right arrow</title>
		<path d='M.98 5.286c0-.553.567-1 1.267-1h22.806c.7 0 1.267.447 1.267 1s-.567 1-1.267 1H2.247c-.7 0-1.268-.448-1.268-1' />
		<path d='M17.56.74c.426-.438 1.221-.52 1.776-.184l6.493 3.932c.555.336.66.964.233 1.402-.426.438-1.221.52-1.777.184l-6.492-3.932c-.555-.336-.66-.964-.234-1.402' />
	</svg>
);

export const BigRightArrow = (props: React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		stroke='currentColor'
		viewBox='0 0 113 18'
		{...props}
	>
		<title>Right arrow</title>
		<path
			stroke='#fff'
			d='M0 11.5h110.5L91.5.53'
		></path>
	</svg>
);
