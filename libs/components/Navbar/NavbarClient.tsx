'use client';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/libs/components/ui/navigation-menu';
import { useTranslations } from '@/libs/i18n/client';
import { Link } from '@/libs/i18n/navigation';

interface NavLink {
	textI18nKey: string;
	href: string;
	panel?: React.ReactNode;
}

interface NavbarClientProps {
	links: NavLink[];
}

export function NavbarClient({ links }: NavbarClientProps) {
	const t = useTranslations();

	return (
		<NavigationMenu viewport={false}>
			<NavigationMenuList className='gap-12'>
				{links.map((item) => {
					if (item.panel) {
						return (
							<NavigationMenuItem key={item.href}>
								<NavigationMenuTrigger className='data-[state=open]:bg-accent/50 h-auto bg-transparent px-3 py-2 text-sm font-normal'>
									{t(item.textI18nKey)}
								</NavigationMenuTrigger>
								<NavigationMenuContent className='bg-background! rounded-none! shadow-none!'>
									{item.panel}
								</NavigationMenuContent>
							</NavigationMenuItem>
						);
					}
					return (
						<NavigationMenuItem key={item.href}>
							<Link
								href={item.href}
								className='hover:text-foreground text-sidebar-foreground text-sm transition-colors'
							>
								{t(item.textI18nKey)}
							</Link>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
