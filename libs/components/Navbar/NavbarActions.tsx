'use client';

import React from 'react';
import { SolutionsLeadDialog } from '@/app/[locale]/(landing)/solutions/components/SolutionsLeadDialog';
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
	contactLabel: string;
	contactFormConfig: {
		endpoint: string;
		version: string;
	};
	signinHref: string;
	signinLabel: string;
}

export function NavbarActions({ contactLabel, contactFormConfig, signinHref, signinLabel }: NavbarActionsProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<>
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
							<button
								type='button'
								onClick={() => setOpen(true)}
							>
								<Icon
									src={ContactIcon}
									className='size-5'
								/>
								{contactLabel}
							</button>
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

			<SolutionsLeadDialog
				endpoint={contactFormConfig.endpoint}
				formVersion={contactFormConfig.version}
				open={open}
				onOpenChange={setOpen}
			/>
		</>
	);
}
