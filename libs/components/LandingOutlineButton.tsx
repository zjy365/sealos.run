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
		},
		defaultVariants: {
			size: 'md',
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

export function LandingOutlineButton({
	children,
	href,
	size = 'md',
}: {
	children: React.ReactNode;
	href: string;
	size?: VariantProps<typeof landingOutlineButtonVariants>['size'];
}) {
	return (
		<Button
			variant='ghost'
			className={cn(landingOutlineButtonVariants({ size }))}
			asChild
		>
			<Link href={href}>
				<span>{children}</span>
				<div className={cn(iconContainerVariants({ size }))}>
					<Icon
						src={FlatArrowRightIcon}
						className={iconSizeMap[size ?? 'md']}
					/>
				</div>
			</Link>
		</Button>
	);
}
