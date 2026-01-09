import { cva, type VariantProps } from 'class-variance-authority';
import type { StaticImageData } from 'next/image';
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
				md: 'h-11 gap-4',
				lg: 'h-14 gap-6 text-xl',
			},
			borderStyle: {
				solid: 'border-solid',
				dashed: 'border-dashed',
			},
			showIcon: {
				true: '',
				false: '',
			},
		},
		compoundVariants: [
			{
				size: 'md',
				showIcon: true,
				className: 'px-4 pr-2',
			},
			{
				size: 'md',
				showIcon: false,
				className: 'px-4',
			},
			{
				size: 'lg',
				showIcon: true,
				className: 'px-6 pr-2',
			},
			{
				size: 'lg',
				showIcon: false,
				className: 'px-6',
			},
		],
		defaultVariants: {
			size: 'md',
			borderStyle: 'solid',
			showIcon: true,
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
	icon?: StaticImageData;
	showIcon?: boolean;
	iconContainerClassName?: string;
	iconColor?: string;
	className?: string;
}

export function LandingOutlineButton({
	children,
	href,
	size = 'md',
	borderStyle = 'solid',
	icon,
	showIcon = true,
	iconContainerClassName,
	iconColor,
	className,
}: LandingOutlineButtonProps) {
	const displayIcon = icon ?? FlatArrowRightIcon;

	return (
		<Button
			variant='ghost'
			className={cn(landingOutlineButtonVariants({ size, borderStyle, showIcon }), className)}
			asChild
		>
			<Link href={href}>
				<span>{children}</span>
				{showIcon && (
					<div
						className={cn(iconContainerVariants({ size }), iconContainerClassName)}
						style={iconColor ? { color: iconColor } : undefined}
					>
						<div className={iconSizeMap[size ?? 'md']}>
							<Icon
								src={displayIcon}
								className='size-full'
							/>
						</div>
					</div>
				)}
			</Link>
		</Button>
	);
}
