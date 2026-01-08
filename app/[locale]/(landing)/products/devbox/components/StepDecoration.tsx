import { cn } from '@/libs/utils/styling';

interface StepDecorationProps {
	variant?: 'default' | 'active';
	className?: string;
}

export function StepDecoration({ variant = 'default', className }: StepDecorationProps) {
	const isActive = variant === 'active';

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 88 31'
			width='88'
			height='31'
			className={cn('shrink-0', className)}
			role='graphics-symbol'
		>
			<path
				fill={isActive ? 'var(--color-brand)' : '#f4f4f5'}
				stroke={isActive ? 'var(--color-brand)' : '#605d5d'}
				strokeWidth='.5'
				d='M.85 6.6V2.4L4.5.29l3.65 2.1v4.22L4.5 8.7zM.85 17.6v-4.2l3.65-2.11 3.65 2.1v4.22L4.5 19.7zM.85 28.6v-4.2l3.65-2.11 3.65 2.1v4.22L4.5 30.7z'
			/>
			<path
				stroke={isActive ? 'var(--color-brand)' : '#71717a'}
				strokeDasharray='3 3'
				d='M88 15.5H20'
			/>
		</svg>
	);
}
