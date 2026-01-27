'use client';

import type React from 'react';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/libs/components/ui/navigation-menu';
import { Link } from '@/libs/i18n/navigation';

interface NavbarBrandProps {
	children: React.ReactNode;
}

export function NavbarBrand({ children }: NavbarBrandProps) {
	return (
		<NavigationMenu
			viewport={false}
			className='w-full max-w-none justify-start'
		>
			<NavigationMenuList className='w-full flex-1 justify-start'>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className='flex items-center gap-3'
					>
						<Link href='/'>{children}</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
