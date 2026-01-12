import { cn } from '@/libs/utils/styling';
import type { BlockItem, EngineFeature } from '../../utils/features-config.types';
import { ArrowIcon } from './ArrowIcon';

interface FeaturesRendererProps {
	engineFeatures: EngineFeature[];
}

// Arrow Feature Component
function ArrowFeature({ feature }: { feature: Extract<EngineFeature, { type: 'arrow' }> }) {
	const { title, direction = 'down', visible = true } = feature;

	if (!visible) {
		return <div className='shrink-0' />;
	}

	const isHorizontal = direction === 'left' || direction === 'right';

	if (title) {
		const clipPath =
			'polygon(0 0, 100% 0, 100% calc(50% - 0.5rem), 0 calc(50% - 0.75rem), 0 calc(50% + 0.75rem), 100% calc(50% + 0.5rem), 100% 100%, 0 100%)';

		return (
			<div className={cn('flex w-full items-center gap-0.5', isHorizontal ? 'flex-row' : 'flex-col')}>
				<div className={cn('relative flex items-center justify-center', 'h-8 w-full')}>
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
						<p className='px-1.5 text-center text-xs whitespace-nowrap'>{title}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={cn('flex items-center', isHorizontal ? 'h-full flex-row justify-center' : 'w-full flex-col')}>
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

// Block Item Renderer: strings use flex-1, arrows are shrink-0
function BlockItemRenderer({ item, orientation }: { item: BlockItem; orientation: 'horizontal' | 'vertical' }) {
	if (typeof item === 'string') {
		return (
			<div className='flex min-w-0 flex-1 items-center justify-center border border-zinc-300 p-0.5'>
				<span className='text-center text-xs text-zinc-600'>{item}</span>
			</div>
		);
	}

	const direction = item.direction ?? (orientation === 'horizontal' ? 'right' : 'down');

	return (
		<div className='flex h-4 shrink-0 items-center justify-center'>
			<div className='text-brand'>
				<ArrowIcon
					size={16}
					direction={direction}
				/>
			</div>
		</div>
	);
}

// Block Feature Component
function BlockFeature({ feature }: { feature: Extract<EngineFeature, { type: 'block' }> }) {
	const { title, items, orientation = 'vertical', border = true, children } = feature;

	// Normalize items to 2D array
	const rows: BlockItem[][] = (() => {
		if (items.length === 0) return [];

		if (Array.isArray(items[0])) {
			return items as BlockItem[][];
		}

		const flatItems = items as BlockItem[];
		if (orientation === 'horizontal') {
			return [flatItems];
		}

		return flatItems.map((item) => [item]);
	})();

	return (
		<div
			className={cn(
				'flex w-full flex-col items-center gap-2 p-2',
				border && 'rounded border border-dashed border-zinc-400',
			)}
		>
			{title && <span className='text-xs'>{title}</span>}

			<div className='flex w-full flex-col gap-1.5'>
				{rows.map((row, rowIdx) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static content
						key={rowIdx}
						className='flex w-full items-center justify-center gap-2'
					>
						{row.map((item, itemIdx) => (
							<BlockItemRenderer
								// biome-ignore lint/suspicious/noArrayIndexKey: static content
								key={itemIdx}
								item={item}
								orientation={orientation}
							/>
						))}
					</div>
				))}
			</div>

			{children && children.length > 0 && (
				<div
					className={cn(
						'mt-2 flex w-full items-center gap-1.5',
						children.some((child) => child.type === 'row') ? 'flex-row' : 'flex-col',
					)}
				>
					{children.map((child, idx) => (
						<FeatureRenderer
							// biome-ignore lint/suspicious/noArrayIndexKey: static content
							key={idx}
							feature={child}
						/>
					))}
				</div>
			)}
		</div>
	);
}

// Row Feature Component
function RowFeature({ feature }: { feature: Extract<EngineFeature, { type: 'row' }> }) {
	return (
		<div className='flex w-full items-center gap-2'>
			{feature.items.map((item, idx) => {
				const isArrow = item.type === 'arrow';
				return (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static content
						key={idx}
						className={cn(isArrow ? 'flex shrink-0 items-center' : 'flex-1')}
					>
						<FeatureRenderer feature={item} />
					</div>
				);
			})}
		</div>
	);
}

// Main Feature Renderer
function FeatureRenderer({ feature }: { feature: EngineFeature }) {
	switch (feature.type) {
		case 'arrow':
			return <ArrowFeature feature={feature} />;
		case 'block':
			return <BlockFeature feature={feature} />;
		case 'row':
			return <RowFeature feature={feature} />;
		default:
			return null;
	}
}

// Root Component
export function FeaturesRenderer({ engineFeatures }: FeaturesRendererProps) {
	return (
		<div className='flex w-full min-w-120 flex-col items-center gap-1.5'>
			{engineFeatures.map((feature, idx) => (
				<FeatureRenderer
					// biome-ignore lint/suspicious/noArrayIndexKey: static content
					key={idx}
					feature={feature}
				/>
			))}
		</div>
	);
}
