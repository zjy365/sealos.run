import {
	FlatArrowRightIcon,
	Number01Icon,
	Number02Icon,
	Number03Icon,
	Number04Icon,
	Number05Icon,
	StarIcon,
	TrendIcon,
} from '@/assets/icons';
import type { AppStoreTrendItem } from '@/libs/appstore/types';
import { getAppStoreTrends } from '@/libs/appstore/utils';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';
import { AppStoreIcon } from '../components/AppStoreIcon';

const rankIconMap = {
	1: Number01Icon,
	2: Number02Icon,
	3: Number03Icon,
	4: Number04Icon,
	5: Number05Icon,
} as const;

function buildTemplateDeployUrl(templateDeployUrlTemplate: string, templateName: string): string {
	return templateDeployUrlTemplate.replace('<template_name>', encodeURIComponent(templateName));
}

function TrendRow({ data, templateDeployUrlTemplate }: { data: AppStoreTrendItem; templateDeployUrlTemplate: string }) {
	const rankIcon = rankIconMap[data.rank] ?? Number01Icon;
	const deployUrl = buildTemplateDeployUrl(templateDeployUrlTemplate, data.slug);

	return (
		<div className='flex flex-col gap-4 border-b border-white p-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between md:gap-8 md:px-9 md:py-8'>
			<div className='flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center md:gap-8'>
				<div className='flex items-center gap-4'>
					<div className='text-brand size-6'>
						<Icon
							src={rankIcon}
							className='size-full'
						/>
					</div>
				</div>

				<div className='flex min-w-0 items-center gap-5'>
					<div className='flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-50'>
						<AppStoreIcon
							alt={data.title}
							fallbackClassName='size-10'
							imageClassName='object-contain'
							src={data.thumbnail}
							className='size-10'
						/>
					</div>

					<div className='flex min-w-0 flex-col'>
						<p className='text-foreground truncate text-lg leading-normal font-medium text-nowrap'>
							{data.title}
						</p>
						<p className='text-muted-foreground truncate text-sm leading-normal font-normal text-nowrap'>
							{data.description}
						</p>
					</div>
				</div>
			</div>

			<div className='flex shrink-0 items-center gap-3 md:gap-9'>
				<div className='text-muted-foreground order-2 flex items-center gap-4 text-base leading-normal font-normal sm:order-1'>
					<div className='flex items-center gap-1'>
						<div className='text-brand size-6'>
							<Icon
								src={StarIcon}
								className='size-full'
							/>
						</div>
						<span>{data.starsText ?? '-'}</span>
					</div>
					<div className='flex items-center gap-1'>
						<div className='text-brand size-6'>
							<Icon
								src={TrendIcon}
								className='size-full'
							/>
						</div>
						<span>{data.trendDeltaText ?? '-'}</span>
					</div>
				</div>

				<LandingOutlineButton
					href={deployUrl}
					size='md'
					icon={FlatArrowRightIcon}
					className='order-1 sm:order-2'
				>
					部署
				</LandingOutlineButton>
			</div>
		</div>
	);
}

export function TrendsSection({
	locale,
	templateDeployUrlTemplate,
}: {
	locale: string;
	templateDeployUrlTemplate: string;
}) {
	const trends = getAppStoreTrends(locale).slice(0, 5);

	return (
		<div className='flex w-full flex-col items-start gap-9'>
			<div className='flex items-center gap-4'>
				<div className='text-foreground size-6'>
					<Icon
						src={TrendIcon}
						className='text-brand size-full'
					/>
				</div>
				<p className='text-foreground text-3xl leading-none font-semibold'>
					<span>本周</span>
					<span className='text-brand'>趋势</span>
				</p>
			</div>

			<div className='w-full bg-zinc-100'>
				{trends.map((t) => (
					<TrendRow
						key={t.slug}
						data={t}
						templateDeployUrlTemplate={templateDeployUrlTemplate}
					/>
				))}
			</div>
		</div>
	);
}
