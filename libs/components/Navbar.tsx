import { ChevronDown, Globe, MessagesSquare, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { siDiscord, siX } from 'simple-icons';
import { Button } from '@/libs/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/libs/components/ui/dropdown-menu';
import { Logo } from './Logo';
import { BigRightArrow } from './ui/sealos-icons';

export async function Navbar() {
	const t = await getTranslations('components.navbar');
	return (
		<div className='mx-auto w-full'>
			<div className='bg-background flex h-16 items-center justify-between px-3 shadow-sm md:px-4'>
				{/* Brand */}
				<a
					href='/'
					className='flex items-center gap-3'
				>
					<Logo className='h-7 w-7' />
					<span className='text-foreground text-lg font-semibold tracking-tight'>{t('brand')}</span>
				</a>

				{/* Actions */}
				<nav className='flex items-center gap-3'>
					<Button
						variant='secondary'
						className='h-10 rounded-full border-none bg-white px-4 py-2 hover:bg-white hover:shadow'
					>
						<MessagesSquare className='h-5 w-5 stroke-2' />
						{t('buttons.contact')}
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='secondary'
								className='h-10 rounded-full border-none border-black/10 bg-white px-4 py-2 hover:bg-white hover:shadow'
							>
								<Users className='h-5 w-5 stroke-2' />
								{t('buttons.community')}
								<ChevronDown className='ml-1 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='bg-background flex w-100 flex-col rounded-none p-8'
						>
							<DropdownMenuItem className='flex cursor-pointer items-start gap-3 py-2.5 text-gray-600'>
								<svg
									role='graphics-symbol'
									className='mr-2 size-5'
									viewBox='0 0 24 24'
									fill='currentColor'
								>
									<path d={siDiscord.path} />
								</svg>
								<div>
									<div>{t('community.discord.title')}</div>
									<div className='mt-1 text-gray-400'>{t('community.discord.description')}</div>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className='flex cursor-pointer items-start gap-3 py-2.5 text-gray-600'>
								<svg
									role='graphics-symbol'
									className='mr-2 size-5'
									viewBox='0 0 24 24'
									fill='currentColor'
								>
									<path d={siX.path} />
								</svg>
								<div>
									<div>{t('community.xCommunity.title')}</div>
									<div className='mt-1 text-gray-400'>{t('community.xCommunity.description')}</div>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className='flex cursor-pointer items-start gap-3 py-2.5 text-gray-600'>
								<Globe className='mr-2 size-5' />
								<div>
									<div>{t('community.community.title')}</div>
									<div className='mt-1 text-gray-400'>{t('community.community.description')}</div>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Button className='group flex h-10 w-40 items-center justify-center rounded-full px-0 text-white shadow'>
						<span className='absolute transition-opacity group-hover:pointer-events-none group-hover:opacity-0'>
							{t('buttons.getStarted')}
						</span>
						<BigRightArrow className='pointer-events-none absolute size-auto h-[18px] w-[113px] opacity-0 transition-opacity group-hover:opacity-100' />
					</Button>
				</nav>
			</div>
		</div>
	);
}
