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
				<div className='text-base font-semibold whitespace-pre-wrap sm:text-2xl sm:font-medium'>
					{config.description}
				</div>
			</div>

			<div className='flex w-full flex-wrap items-start gap-8'>
				<div className='flex w-full flex-col gap-8 lg:flex-row lg:pt-8 xl:w-1/3 xl:flex-col'>
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
								<h3 className='text-sm font-medium lg:text-base'>{feature.title}</h3>
							</div>
							<p className='text-sm text-zinc-500'>{feature.description}</p>
						</div>
					))}
				</div>

				<div className='w-full flex-1 overflow-x-scroll'>
					<FeaturesRenderer engineFeatures={config.engineFeatures} />
				</div>
			</div>
		</div>
	);
}
