import { Config } from '@/libs/config';
import { getTranslations } from '@/libs/i18n/server';
import { Logo } from '../Logo';
import { NavbarActions } from './NavbarActions';
import { NavbarBrand } from './NavbarBrand';
import { NavbarClient } from './NavbarClient';
import { NavbarContainer } from './NavbarContainer';
import { NavbarMobileNav } from './NavbarMobileNav';

export async function Navbar() {
	const t = await getTranslations();

	return (
		<NavbarContainer>
			<div className='container mx-auto flex h-16 items-center justify-between px-4 lg:grid lg:grid-cols-[1fr_auto_1fr]'>
				{/* Brand */}
				<NavbarBrand>
					<Logo withLogotype />
				</NavbarBrand>

				{/* Links */}
				<div className='mx-auto hidden lg:block'>
					<div className='items-center gap-12 lg:flex'>
						<NavbarClient links={Config.components.navbar.links} />
					</div>
				</div>

				{/* Actions */}
				<div className='flex items-center justify-end'>
					<div className='hidden lg:flex'>
						<NavbarActions
							contactHref={Config.components.navbar.contactLink}
							contactLabel={t('components.navbar.buttons.contact')}
							signinHref={Config.components.navbar.signinLink}
							signinLabel={t('components.navbar.buttons.signin')}
						/>
					</div>
					<div className='lg:hidden'>
						<NavbarMobileNav
							links={Config.components.navbar.links}
							contactHref={Config.components.navbar.contactLink}
							contactLabel={t('components.navbar.buttons.contact')}
							signinHref={Config.components.navbar.signinLink}
							signinLabel={t('components.navbar.buttons.signin')}
						/>
					</div>
				</div>
			</div>
		</NavbarContainer>
	);
}
