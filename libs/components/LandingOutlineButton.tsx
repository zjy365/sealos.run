import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import { FlatArrowRightIcon } from '@/assets/icons';
import { Link } from '../i18n/navigation';
import { cn } from '../utils/styling';
import { Button } from './ui/button';
import { Icon } from './ui/icon';

const landingOutlineButtonVariants = cva(
	'group border-foreground hover:text-brand hover:border-brand rounded-full border bg-transparent shadow-none backdrop-blur-sm transition-colors',
	{
		variants: {
			size: {
				md: 'h-11 gap-4 px-4 pr-2',
				lg: 'h-14 gap-6 px-6 pr-2 text-xl',
			},
			borderStyle: {
				solid: 'border-solid',
				dashed: 'border-dashed',
			},
		},
		defaultVariants: {
			size: 'md',
			borderStyle: 'solid',
		},
	},
);

const iconContainerVariants = cva(
	'bg-foreground text-background group-hover:bg-brand group-hover:border-brand flex aspect-square items-center justify-center rounded-full transition-colors',
	{
		variants: {
			size: {
				md: 'h-8 w-8',
				lg: 'h-10 w-10',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

const iconSizeMap = {
	md: 'size-4',
	lg: 'size-6',
} as const;

export interface LandingOutlineButtonProps {
	children: React.ReactNode;
	href: string;
	size?: VariantProps<typeof landingOutlineButtonVariants>['size'];
	borderStyle?: VariantProps<typeof landingOutlineButtonVariants>['borderStyle'];
	icon?: React.ReactNode;
	iconClassName?: string;
	iconContainerClassName?: string;
	iconColor?: string;
	className?: string;
}

export function LandingOutlineButton({
	children,
	href,
	size = 'md',
	borderStyle = 'solid',
	icon = (
		<Icon
			src={FlatArrowRightIcon}
			className='size-full'
		/>
	),
	iconClassName,
	iconContainerClassName,
	iconColor,
	className,
}: LandingOutlineButtonProps) {
	return (
		<Button
			variant='ghost'
			className={cn(landingOutlineButtonVariants({ size, borderStyle }), className)}
			asChild
		>
			<Link href={href}>
				<span>{children}</span>
				<div
					className={cn(iconContainerVariants({ size }), iconContainerClassName)}
					style={iconColor ? { color: iconColor } : undefined}
				>
					<div className={cn(iconSizeMap[size ?? 'md'], iconClassName)}>{icon}</div>
				</div>
			</Link>
		</Button>
	);
}
