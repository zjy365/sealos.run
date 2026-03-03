'use client';

import { ContactIcon } from '@/assets/icons';
import { buttonVariants } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/libs/components/ui/navigation-menu';
import { cn } from '@/libs/utils/styling';

interface NavbarActionsProps {
	contactHref: string;
	contactLabel: string;
	signinHref: string;
	signinLabel: string;
}

export function NavbarActions({ contactHref, contactLabel, signinHref, signinLabel }: NavbarActionsProps) {
	return (
		<NavigationMenu viewport={false}>
			<NavigationMenuList className='gap-3'>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={cn(
							buttonVariants({ variant: 'secondary' }),
							'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 h-10 min-w-32 flex-row border-none bg-transparent px-4 py-2',
						)}
					>
						<a
							href={contactHref}
							target='_blank'
							rel='noreferrer'
						>
							<Icon
								src={ContactIcon}
								className='size-5'
							/>
							{contactLabel}
						</a>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={cn(
							buttonVariants(),
							'bg-primary text-primary-foreground hover:bg-brand hover:text-background flex h-10 w-24 items-center justify-center px-0 shadow',
						)}
					>
						<a href={signinHref}>
							<span className='absolute transition-opacity'>{signinLabel}</span>
						</a>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
