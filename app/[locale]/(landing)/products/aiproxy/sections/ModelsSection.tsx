'use client';

import React from 'react';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, FramedCodeIcon, SearchIcon, ToolIcon, XIcon } from '@/assets/icons';
import { getAiproxyOwnerIcon } from '@/libs/aiproxy/icons';
import type { AiproxyModel, AiproxyModelCapability } from '@/libs/aiproxy/types';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/components/ui/select';
import type { InlinedSvgData } from '@/libs/types';
import { cn } from '@/libs/utils/styling';

type SortDirection = 'asc' | 'desc' | null;

const TABLE_ROW_HEIGHT = 64;
const VISIBLE_ROW_COUNT = 8;
const TABLE_BODY_HEIGHT = TABLE_ROW_HEIGHT * VISIBLE_ROW_COUNT;
const TABLE_COLUMNS = [400, 180, 120, 220, 220] as const;

const CAPABILITY_ICONS: Record<AiproxyModelCapability, InlinedSvgData> = {
	coder: FramedCodeIcon,
	tool_choice: ToolIcon,
	vision: EyeIcon,
};

type ModelMetaTag = {
	key: string;
	label: string;
	icon?: InlinedSvgData;
};

function formatTokens(value?: number) {
	if (value == null) return '-';
	if (value >= 1000000 && value % 1000000 === 0) return `${value / 1000000}M`;
	if (value >= 1024 && value % 1024 === 0) return `${value / 1024}K`;
	if (value >= 1000 && value % 1000 === 0) return `${value / 1000}K`;
	return new Intl.NumberFormat('en-US').format(value);
}

function formatPrice(value: number) {
	return new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 6,
		minimumFractionDigits: value > 0 && value < 0.01 ? 4 : 2,
	}).format(value);
}

function normalizeSearchValue(value: string) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[-_\s]+/g, '');
}

function matchesModelName(modelName: string, query: string) {
	const normalizedQuery = normalizeSearchValue(query);
	if (!normalizedQuery) return true;

	const normalizedName = normalizeSearchValue(modelName);
	return normalizedName.includes(normalizedQuery);
}

function getModelMetaTags(model: AiproxyModel) {
	const tags: ModelMetaTag[] = model.capabilities.map((capability, index) => ({
		icon: CAPABILITY_ICONS[capability],
		key: `${model.slug}-${capability}`,
		label: model.capabilityLabels[index] ?? capability,
	}));

	if (model.contextSize) {
		tags.push({
			key: `${model.slug}-context-size`,
			label: formatTokens(model.contextSize),
		});
	}

	if (model.maxOutputTokens) {
		tags.push({
			key: `${model.slug}-max-output-tokens`,
			label: `${formatTokens(model.maxOutputTokens)} 输出`,
		});
	}

	return tags;
}

function OwnerIcon({ ownerKey, ownerLabel, className }: { ownerKey: string; ownerLabel: string; className?: string }) {
	return (
		<div className={cn('flex shrink-0 items-center justify-center rounded-full bg-white', className)}>
			<Icon
				src={getAiproxyOwnerIcon(ownerKey)}
				alt={`${ownerLabel} icon`}
				className='size-full'
			/>
		</div>
	);
}

function SearchBox({
	isOpen,
	query,
	onOpen,
	onClose,
	onQueryChange,
}: {
	isOpen: boolean;
	query: string;
	onOpen: () => void;
	onClose: () => void;
	onQueryChange: (query: string) => void;
}) {
	return (
		<>
			<div className='flex h-10 w-full items-center gap-2 rounded-full border border-zinc-300 bg-white pr-2 pl-4 sm:hidden'>
				<input
					type='text'
					placeholder='根据模型名称搜索'
					value={query}
					onChange={(event) => onQueryChange(event.target.value)}
					className='flex-1 outline-none'
				/>
				<Icon
					src={SearchIcon}
					className='text-brand size-5 shrink-0'
				/>
			</div>

			{!isOpen ? (
				<button
					onClick={onOpen}
					className='hidden size-10 items-center justify-center rounded-full border border-zinc-300 bg-white sm:flex'
					type='button'
				>
					<Icon
						src={SearchIcon}
						className='text-brand size-5'
					/>
				</button>
			) : (
				<div className='hidden h-10 items-center gap-2 rounded-full border border-zinc-300 bg-white pr-2 pl-4 sm:flex'>
					<input
						type='text'
						placeholder='根据模型名称搜索'
						value={query}
						onChange={(event) => onQueryChange(event.target.value)}
						className='w-full outline-none'
					/>
					<button
						onClick={onClose}
						className='flex size-10 items-center justify-center rounded-full'
						type='button'
					>
						<Icon
							src={XIcon}
							className='text-brand size-5'
						/>
					</button>
				</div>
			)}
		</>
	);
}

function PriceSortButton({ direction, onClick }: { direction: SortDirection; onClick: () => void }) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='flex items-center'
		>
			<Icon
				src={direction === 'desc' ? ChevronDownIcon : ChevronUpIcon}
				className={cn('size-4', direction ? 'text-brand' : 'text-muted-foreground')}
			/>
		</button>
	);
}

export function ModelsSection({ models }: { models: AiproxyModel[] }) {
	const [isSearchOpen, setIsSearchOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState('');
	const [selectedOwner, setSelectedOwner] = React.useState('all');
	const [selectedType, setSelectedType] = React.useState('all');
	const [sortInput, setSortInput] = React.useState<SortDirection>(null);
	const [sortOutput, setSortOutput] = React.useState<SortDirection>(null);

	const ownerOptions = React.useMemo(() => {
		return Array.from(new Map(models.map((model) => [model.ownerKey, model.ownerLabel])).entries()).map(
			([value, label]) => ({ value, label }),
		);
	}, [models]);

	const typeOptions = React.useMemo(() => {
		return Array.from(new Map(models.map((model) => [model.type, model.typeLabel])).entries()).map(
			([value, label]) => ({
				value,
				label,
			}),
		);
	}, [models]);

	const filteredModels = React.useMemo(() => {
		const list = models.filter((model) => {
			if (selectedOwner !== 'all' && model.ownerKey !== selectedOwner) return false;
			if (selectedType !== 'all' && model.type !== selectedType) return false;

			return matchesModelName(model.name, searchQuery);
		});

		const sorted = [...list];
		if (sortInput) {
			sorted.sort((a, b) => (sortInput === 'asc' ? a.inputPrice - b.inputPrice : b.inputPrice - a.inputPrice));
		}

		if (sortOutput) {
			sorted.sort((a, b) =>
				sortOutput === 'asc' ? a.outputPrice - b.outputPrice : b.outputPrice - a.outputPrice,
			);
		}

		return sorted;
	}, [models, searchQuery, selectedOwner, selectedType, sortInput, sortOutput]);

	return (
		<div className='flex flex-col gap-8'>
			<div className='flex flex-col gap-3'>
				<div className='flex items-center gap-3'>
					<h2 className='text-4xl font-semibold'>模型广场</h2>
					<Badge variant='outline'>
						{filteredModels.length} / {models.length} 个模型
					</Badge>
				</div>
				<p className='text-muted-foreground text-sm'>价格较官方低 5%–10%（以平台标价为准）</p>
			</div>

			<div className='flex flex-col flex-wrap gap-x-8 gap-y-2 md:flex-row md:items-center'>
				<div className='flex w-full items-center gap-3 sm:w-auto'>
					<span className='shrink-0 text-base font-semibold'>系列/厂商</span>
					<Select
						value={selectedOwner}
						onValueChange={setSelectedOwner}
					>
						<SelectTrigger className='w-40 min-w-0 flex-1 bg-white'>
							<SelectValue placeholder='全部' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>全部</SelectItem>
							{ownerOptions.map((owner) => (
								<SelectItem
									key={owner.value}
									value={owner.value}
								>
									<div className='flex items-center gap-2'>
										<OwnerIcon
											ownerKey={owner.value}
											ownerLabel={owner.label}
											className='size-4'
										/>
										<span>{owner.label}</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex w-full items-center gap-3 sm:w-auto'>
					<span className='shrink-0 text-base font-semibold'>类型</span>
					<Select
						value={selectedType}
						onValueChange={setSelectedType}
					>
						<SelectTrigger className='w-40 min-w-0 flex-1 bg-white'>
							<SelectValue placeholder='全部' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>全部</SelectItem>
							{typeOptions.map((type) => (
								<SelectItem
									key={type.value}
									value={type.value}
								>
									{type.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='w-full lg:ml-auto lg:w-auto'>
					<SearchBox
						isOpen={isSearchOpen}
						query={searchQuery}
						onOpen={() => setIsSearchOpen(true)}
						onClose={() => {
							setIsSearchOpen(false);
							setSearchQuery('');
						}}
						onQueryChange={setSearchQuery}
					/>
				</div>
			</div>

			<div className='border-hairline overflow-hidden border border-zinc-200 bg-white'>
				<div className='overflow-x-auto'>
					<div className='min-w-6xl'>
						<table className='w-full border-collapse'>
							<colgroup>
								<col style={{ width: `${TABLE_COLUMNS[0]}px` }} />
								<col style={{ width: `${TABLE_COLUMNS[1]}px` }} />
								<col style={{ width: `${TABLE_COLUMNS[2]}px` }} />
								<col style={{ width: `${TABLE_COLUMNS[3]}px` }} />
								<col style={{ width: `${TABLE_COLUMNS[4]}px` }} />
							</colgroup>
							<thead>
								<tr className='bg-zinc-100'>
									<th className='px-4 py-3 text-left text-sm font-medium text-zinc-500'>模型名称</th>
									<th className='px-4 py-3 text-left text-sm font-medium text-zinc-500'>模型类型</th>
									<th className='px-4 py-3 text-left text-sm font-medium text-zinc-500'>RPM</th>
									<th className='px-4 py-3 text-left text-sm font-medium text-zinc-500'>
										<div className='flex items-center gap-2'>
											<span>输入单价/1K tokens</span>
											<PriceSortButton
												direction={sortInput}
												onClick={() => {
													setSortInput((current) => {
														if (current === 'asc') return 'desc';
														if (current === 'desc') return null;
														return 'asc';
													});
													setSortOutput(null);
												}}
											/>
										</div>
									</th>
									<th className='px-4 py-3 text-left text-sm font-medium text-zinc-500'>
										<div className='flex items-center gap-2'>
											<span>输出单价/1K tokens</span>
											<PriceSortButton
												direction={sortOutput}
												onClick={() => {
													setSortOutput((current) => {
														if (current === 'asc') return 'desc';
														if (current === 'desc') return null;
														return 'asc';
													});
													setSortInput(null);
												}}
											/>
										</div>
									</th>
								</tr>
							</thead>
						</table>

						<div
							className='overflow-y-auto'
							style={{ maxHeight: `${TABLE_BODY_HEIGHT}px` }}
						>
							<table className='w-full border-collapse'>
								<colgroup>
									<col style={{ width: `${TABLE_COLUMNS[0]}px` }} />
									<col style={{ width: `${TABLE_COLUMNS[1]}px` }} />
									<col style={{ width: `${TABLE_COLUMNS[2]}px` }} />
									<col style={{ width: `${TABLE_COLUMNS[3]}px` }} />
									<col style={{ width: `${TABLE_COLUMNS[4]}px` }} />
								</colgroup>
								<tbody>
									{filteredModels.map((model) => (
										<tr
											key={model.slug}
											className='border-b border-zinc-100 align-middle last:border-b-0'
											style={{ height: `${TABLE_ROW_HEIGHT}px` }}
										>
											<td className='px-4 py-3 align-middle'>
												<div className='flex min-w-0 items-center gap-3'>
													<OwnerIcon
														ownerKey={model.ownerKey}
														ownerLabel={model.ownerLabel}
														className='size-8'
													/>
													<div className='flex min-w-0 flex-col justify-center gap-1'>
														<div className='flex flex-col'>
															<span className='truncate text-sm font-medium text-zinc-900'>
																{model.name}
															</span>
														</div>
														<div className='flex flex-wrap gap-1'>
															<Badge
																variant='outline'
																size='sm'
																className='text-muted-foreground border-zinc-400 px-2'
															>
																{model.ownerLabel}
															</Badge>
															{getModelMetaTags(model).map((tag) => (
																<Badge
																	key={tag.key}
																	variant='outline'
																	size='sm'
																	className='text-muted-foreground border-zinc-400 px-2'
																>
																	{tag.icon && (
																		<Icon
																			src={tag.icon}
																			className='size-3'
																		/>
																	)}
																	{tag.label}
																</Badge>
															))}
														</div>
													</div>
												</div>
											</td>
											<td className='px-4 py-3 align-middle'>
												<Badge
													variant='outline'
													className='border-zinc-400 px-3 py-1 text-xs text-zinc-900'
												>
													<div className='bg-brand mr-1.5 size-1.5 rounded-full' />
													{model.typeLabel}
												</Badge>
											</td>
											<td className='px-4 py-3 align-middle text-sm text-zinc-600'>
												{model.rpm}
											</td>
											<td className='px-4 py-3 align-middle text-sm text-zinc-600'>
												{formatPrice(model.inputPrice)}
											</td>
											<td className='px-4 py-3 align-middle text-sm text-zinc-600'>
												{formatPrice(model.outputPrice)}
											</td>
										</tr>
									))}
									{filteredModels.length === 0 && (
										<tr>
											<td
												colSpan={5}
												className='text-muted-foreground px-4 py-10 text-center text-sm'
											>
												未找到符合条件的模型。
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
