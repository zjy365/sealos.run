import type React from 'react';
import { cn } from '@/libs/utils/styling';

interface CalloutProps {
	children: React.ReactNode;
	type?: 'info' | 'warning' | 'danger' | 'success';
	title?: string;
}

export function Callout({ children, type = 'info', title }: CalloutProps) {
	return (
		<div
			className={cn(
				'my-6 flex flex-col gap-2 border border-dashed p-4',
				type === 'info' && 'border-primary',
				type === 'warning' && 'border-yellow-500 dark:border-yellow-400',
				type === 'danger' && 'border-destructive',
				type === 'success' && 'border-green-500 dark:border-green-400',
			)}
		>
			{title && (
				<div className='flex items-center gap-2'>
					<svg
						role='img'
						aria-label={title || 'Callout icon'}
						className='size-6'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>{title || 'Callout'}</title>
						<path
							d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z'
							fill='currentColor'
							className={cn(
								type === 'info' && 'text-primary',
								type === 'warning' && 'text-yellow-500 dark:text-yellow-400',
								type === 'danger' && 'text-destructive',
								type === 'success' && 'text-green-500 dark:text-green-400',
							)}
						/>
					</svg>
					<p className='text-foreground text-base font-medium'>{title}</p>
				</div>
			)}
			<div className='text-muted-foreground text-sm leading-5'>{children}</div>
		</div>
	);
}
