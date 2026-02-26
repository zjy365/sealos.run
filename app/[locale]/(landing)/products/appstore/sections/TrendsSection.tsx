import {
	AppIcon,
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
import { Config } from '@/libs/config';

const rankIconMap = {
	1: Number01Icon,
	2: Number02Icon,
	3: Number03Icon,
	4: Number04Icon,
	5: Number05Icon,
} as const;

function TrendRow({ data }: { data: AppStoreTrendItem }) {
	const rankIcon = rankIconMap[data.rank] ?? Number01Icon;
	const { signinLink } = Config.components.navbar;

	return (
		<div className='flex items-center justify-between gap-8 border-b border-white px-9 py-8 last:border-b-0'>
			<div className='flex min-w-0 items-center gap-8'>
				<div className='flex items-center gap-4'>
					<div className='text-brand size-6'>
						<Icon
							src={rankIcon}
							className='size-full'
						/>
					</div>
					<div className='text-brand size-6'>
						<Icon
							src={AppIcon}
							className='size-full'
						/>
					</div>
				</div>

				<div className='flex min-w-0 items-center gap-5'>
					<div className='flex size-12 items-center justify-center overflow-hidden bg-zinc-50'>
						<div className='text-foreground size-10'>
							<Icon
								src={AppIcon}
								className='size-full'
							/>
						</div>
					</div>

					<div className='flex min-w-0 flex-col'>
						<p className='text-foreground text-lg leading-normal font-medium'>{data.title}</p>
						<p className='text-muted-foreground truncate text-sm leading-normal font-normal'>
							{data.description}
						</p>
					</div>
				</div>
			</div>

			<div className='flex shrink-0 items-center gap-9'>
				<div className='text-muted-foreground flex items-center gap-4 text-base leading-normal font-normal'>
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
					href={signinLink}
					size='md'
					icon={FlatArrowRightIcon}
				>
					部署
				</LandingOutlineButton>
			</div>
		</div>
	);
}

export function TrendsSection({ locale }: { locale: string }) {
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
					/>
				))}
			</div>
		</div>
	);
}
