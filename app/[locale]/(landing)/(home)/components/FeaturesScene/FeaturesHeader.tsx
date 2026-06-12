import { FlatArrowRightIcon } from '@/assets/icons';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';
import type { FeaturesConfig } from '../../utils/features.types';

interface FeaturesHeaderProps {
	config: FeaturesConfig;
}

export function FeaturesHeader({ config }: FeaturesHeaderProps) {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-3'>
				<span className='text-muted-foreground text-base'>{config.title}</span>
				<Button
					asChild
					variant='outline'
					size='sm'
				>
					<Link href={config.href}>
						详情
						<Icon
							src={FlatArrowRightIcon}
							className='size-4'
						/>
					</Link>
				</Button>
			</div>
			<div className='h-[3lh] text-base font-semibold text-balance whitespace-pre-wrap sm:text-2xl sm:font-medium xl:h-[1lh]'>
				{config.description}
			</div>
		</div>
	);
}
