'use client';

import React from 'react';
import { APPSTORE_CATEGORY_META } from '@/libs/appstore/constants';
import type { AppStoreCategory, AppStoreTemplate } from '@/libs/appstore/types';
import { Badge } from '@/libs/components/ui/badge';
import { Button } from '@/libs/components/ui/button';
import { useTranslations } from '@/libs/i18n/client';
import { cn } from '@/libs/utils/styling';
import { AppStoreIcon } from '../components/AppStoreIcon';

const categoryLabelKeyMap = Object.fromEntries(
	APPSTORE_CATEGORY_META.map((item) => [item.slug, item.labelKey]),
) as Record<AppStoreCategory, string | undefined>;

const A_CHAR_CODE = 'A'.charCodeAt(0);
const LETTER_COUNT = 26;
const PAGE_SIZE = 16;

function hashString(seed: string): number {
	let hash = 2166136261;
	for (let index = 0; index < seed.length; index += 1) {
		hash ^= seed.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}

function getTemplateMarkerLetter(template: Pick<AppStoreTemplate, 'slug' | 'deployCount'>): string {
	const seed = `${template.slug}:${template.deployCount ?? 0}`;
	const letterIndex = hashString(seed) % LETTER_COUNT;
	return String.fromCharCode(A_CHAR_CODE + letterIndex);
}

function buildTemplateDeployUrl(templateDeployUrlTemplate: string, templateName: string): string {
	return templateDeployUrlTemplate.replace('<template_name>', encodeURIComponent(templateName));
}

const CategoryPill = React.memo(function CategoryPill({
	active,
	children,
	onClick,
}: {
	active: boolean;
	children: string;
	onClick: () => void;
}) {
	return (
		<Button
			type='button'
			variant='outline'
			size='sm'
			onClick={onClick}
			className={cn(
				'rounded-full px-3 py-1.5 text-xs leading-normal transition-colors sm:text-sm',
				active
					? 'text-brand border-brand hover:text-brand bg-white font-semibold'
					: 'text-muted-foreground bg-transparent font-normal',
			)}
		>
			{children}
		</Button>
	);
});

const StackedHexagons = React.memo(function StackedHexagons({ text }: { text?: string }) {
	return (
		<div className='flex items-center pr-1'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				width='57'
				height='28'
				role='graphics-symbol'
			>
				<path
					fill='#e1ecff'
					stroke='#fafafa'
					strokeWidth='2'
					d='M54.2 7.6v12.35l-10.7 6.17-10.7-6.17V7.6l10.7-6.17z'
				/>
				<path
					fill='#ccdeff'
					stroke='#fafafa'
					strokeWidth='2'
					d='M39.2 7.6v12.35l-10.7 6.17-10.7-6.17V7.6l10.7-6.17z'
				/>
				<path
					fill='#005bff'
					stroke='#fafafa'
					strokeWidth='2'
					d='M24.2 7.33v12.34l-10.7 6.17-10.7-6.17V7.33l10.7-6.18z'
				/>
				<text
					fill='#fff'
					fontSize='10'
					letterSpacing='0em'
				>
					<tspan
						x='10.5'
						y='17.6'
					>
						{text}
					</tspan>
				</text>
			</svg>
		</div>
	);
});

const TemplateCard = React.memo(function TemplateCard({
	data,
	categoryName,
	templateDeployUrlTemplate,
}: {
	data: AppStoreTemplate;
	categoryName?: string;
	templateDeployUrlTemplate: string;
}) {
	const deployUrl = buildTemplateDeployUrl(templateDeployUrlTemplate, data.slug);
	const markerLetter = getTemplateMarkerLetter(data);

	return (
		<a
			href={deployUrl}
			target='_blank'
			rel='noopener noreferrer'
			className='hover:border-brand flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:shadow-xs'
		>
			<div className='flex items-start justify-between gap-2'>
				<div className='flex min-w-0 flex-1 items-center gap-2.5'>
					<div className='flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-50'>
						<AppStoreIcon
							alt={data.title}
							fallbackClassName='size-8'
							imageClassName='object-contain'
							src={data.thumbnail}
							className='size-8'
						/>
					</div>

					<div className='flex min-w-0 flex-1 flex-col gap-0.5'>
						<p className='text-foreground truncate text-sm leading-snug font-medium'>{data.title}</p>
						<p className='text-muted-foreground truncate text-xs leading-snug font-normal'>
							{[data.starsText, data.versionText].filter(Boolean).join(' / ')}
						</p>
					</div>
				</div>

				<div className='text-muted-foreground flex shrink-0 items-center text-xs leading-normal font-normal'>
					<StackedHexagons text={markerLetter} />
					{data.deployCount && <span>+{data.deployCount}</span>}
				</div>
			</div>

			<p className='text-foreground line-clamp-3 h-[3lh] text-xs leading-snug font-normal'>{data.description}</p>

			<div className='mt-2 flex gap-2'>
				<Badge
					className='bg-accent text-muted-foreground rounded-sm border-none'
					size='sm'
				>
					<div className='bg-brand mr-1 h-1.5 w-1.5 rounded-full' />
					{categoryName ?? data.category}
				</Badge>
			</div>
		</a>
	);
});

function getPageItems(currentPage: number, pageCount: number): Array<number | 'ellipsis'> {
	if (pageCount <= 7) {
		return Array.from({ length: pageCount }, (_, index) => index + 1);
	}

	const items: Array<number | 'ellipsis'> = [1];
	const start = Math.max(2, currentPage - 1);
	const end = Math.min(pageCount - 1, currentPage + 1);

	if (start > 2) {
		items.push('ellipsis');
	}
	for (let page = start; page <= end; page += 1) {
		items.push(page);
	}
	if (end < pageCount - 1) {
		items.push('ellipsis');
	}
	items.push(pageCount);

	return items;
}

const Pagination = React.memo(function Pagination({
	currentPage,
	pageCount,
	onPageChange,
}: {
	currentPage: number;
	pageCount: number;
	onPageChange: (page: number) => void;
}) {
	const items = getPageItems(currentPage, pageCount);

	return (
		<nav
			aria-label='分页导航'
			className='flex w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2'
		>
			<Button
				type='button'
				variant='outline'
				size='sm'
				disabled={currentPage <= 1}
				onClick={() => onPageChange(currentPage - 1)}
				className='rounded-full px-3'
				aria-label='上一页'
			>
				上一页
			</Button>

			{items.map((item, index) =>
				item === 'ellipsis' ? (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: ellipsis positions are static within a render
						key={`ellipsis-${index}`}
						className='text-muted-foreground px-1 text-sm select-none'
					>
						…
					</span>
				) : (
					<Button
						key={item}
						type='button'
						variant='outline'
						size='sm'
						onClick={() => onPageChange(item)}
						aria-current={item === currentPage ? 'page' : undefined}
						className={cn(
							'size-9 rounded-full p-0 text-sm',
							item === currentPage
								? 'text-brand border-brand bg-white font-semibold'
								: 'text-muted-foreground font-normal',
						)}
					>
						{item}
					</Button>
				),
			)}

			<Button
				type='button'
				variant='outline'
				size='sm'
				disabled={currentPage >= pageCount}
				onClick={() => onPageChange(currentPage + 1)}
				className='rounded-full px-3'
				aria-label='下一页'
			>
				下一页
			</Button>
		</nav>
	);
});

type TemplatesSectionClientProps = {
	templates: AppStoreTemplate[];
	templateDeployUrlTemplate: string;
	activeCategory?: AppStoreCategory | null;
	onCategoryChange?: (category: AppStoreCategory) => void;
	searchQuery?: string;
	searchVersion?: number;
};

export const TemplatesSectionClient = React.memo(function TemplatesSectionClient({
	templates,
	templateDeployUrlTemplate,
	activeCategory: controlledActiveCategory,
	onCategoryChange,
	searchQuery = '',
	searchVersion = 0,
}: TemplatesSectionClientProps) {
	const t = useTranslations('pages.appstore.sections.templates');
	const scrollRef = React.useRef<HTMLDivElement | null>(null);
	const [uncontrolledActiveCategory, setUncontrolledActiveCategory] = React.useState<AppStoreCategory>('all');
	const activeCategory =
		controlledActiveCategory === undefined ? uncontrolledActiveCategory : controlledActiveCategory;
	const handleCategoryChange = onCategoryChange ?? setUncontrolledActiveCategory;

	const filtered = React.useMemo(() => {
		if (activeCategory === null) return templates;
		if (activeCategory === 'all') return templates;
		return templates.filter((template) => template.category === activeCategory);
	}, [templates, activeCategory]);

	const [page, setPage] = React.useState(1);
	const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const currentPage = Math.min(page, pageCount);

	// Reset to first page whenever the result set changes (search / category switch).
	// biome-ignore lint/correctness/useExhaustiveDependencies: searchVersion/activeCategory are the signals that the result set changed
	React.useEffect(() => {
		setPage(1);
	}, [searchVersion, activeCategory]);

	const paged = React.useMemo(
		() => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
		[filtered, currentPage],
	);

	const goToPage = React.useCallback((next: number) => {
		setPage(next);
		scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, []);

	return (
		<div className='flex w-full flex-col gap-12'>
			<div className='flex w-full flex-wrap items-center justify-center gap-2'>
				{APPSTORE_CATEGORY_META.map((category) => (
					<CategoryPill
						key={category.slug}
						active={activeCategory === category.slug}
						onClick={() => {
							scrollRef.current?.scrollTo({ top: 0 });
							handleCategoryChange(category.slug);
						}}
					>
						{t(`categories.${category.labelKey}`)}
					</CategoryPill>
				))}
			</div>

			<div
				ref={scrollRef}
				className='w-full scroll-mt-24 bg-linear-to-b from-white to-zinc-50 px-5 py-10'
			>
				{filtered.length > 0 ? (
					<div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{paged.map((template) => (
							<TemplateCard
								key={template.slug}
								templateDeployUrlTemplate={templateDeployUrlTemplate}
								categoryName={
									categoryLabelKeyMap[template.category]
										? t(`categories.${categoryLabelKeyMap[template.category]}`)
										: undefined
								}
								data={template}
							/>
						))}
					</div>
				) : (
					<div className='text-muted-foreground flex min-h-50 items-center justify-center text-center text-base'>
						{searchQuery ? `未找到与 “${searchQuery}” 相关的应用` : '暂无应用'}
					</div>
				)}
			</div>

			{pageCount > 1 && (
				<Pagination
					currentPage={currentPage}
					pageCount={pageCount}
					onPageChange={goToPage}
				/>
			)}
		</div>
	);
});
