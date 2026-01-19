import { BigRightArrowImage } from '@/assets';
import { ContactIcon, HexagonIcon } from '@/assets/icons';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { Config } from '@/libs/config';
import { Link } from '@/libs/i18n/navigation';
import { getTranslations } from '@/libs/i18n/server';
import { Logo } from '../Logo';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
	const t = await getTranslations();

	return (
		<div className='bg-background/5 w-full shadow-sm backdrop-blur-lg'>
			<div className='container mx-auto grid h-16 grid-cols-[1fr_auto_1fr] items-center justify-between'>
				{/* Brand */}
				<Link
					href='/'
					className='flex items-center gap-3'
				>
					<Logo withLogotype />
				</Link>

				{/* Links */}
				<div className='mx-auto'>
					<div className='hidden items-center gap-12 md:flex'>
						<NavbarClient links={Config.components.navbar.links} />
					</div>
				</div>

				{/* Actions */}
				<div className='flex items-center justify-end gap-3'>
					<Button
						variant='secondary'
						className='h-10 min-w-32 rounded-full border-none bg-transparent px-4 py-2 hover:bg-white/15'
						asChild
					>
						<a
							href={Config.components.navbar.contactLink}
							target='_blank'
						>
							<Icon
								src={ContactIcon}
								className='size-5'
							/>
							{t('components.navbar.buttons.contact')}
						</a>
					</Button>

					<Button
						className='bg-primary text-primary-foreground flex h-10 w-24 items-center justify-center rounded-full px-0 shadow hover:bg-brand'
						asChild
					>
						<a href={Config.components.navbar.signinLink}>
							<span className='absolute transition-opacity'>{t('components.navbar.buttons.signin')}</span>
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
