import type React from 'react';
import { cn } from '@/libs/utils/styling';
import type { BlockItem, EngineFeature } from '../../utils/features-config.types';
import { ArrowIcon } from './ArrowIcon';

interface FeaturesRendererProps {
	engineFeatures: EngineFeature[];
}

function renderEngineFeature(feature: EngineFeature, idx: number): React.ReactNode {
	if (feature.type === 'arrow') {
		const visible = feature.visible ?? true;
		if (!visible) {
			return (
				<div
					key={idx}
					className='shrink-0'
				/>
			);
		}

		const hasTitle = !!feature.title;
		const direction = feature.direction ?? 'down';

		if (hasTitle) {
			const isHorizontal = direction === 'left' || direction === 'right';
			const clipPath = isHorizontal
				? 'polygon(0 0, 100% 0, 100% calc(50% - 0.5rem), 0 calc(50% - 0.75rem), 0 calc(50% + 0.75rem), 100% calc(50% + 0.5rem), 100% 100%, 0 100%)'
				: 'polygon(0 0, 100% 0, 100% calc(50% - 0.5rem), 0 calc(50% - 0.75rem), 0 calc(50% + 0.75rem), 100% calc(50% + 0.5rem), 100% 100%, 0 100%)';

			const containerClass = cn(
				'flex items-center gap-0.5',
				isHorizontal ? 'flex-row w-full' : 'flex-col w-full',
			);

			return (
				<div
					key={idx}
					className={containerClass}
				>
					<div
						className={cn(
							'relative flex items-center justify-center',
							isHorizontal ? 'h-8 w-full' : 'h-8 w-full',
						)}
					>
						<div
							className='text-brand absolute inset-0 flex items-center justify-center'
							style={{ clipPath }}
						>
							<ArrowIcon
								size={8}
								height={isHorizontal ? undefined : 32}
								width={isHorizontal ? 32 : undefined}
								direction={direction}
							/>
						</div>
						<div className='relative z-10 flex items-center justify-center'>
							<p className='px-1.5 text-center text-xs whitespace-nowrap'>{feature.title}</p>
						</div>
					</div>
				</div>
			);
		}

		const isHorizontal = direction === 'left' || direction === 'right';
		return (
			<div
				key={idx}
				className={cn('flex items-center', isHorizontal ? 'h-full flex-row justify-center' : 'w-full flex-col')}
			>
				<div className={cn('flex items-center justify-center', isHorizontal ? 'w-4' : 'h-4 w-0')}>
					<div className='text-brand flex-none'>
						<ArrowIcon
							size={16}
							direction={direction}
						/>
					</div>
				</div>
			</div>
		);
	}

	if (feature.type === 'block') {
		const orientation = feature.orientation ?? 'vertical';
		const isHorizontal = orientation === 'horizontal';
		const itemsPerRow = feature.itemsPerRow ?? 4;
		const showBorder = feature.border ?? true;

		const rows: BlockItem[][] = (() => {
			if (feature.items.length > 0 && Array.isArray(feature.items[0])) {
				return (feature.items as BlockItem[][]).filter((row): row is BlockItem[] => Array.isArray(row));
			}

			const items = feature.items as BlockItem[];
			if (items.length === 0) {
				return [];
			}

			if (isHorizontal) {
				return [items];
			}

			const hasArrow = items.some((item) => typeof item === 'object' && item.type === 'arrow');

			if (hasArrow) {
				return items.map((item) => [item]);
			}

			return items.reduce<BlockItem[][]>((acc, item, index) => {
				const rowIndex = Math.floor(index / itemsPerRow);
				if (!acc[rowIndex]) {
					acc[rowIndex] = [];
				}
				acc[rowIndex].push(item);
				return acc;
			}, []);
		})();

		const renderBlockItem = (item: BlockItem, itemKey: string | number, row?: BlockItem[]) => {
			if (typeof item === 'string') {
				return (
					<div
						key={itemKey}
						className='flex flex-1 items-center justify-center border border-zinc-300 p-0.5'
					>
						<span className='text-xs text-zinc-600'>{item}</span>
					</div>
				);
			}

			const arrowDirection = item.direction ?? (isHorizontal ? 'right' : 'down');
			const isArrowOnly = !isHorizontal && row && row.length === 1 && row[0] === item;

			return (
				<div
					key={itemKey}
					className={cn(
						'flex items-center justify-center',
						isHorizontal ? 'h-4 shrink-0' : isArrowOnly ? 'h-4 w-full' : 'h-4 w-0 shrink-0',
					)}
				>
					<div className='text-brand flex-none'>
						<ArrowIcon
							size={16}
							direction={arrowDirection}
						/>
					</div>
				</div>
			);
		};

		return (
			<div
				key={idx}
				className={cn(
					'flex w-full flex-col items-center gap-2 p-2',
					showBorder && 'rounded border border-dashed border-zinc-400',
				)}
			>
				{feature.title && <span className='text-xs'>{feature.title}</span>}
				{isHorizontal ? (
					<div className='flex w-full items-center gap-2'>
						{rows[0].map((item, itemIdx) => renderBlockItem(item, itemIdx, rows[0]))}
					</div>
				) : (
					<div className='flex w-full flex-col gap-1.5'>
						{rows.map((row, rowIdx) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: static content
								key={rowIdx}
								className='flex w-full gap-2'
							>
								{row.map((item, itemIdx) => renderBlockItem(item, `${rowIdx}-${itemIdx}`, row))}
							</div>
						))}
					</div>
				)}
				{feature.children && feature.children.length > 0 && (
					<div
						className={cn(
							'mt-2 flex w-full items-center gap-1.5',
							feature.children.some((child) => child.type === 'row') ? 'flex-row' : 'flex-col',
						)}
					>
						{feature.children.map((child, childIdx) => renderEngineFeature(child, childIdx))}
					</div>
				)}
			</div>
		);
	}

	if (feature.type === 'row') {
		return (
			<div
				key={idx}
				className='flex w-full items-center gap-2'
			>
				{feature.items.map((item, itemIdx) => {
					const isArrow = item.type === 'arrow';
					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: static content
							key={itemIdx}
							className={cn(isArrow ? 'flex shrink-0 items-center' : 'flex-1')}
						>
							{renderEngineFeature(item, itemIdx)}
						</div>
					);
				})}
			</div>
		);
	}

	return null;
}

export function FeaturesRenderer({ engineFeatures }: FeaturesRendererProps) {
	return (
		<div className='flex min-w-96 flex-1 flex-col items-center gap-1.5'>
			{engineFeatures.map((feature, idx) => renderEngineFeature(feature, idx))}
		</div>
	);
}
