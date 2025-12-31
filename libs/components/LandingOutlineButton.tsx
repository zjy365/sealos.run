import { FlatArrowRightIcon } from '@/assets/icons';
import { Link } from '../i18n/navigation';
import { Button } from './ui/button';
import { Icon } from './ui/icon';

export default function LandingOutlineButton({ children, href }: { children: React.ReactNode; href: string }) {
	return (
		<Button
			variant='ghost'
			className='group border-foreground hover:text-brand hover:border-brand h-14 gap-6 rounded-full border bg-transparent px-6 pr-2 text-xl shadow-none backdrop-blur-sm transition-colors'
			asChild
		>
			<Link href={href}>
				<span>{children}</span>
				<div className='bg-foreground text-background group-hover:bg-brand group-hover:border-brand flex aspect-square h-10 w-10 items-center justify-center rounded-full transition-colors'>
					<Icon
						src={FlatArrowRightIcon}
						className='size-6'
					/>
				</div>
			</Link>
		</Button>
	);
}
