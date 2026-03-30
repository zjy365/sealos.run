'use client';

import React from 'react';
import { HexagonIcon } from '@/assets/icons';
import { APPSTORE_CATEGORY_META } from '@/libs/appstore/constants';
import type { AppStoreCategory, AppStoreTemplate } from '@/libs/appstore/types';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { useTranslations } from '@/libs/i18n/client';
import { cn } from '@/libs/utils/styling';
import { AppStoreIcon } from '../components/AppStoreIcon';

function CategoryPill({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
	return (
		<Button
			type='button'
			variant='outline'
			size='default'
			onClick={onClick}
			className={cn(
				'rounded-full px-4 py-2 text-xl leading-normal transition-colors',
				active ? 'text-foreground bg-white font-semibold' : 'text-muted-foreground bg-transparent font-normal',
			)}
		>
			{children}
		</Button>
	);
}

function StackedHexagons({ text }: { text?: string }) {
	return (
		<div className='flex items-center pr-3'>
			<div className='text-brand relative z-30 -mr-3 flex size-7 items-center justify-center'>
				<Icon
					src={HexagonIcon}
					className='size-full'
				/>
				{text && <span className='text-brand absolute text-xs leading-none font-medium'>{text}</span>}
			</div>
			<div className='relative z-20 -mr-3 size-7 text-zinc-300'>
				<Icon
					src={HexagonIcon}
					className='size-full'
				/>
			</div>
			<div className='relative z-10 size-7 text-zinc-200'>
				<Icon
					src={HexagonIcon}
					className='size-full'
				/>
			</div>
		</div>
	);
}

function TemplateCard({ data }: { data: AppStoreTemplate }) {
	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-2'>
				<div className='flex items-start justify-between'>
					<div className='flex items-center gap-3'>
						<div className='flex size-16 items-center justify-center overflow-hidden rounded-2xl bg-zinc-50'>
							<AppStoreIcon
								alt={data.title}
								fallbackClassName='size-12'
								imageClassName='object-contain'
								src={data.thumbnail}
								className='size-12'
							/>
						</div>

						<div className='flex min-w-0 flex-col gap-1'>
							<p className='text-foreground truncate text-lg leading-normal font-medium'>{data.title}</p>
							<p className='text-muted-foreground truncate text-sm leading-normal font-normal'>
								{[data.starsText, data.versionText].filter(Boolean).join(' / ')}
							</p>
						</div>
					</div>

					<div className='text-muted-foreground flex items-center gap-1 text-sm leading-normal font-normal'>
						<StackedHexagons text='S' />
						{data.trendDeltaText && <span>{data.trendDeltaText}</span>}
					</div>
				</div>

				<p className='text-foreground line-clamp-1 text-sm leading-normal font-normal'>{data.description}</p>
			</div>

			<div className='aspect-19/10 w-full overflow-hidden bg-zinc-100'>
				{data.thumbnail ? (
					// biome-ignore lint/performance/noImgElement: thumbnails are static local files for now.
					<img
						alt=''
						className='size-full object-cover'
						src={data.thumbnail}
					/>
				) : (
					<div className='size-full bg-linear-to-br from-zinc-200 to-zinc-50' />
				)}
			</div>
		</div>
	);
}

export function TemplatesSectionClient({ templates }: { templates: AppStoreTemplate[] }) {
	const t = useTranslations('pages.appstore.sections.templates');
	const [activeCategory, setActiveCategory] = React.useState<AppStoreCategory>('all');
	const scrollRef = React.useRef<HTMLDivElement | null>(null);

	const filtered = React.useMemo(() => {
		if (activeCategory === 'all') return templates;
		return templates.filter((t) => t.category === activeCategory);
	}, [templates, activeCategory]);

	return (
		<div className='flex w-full flex-col gap-12'>
			<div className='flex w-full flex-wrap items-center justify-center gap-2'>
				{APPSTORE_CATEGORY_META.map((category) => (
					<CategoryPill
						key={category.slug}
						active={activeCategory === category.slug}
						onClick={() => {
							if (scrollRef.current) scrollRef.current.scrollTop = 0;
							setActiveCategory(category.slug);
						}}
					>
						{t(`categories.${category.labelKey}`)}
					</CategoryPill>
				))}
			</div>

			<div
				ref={scrollRef}
				className={cn(
					'w-full overflow-y-auto bg-linear-to-b from-white to-zinc-50 px-5 py-10',
					// show ~2 rows, scroll for the rest
					'max-h-[60vh] lg:max-h-[55vh]',
				)}
			>
				<div className='grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{filtered.map((t) => (
						<TemplateCard
							key={t.slug}
							data={t}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
