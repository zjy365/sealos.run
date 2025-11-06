import type React from 'react';
import { cn } from '@/libs/utils/styling';

export function Table({ children, className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
	return (
		<div className='border-border my-6 overflow-hidden rounded-lg border'>
			<table
				className={cn('w-full text-sm', className)}
				{...props}
			>
				{children}
			</table>
		</div>
	);
}

export function TableHead({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<thead
			className={cn('bg-muted', className)}
			{...props}
		>
			{children}
		</thead>
	);
}

export function TableBody({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tbody
			className={cn('divide-border divide-y', className)}
			{...props}
		>
			{children}
		</tbody>
	);
}

export function TableRow({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr
			className={cn('border-border border-b', className)}
			{...props}
		>
			{children}
		</tr>
	);
}

export function TableHeaderCell({ children, className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
	return (
		<th
			className={cn(
				'border-border text-muted-foreground h-10 border-b px-4 text-left text-sm font-normal',
				className,
			)}
			{...props}
		>
			{children}
		</th>
	);
}

export function TableCell({ children, className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
	return (
		<td
			className={cn('text-foreground h-12 px-4 text-sm', className)}
			{...props}
		>
			{children}
		</td>
	);
}
