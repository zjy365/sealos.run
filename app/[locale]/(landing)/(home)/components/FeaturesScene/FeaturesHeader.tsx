import { FlatArrowRightIcon } from '@/assets/icons';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import type { FeaturesConfig } from '../../utils/features-config.types';

interface FeaturesHeaderProps {
	config: FeaturesConfig;
}

export function FeaturesHeader({ config }: FeaturesHeaderProps) {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-3'>
				<span className='text-muted-foreground text-base'>{config.title}</span>
				<Button
					variant='outline'
					size='sm'
				>
					详情
					<Icon
						src={FlatArrowRightIcon}
						className='size-4'
					/>
				</Button>
			</div>
			<div className='text-base font-semibold whitespace-pre-wrap sm:text-2xl sm:font-medium'>
				{config.description}
			</div>
		</div>
	);
}
