'use client';

import { useInView } from 'motion/react';
import type { StaticImageData } from 'next/image';
import React from 'react';
import { AiProxyIcon, AppLaunchpadIcon, DatabaseIcon, DevboxIcon, ObjectStorageIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { cn } from '@/libs/utils/styling';

interface VerticalDashedLineProps {
	children?: React.ReactNode;
	iconY?: string;
	mask?: [string, string][];
	appIcons?: Record<string, { icon: StaticImageData }>;
	activeIndex?: number | null;
	onIconClick?: (index: number) => void;
	/**
	 * Class name overrides
	 * You can override icon size using Tailwind arbitrary value: [--icon-size:3rem] (default: 3rem)
	 * You can override base scale using Tailwind arbitrary value: [--icon-scale-base:1] (default: 1)
	 * Example for responsive scaling: [--icon-size:1.5rem] sm:[--icon-scale-base:2]
	 */
	className?: string;
}

const DEFAULT_APP_ICONS: Record<string, { icon: StaticImageData }> = {
	'app-launchpad': {
		icon: AppLaunchpadIcon,
	},
	devbox: {
		icon: DevboxIcon,
	},
	database: {
		icon: DatabaseIcon,
	},
	'ai-proxy': {
		icon: AiProxyIcon,
	},
	'object-storage': {
		icon: ObjectStorageIcon,
	},
};

export function FeaturesDecoLine({
	children,
	iconY = '0.5rem',
	mask,
	appIcons = DEFAULT_APP_ICONS,
	activeIndex,
	onIconClick,
	className,
}: VerticalDashedLineProps) {
	const iconRef = React.useRef<HTMLDivElement>(null);
	const isVisible = useInView(iconRef, {
		margin: '-20% 0px -20% 0px',
		amount: 0.1,
	});
	const maskId = React.useId();

	return (
		<div
			className={cn(
				'text-brand absolute top-0 left-6 z-0 h-full w-6 overflow-visible [--icon-scale-base:1] [--icon-size:3rem] sm:w-12',
				className,
			)}
		>
			<svg
				className='h-full w-full'
				preserveAspectRatio='none'
				style={{ overflow: 'visible' }}
				xmlns='http://www.w3.org/2000/svg'
				role='graphics-symbol'
			>
				<defs>
					<mask
						id={maskId}
						maskUnits='userSpaceOnUse'
					>
						<rect
							x='0'
							y='0'
							width='calc(100% + 1px)'
							height='100%'
							fill='white'
						/>
						{mask?.map(([y1, y2]) => {
							// Scale from center: calculate center position, then offset by half of scaled dimensions
							const centerY = `(${y1} + ${y2}) / 2`;
							const height = `${y2} - ${y1}`;
							const scaledHeight = `(${height}) * var(--icon-scale-base)`;
							const scaledY = `(${centerY}) - (${scaledHeight}) / 2`;
							const scaledWidth = `var(--icon-size) * var(--icon-scale-base)`;
							const scaledX = `50% - (${scaledWidth}) / 2`;

							return (
								<rect
									key={`${y1}-${y2}`}
									x={`calc(${scaledX})`}
									y={`calc(${scaledY})`}
									width={`calc(${scaledWidth})`}
									height={`calc(${scaledHeight})`}
									fill='black'
								/>
							);
						})}

						{/* App Icon masks - fixed size, not affected by scale */}
						{Object.entries(appIcons).map(([slug], index, arr) => {
							const iconYPos = `calc(10rem + 0.875rem + 1rem + calc(calc(100% - 20rem - 2rem - 1.75rem) / ${arr.length - 1}) * ${index})`;
							return (
								<rect
									key={`icon-mask-${slug}`}
									x='calc(100% - 0.875rem)'
									y={`calc(${iconYPos} - 0.875rem)`}
									width='1.75rem'
									height='1.75rem'
									fill='black'
								/>
							);
						})}
					</mask>
				</defs>

				<g>
					<line
						x1='50%'
						y1='0'
						x2='50%'
						y2='9rem'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
					<line
						x1='50%'
						y1='9rem'
						x2='100%'
						y2='10rem'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
					<line
						x1='100%'
						y1='10rem'
						x2='100%'
						y2='calc(100% - 10rem)'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
					<line
						x1='100%'
						y1='calc(100% - 10rem)'
						x2='50%'
						y2='calc(100% - 9rem)'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
					<line
						x1='50%'
						y1='calc(100% - 9rem)'
						x2='50%'
						y2='100%'
						stroke='currentColor'
						strokeWidth='1'
						strokeDasharray='4 4'
						strokeLinecap='round'
						mask={`url(#${maskId})`}
					/>
				</g>

				{children && (
					<g
						style={{
							transform: `translate(50%, calc(calc(var(--icon-size) * var(--icon-scale-base)) / 2 + ${iconY}))`,
							transformOrigin: '0 0',
						}}
					>
						<foreignObject
							x={`calc(calc(var(--icon-size) * var(--icon-scale-base)) / -2)`}
							y={`calc(calc(var(--icon-size) * var(--icon-scale-base)) / -2)`}
							width={`calc(var(--icon-size) * var(--icon-scale-base))`}
							height={`calc(var(--icon-size) * var(--icon-scale-base))`}
							style={{
								transform: isVisible ? 'scale(1.3333)' : 'scale(1)',
								transformOrigin: '0 0',
								transition: 'transform 300ms',
							}}
						>
							<div
								ref={iconRef}
								className={cn(
									'flex h-full items-center justify-center',
									isVisible ? 'text-brand' : 'text-muted-foreground',
								)}
							>
								{children}
							</div>
						</foreignObject>
					</g>
				)}

				{/* App Icons */}
				<g>
					{Object.entries(appIcons).map(([slug, { icon }], index, arr) => {
						// top margin + 50% icon height + inset + (100% - y margins - y offsets - icon height) / gaps * (index - 1)
						const iconYPos = `calc(10rem + 0.875rem + 1rem + calc(calc(100% - 20rem - 2rem - 1.75rem) / ${arr.length - 1}) * ${index})`;
						// Map icon order to feature index: app-launchpad(0), devbox(1), database(2), ai-proxy(3), object-storage(4)
						const featureIndexMap: Record<string, number> = {
							'app-launchpad': 0,
							devbox: 1,
							database: 2,
							'ai-proxy': 3,
							'object-storage': 4,
						};
						const featureIndex = featureIndexMap[slug] ?? index;
						const isActive = activeIndex === featureIndex;

						return (
							<g
								key={`app-icon-${slug}`}
								style={{
									transform: `translate(100%, ${iconYPos})`,
									transformOrigin: '0 0',
								}}
							>
								<foreignObject
									x='-0.875rem'
									y='-0.875rem'
									width='1.75rem'
									height='1.75rem'
								>
									<button
										type='button'
										onClick={() => onIconClick?.(featureIndex)}
										className={cn(
											'hover:text-brand flex h-full w-full cursor-pointer items-center justify-center transition-colors outline-none focus:outline-none',
											isActive
												? 'text-brand'
												: 'text-muted-foreground/50 focus-visible:text-muted-foreground',
										)}
										aria-label={`切换到${slug}`}
									>
										<Icon
											src={icon}
											className='size-full'
										/>
									</button>
								</foreignObject>
							</g>
						);
					})}
				</g>
			</svg>
		</div>
	);
}
