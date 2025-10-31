import { MessagesSquare } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/libs/components/ui/button';
import { Config } from '@/libs/config';
import { Link } from '@/libs/i18n/navigation';
import { Logo } from './Logo';
import { BigRightArrow } from './ui/sealos-icons';

export async function Navbar() {
	const t = await getTranslations();

	return (
		<div className='w-full shadow-sm'>
			<div className='bg-background container mx-auto grid h-16 grid-cols-[1fr_auto_1fr] items-center justify-between'>
				{/* Brand */}
				<Link
					href='/'
					className='flex items-center gap-3'
				>
					<Logo withLogotype />
				</Link>

				{/* Links */}
				<nav className='mx-auto hidden gap-12 md:flex'>
					{Config.components.navbar.links.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className='hover:text-foreground text-sm text-zinc-600 transition-colors'
						>
							{t(item.textI18nKey as unknown as string)}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className='flex items-center justify-end gap-3'>
					<Button
						variant='secondary'
						className='h-10 min-w-32 rounded-full border-none bg-white px-4 py-2 hover:bg-white hover:shadow'
						asChild
					>
						<a
							href={Config.components.navbar.contactLink}
							target='_blank'
						>
							<MessagesSquare className='h-5 w-5 stroke-2' />
							{t('components.navbar.buttons.contact')}
						</a>
					</Button>

					<Button
						className='group flex h-10 w-40 items-center justify-center rounded-full px-0 text-white shadow'
						asChild
					>
						<a href={Config.components.navbar.getStartedLink}>
							<span className='absolute transition-opacity group-hover:pointer-events-none group-hover:opacity-0'>
								{t('components.navbar.buttons.getStarted')}
							</span>
							<BigRightArrow className='pointer-events-none absolute size-auto h-[18px] w-[113px] opacity-0 transition-opacity group-hover:opacity-100' />
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
