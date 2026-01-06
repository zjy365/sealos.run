'use client';

import React from 'react';
import { AiProxyIcon, AppLaunchpadIcon, DatabaseIcon, DevboxIcon, ObjectStorageIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { cn } from '@/libs/utils/styling';

interface VerticalDashedLineProps {
	children?: React.ReactNode;
	iconY?: string;
	mask?: [string, string][];
	appIcons?: Record<string, { icon: React.ReactNode }>;
	activeIndex?: number | null;
	onIconClick?: (index: number) => void;
}

const DEFAULT_APP_ICONS: Record<string, { icon: React.ReactNode }> = {
	'app-launchpad': {
		icon: (
			<Icon
				src={AppLaunchpadIcon}
				className='size-full'
			/>
		),
	},
	devbox: {
		icon: (
			<Icon
				src={DevboxIcon}
				className='size-full'
			/>
		),
	},
	database: {
		icon: (
			<Icon
				src={DatabaseIcon}
				className='size-full'
			/>
		),
	},
	'ai-proxy': {
		icon: (
			<Icon
				src={AiProxyIcon}
				className='size-full'
			/>
		),
	},
	'object-storage': {
		icon: (
			<Icon
				src={ObjectStorageIcon}
				className='size-full'
			/>
		),
	},
};

export function FeaturesDecoLine({
	children,
	iconY = '0.5rem',
	mask,
	appIcons = DEFAULT_APP_ICONS,
	activeIndex,
	onIconClick,
}: VerticalDashedLineProps) {
	const iconRef = React.useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = React.useState(false);
	const maskId = React.useId();

	React.useEffect(() => {
		if (!iconRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					setIsVisible(entry.isIntersecting);
				}
			},
			{
				rootMargin: '-20% 0px -20% 0px',
				threshold: 0.1,
			},
		);

		observer.observe(iconRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div className='text-brand absolute top-0 left-6 z-0 h-full overflow-visible'>
			<svg
				className='h-full w-12'
				preserveAspectRatio='none'
				style={{ overflow: 'visible' }}
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
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
						{mask?.map(([y1, y2]) => (
							<rect
								key={`${y1}-${y2}`}
								x='0'
								y={y1}
								width='3rem'
								height={`calc(${y2} - ${y1})`}
								fill='black'
								transform='translate(-1.5rem, 0)'
							/>
						))}

						{/* App Icon masks */}
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
							transform: `translate(50%, calc(1.5rem + ${iconY}))`,
							transformOrigin: '0 0',
						}}
					>
						<foreignObject
							x='-1.5rem'
							y='-1.5rem'
							width='3rem'
							height='3rem'
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
											isActive ? 'text-brand' : 'text-muted-foreground/50',
										)}
										aria-label={`切换到${slug}`}
									>
										{icon}
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
