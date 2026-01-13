import { Icon } from '@/libs/components/ui/icon';
import type { FeaturesConfig } from '../../utils/features-config.types';

interface FeaturesListProps {
	config: FeaturesConfig;
}

export function FeaturesList({ config }: FeaturesListProps) {
	return (
		<div className='flex flex-col gap-8 lg:flex-row lg:pt-8 xl:flex-col'>
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
	);
}
