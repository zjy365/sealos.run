import { FlatArrowRightIcon } from '@/assets/icons';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import type { FeaturesConfig } from '../../utils/features-config.types';
import { FeaturesRenderer } from './FeaturesRenderer';

interface FeaturesProps {
	config: FeaturesConfig;
}

export function Features({ config }: FeaturesProps) {
	return (
		<div className='flex flex-1 flex-col gap-6'>
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
				<div className='text-2xl font-medium whitespace-pre-wrap'>{config.description}</div>
			</div>

			<div className='flex w-full items-start gap-8'>
				<div className='flex w-1/3 flex-col gap-8 pt-8'>
					{config.features.map((feature) => (
						<div
							key={feature.title}
							className='flex flex-col gap-1'
						>
							<div className='flex items-center gap-2'>
								<Icon
									src={feature.icon}
									className='text-brand size-4'
								/>
								<h3 className='text-base font-medium'>{feature.title}</h3>
							</div>
							<p className='text-sm text-zinc-500'>{feature.description}</p>
						</div>
					))}
				</div>

				<FeaturesRenderer engineFeatures={config.engineFeatures} />
			</div>
		</div>
	);
}
