'use client';

import React from 'react';
import { cn } from '@/libs/utils/styling';

interface NavbarContainerProps {
	children: React.ReactNode;
}

export const NavbarMobileContext = React.createContext<{
	open: boolean;
	setOpen: (open: boolean) => void;
}>({
	open: false,
	setOpen: () => {},
});

export function NavbarContainer({ children }: NavbarContainerProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<NavbarMobileContext.Provider value={{ open, setOpen }}>
			<div
				className={cn(
					'w-full backdrop-blur-lg transition-colors duration-400',
					open ? 'bg-background lg:bg-background/5' : 'bg-background/5',
				)}
			>
				{children}
			</div>
		</NavbarMobileContext.Provider>
	);
}
