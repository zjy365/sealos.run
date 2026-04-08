'use client';

import Image from 'next/image';
import React from 'react';
import { AppIcon, FlatArrowRightIcon, FramedPlusIcon } from '@/assets/icons';
import { getAiproxyOwnerIcon } from '@/libs/aiproxy/icons';
import { Icon } from '@/libs/components/ui/icon';
import { Link, usePathname } from '@/libs/i18n/navigation';
import { cn } from '@/libs/utils/styling';
import type {
	AIProxyProviderPanelData,
	AppStoreCategoryPanelData,
	NavMenuItem,
	ProductsPanelData,
} from './products-panel.types';
import {
	DATABASE_FEATURES,
	DEVBOX_TEMPLATES,
	LAUNCHPAD_FEATURES,
	NAV_MENU_ITEMS_BASE,
	OSS_STORAGE_TYPES,
} from './products-panel-data';

function PanelTabsWithMore({ children, moreHref }: { children: React.ReactNode; moreHref: string }) {
	return (
		<div className='border-border flex items-start justify-between gap-4'>
			<div className='max-w-full min-w-0 flex-1 overflow-x-auto'>
				<div className='flex w-max gap-1'>{children}</div>
			</div>
			<Link
				href={moreHref}
				className='text-muted-foreground hover:text-foreground shrink-0 rounded-t-md px-3 py-2 text-xs transition-colors'
			>
				更多
			</Link>
		</div>
	);
}

function getNavMenuItems({ aiproxyProviders, appStoreCategories }: ProductsPanelData): NavMenuItem[] {
	return NAV_MENU_ITEMS_BASE.map((item) => {
		switch (item.id) {
			case 'launchpad':
				return {
					...item,
					content: item.content ? { ...item.content, features: <LaunchpadFeatures /> } : item.content,
				};
			case 'database':
				return {
					...item,
					content: item.content ? { ...item.content, features: <DatabaseFeatures /> } : item.content,
				};
			case 'oss':
				return {
					...item,
					content: item.content ? { ...item.content, features: <OSSFeatures /> } : item.content,
				};
			case 'devbox':
				return {
					...item,
					content: item.content ? { ...item.content, features: <DevBoxFeatures /> } : item.content,
				};
			case 'aiproxy':
				return {
					...item,
					content: item.content
						? {
								...item.content,
								features: <AIProxyFeatures providers={aiproxyProviders} />,
							}
						: item.content,
				};
			case 'app':
				return {
					...item,
					content: item.content
						? {
								...item.content,
								features: <AppStoreFeatures categories={appStoreCategories} />,
							}
						: item.content,
				};
			default:
				return item;
		}
	});
}

function LaunchpadFeatures() {
	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='grid grid-cols-2 gap-6'>
				{LAUNCHPAD_FEATURES.map((feature) => (
					<Link
						href={feature.href}
						key={feature.title}
					>
						<div
							key={feature.title}
							className='group flex items-center gap-3 bg-linear-to-r from-white via-white to-white px-0 py-3 transition-colors hover:via-blue-100'
						>
							<div className='text-primary size-6 shrink-0'>
								<Icon
									src={feature.icon}
									className='text-brand size-6'
								/>
							</div>
							<div className='flex flex-1 flex-col gap-1'>
								<h4 className='text-foreground text-sm font-normal'>{feature.title}</h4>
								<p className='text-muted-foreground text-xs'>{feature.description}</p>
							</div>

							<Icon
								src={FlatArrowRightIcon}
								className='text-muted-foreground group-hover:text-brand size-6 stroke-2'
							/>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

function DatabaseFeatures() {
	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='grid grid-cols-3 gap-2.5'>
				{DATABASE_FEATURES.map((db) => (
					<Link
						href={db.href}
						key={db.name}
					>
						<div
							key={db.name}
							className='border-border group flex items-center border bg-linear-to-r from-white via-white to-white p-5 transition-colors hover:via-blue-100'
						>
							<div className='w-full'>
								<div className='flex size-8 items-center justify-center'>
									<Icon
										src={db.icon}
										className='size-8'
									/>
								</div>
								<p className='text-foreground mt-2 text-xs'>{db.name}</p>
							</div>
							<div className='size-6'>
								<Icon
									src={FramedPlusIcon}
									className='group-hover:text-brand size-full'
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

function OSSFeatures() {
	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='grid grid-cols-2 gap-6 py-3'>
				{OSS_STORAGE_TYPES.map((type) => (
					<div
						key={type.title}
						className='flex items-start gap-3'
					>
						<div className='text-primary size-6 shrink-0'>
							<Icon
								src={type.icon}
								className='text-brand size-6'
							/>
						</div>
						<div className='flex flex-1 flex-col gap-1'>
							<h4 className='text-foreground text-sm font-normal'>{type.title}</h4>
							<p className='text-muted-foreground text-xs'>{type.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function DevBoxFeatures() {
	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='grid grid-cols-4 gap-2.5'>
				{DEVBOX_TEMPLATES.map((template) => (
					<Link
						href={template.href}
						key={template.name}
					>
						<div
							key={template.name}
							className='border-border group flex items-center border bg-linear-to-r from-white via-white to-white px-3 py-4 transition-colors hover:via-blue-100'
						>
							<div className='flex w-full items-center gap-2'>
								{template.icon ? (
									<div className='flex size-6 items-center justify-center'>
										<Icon
											src={template.icon}
											className={template.name === '更多' ? 'text-brand size-6' : 'size-6'}
										/>
									</div>
								) : (
									<div className='size-6' />
								)}
								<p className='text-foreground text-xs'>{template.name}</p>
							</div>

							<div className='size-5'>
								<Icon
									src={FramedPlusIcon}
									className='group-hover:text-brand size-full'
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

function AIProxyFeatures({ providers }: { providers: AIProxyProviderPanelData[] }) {
	const defaultProvider = providers[0]?.ownerLabel ?? '';
	const [activeProvider, setActiveProvider] = React.useState(defaultProvider);

	React.useEffect(() => {
		if (!providers.some((provider) => provider.ownerLabel === activeProvider)) {
			setActiveProvider(defaultProvider);
		}
	}, [activeProvider, defaultProvider, providers]);

	const activeItems = providers.find((provider) => provider.ownerLabel === activeProvider) ?? providers[0];

	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='flex flex-col gap-5'>
				<PanelTabsWithMore moreHref='/products/aiproxy'>
					{providers.map((provider) => (
						<button
							key={provider.ownerKey}
							type='button'
							onClick={() => setActiveProvider(provider.ownerLabel)}
							className={cn(
								'hover:bg-input shrink-0 rounded-t-md px-3 py-2 text-xs transition-colors',
								activeProvider === provider.ownerLabel
									? 'text-foreground border-brand border-b-2'
									: 'text-muted-foreground hover:text-foreground hover:rounded-md',
							)}
						>
							{provider.ownerLabel}
						</button>
					))}
				</PanelTabsWithMore>

				<div className='grid grid-cols-3 gap-2.5'>
					{activeItems?.models.map((item) => (
						<Link
							href={item.href}
							key={item.name}
						>
							<div className='border-border group flex items-center border bg-linear-to-r from-white via-white to-white px-3 py-4 transition-colors hover:via-blue-100'>
								<div className='flex w-full items-center gap-2'>
									<div className='bg-muted flex size-6 items-center justify-center overflow-hidden rounded-full'>
										<Icon
											src={getAiproxyOwnerIcon(activeItems.ownerKey)}
											className='size-4'
										/>
									</div>
									<p className='text-foreground text-xs'>{item.name}</p>
								</div>

								<div className='size-5'>
									<Icon
										src={FramedPlusIcon}
										className='group-hover:text-brand size-full'
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

function PanelAppIcon({ alt, src }: { alt: string; src?: string }) {
	const [failedSrc, setFailedSrc] = React.useState<string | null>(null);

	if (!src || failedSrc === src) {
		return (
			<div className='bg-muted flex size-6 items-center justify-center overflow-hidden rounded-md'>
				<Icon
					src={AppIcon}
					className='text-foreground size-3.5'
				/>
			</div>
		);
	}

	return (
		<div className='bg-muted flex size-6 items-center justify-center overflow-hidden rounded-md'>
			{/* biome-ignore lint/performance/noImgElement: panel app icons are remote images from content frontmatter. */}
			<img
				alt={alt}
				className='size-full object-cover'
				onError={() => setFailedSrc(src)}
				src={src}
			/>
		</div>
	);
}

function AppStoreAppCard({ href, thumbnail, title }: { href: string; thumbnail?: string; title: string }) {
	return (
		<Link href={href}>
			<div className='border-border group flex items-center border bg-linear-to-r from-white via-white to-white px-3 py-4 transition-colors hover:via-blue-100'>
				<div className='flex w-full items-center gap-2'>
					<PanelAppIcon
						alt={title}
						src={thumbnail}
					/>
					<div className='flex min-w-0 flex-col gap-0.5'>
						<p className='text-foreground truncate text-xs'>{title}</p>
					</div>
				</div>

				<div className='size-5'>
					<Icon
						src={FramedPlusIcon}
						className='group-hover:text-brand size-full'
					/>
				</div>
			</div>
		</Link>
	);
}

function AppStoreMoreCard() {
	return (
		<Link href='/products/appstore'>
			<div className='border-border group flex items-center border bg-linear-to-r from-white via-white to-white px-3 py-4 transition-colors hover:via-blue-100'>
				<div className='flex w-full items-center gap-2'>
					<div className='bg-muted flex size-6 items-center justify-center overflow-hidden rounded-md'>
						<Icon
							src={FramedPlusIcon}
							className='text-brand size-4'
						/>
					</div>
					<p className='text-foreground text-xs'>更多</p>
				</div>

				<div className='size-5'>
					<Icon
						src={FramedPlusIcon}
						className='group-hover:text-brand size-full'
					/>
				</div>
			</div>
		</Link>
	);
}

function AppStoreFeatures({ categories }: { categories: AppStoreCategoryPanelData[] }) {
	const defaultCategory = categories[0]?.slug ?? '';
	const [activeCategory, setActiveCategory] = React.useState(defaultCategory);

	React.useEffect(() => {
		if (!categories.some((category) => category.slug === activeCategory)) {
			setActiveCategory(defaultCategory);
		}
	}, [activeCategory, categories, defaultCategory]);

	const activeItems = categories.find((category) => category.slug === activeCategory) ?? categories[0];
	const compactApps = activeItems?.apps.slice(0, 5) ?? [];
	const expandedApps = activeItems?.apps.slice(0, 9) ?? [];

	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='flex flex-col gap-5'>
				<PanelTabsWithMore moreHref='/products/appstore'>
					{categories.map((category) => (
						<button
							key={category.slug}
							type='button'
							onClick={() => setActiveCategory(category.slug)}
							className={cn(
								'hover:bg-input shrink-0 rounded-t-md px-3 py-2 text-xs transition-colors',
								activeCategory === category.slug
									? 'text-foreground border-brand border-b-2'
									: 'text-muted-foreground hover:text-foreground hover:rounded-md',
							)}
						>
							{category.label}
						</button>
					))}
				</PanelTabsWithMore>

				<div className='grid grid-cols-3 gap-2.5 xl:hidden'>
					{compactApps.map((app) => (
						<AppStoreAppCard
							key={app.href}
							href={app.href}
							thumbnail={app.thumbnail}
							title={app.title}
						/>
					))}
					<AppStoreMoreCard />
				</div>

				<div className='hidden grid-cols-5 gap-2.5 xl:grid'>
					{expandedApps.map((app) => (
						<AppStoreAppCard
							key={app.href}
							href={app.href}
							thumbnail={app.thumbnail}
							title={app.title}
						/>
					))}
					<AppStoreMoreCard />
				</div>
			</div>
		</div>
	);
}

export function ProductsPanel({ aiproxyProviders, appStoreCategories }: ProductsPanelData) {
	const pathname = usePathname();
	const navMenuItems = React.useMemo(
		() => getNavMenuItems({ aiproxyProviders, appStoreCategories }),
		[aiproxyProviders, appStoreCategories],
	);

	const getMatchedItem = React.useCallback(
		(path: string | null | undefined) => {
			if (!path) return null;
			// Prefer the longest matching href prefix
			const withHref = navMenuItems.filter((i) => i.content?.href);
			const matched = withHref
				.filter((i) => path === i.content?.href || path.startsWith(`${i.content?.href}/`))
				.sort((a, b) => b.content?.href?.length ?? 0 - (a.content?.href?.length ?? 1))
				.at(0);
			return matched ?? null;
		},
		[navMenuItems],
	);

	const [selectedItem, setSelectedItem] = React.useState<NavMenuItem | null>(
		getMatchedItem(pathname) || navMenuItems.find((item) => item.content) || null,
	);

	const prevPathnameRef = React.useRef(pathname);
	React.useEffect(() => {
		if (prevPathnameRef.current === pathname) return;
		prevPathnameRef.current = pathname;
		const matched = getMatchedItem(pathname);
		if (matched) setSelectedItem(matched);
	}, [getMatchedItem, pathname]);

	return (
		<div className='container flex h-full w-full border-dashed p-0'>
			{/* Left Sidebar */}
			<div className='flex w-64 flex-col gap-2 border-dashed px-6 py-8'>
				{navMenuItems.map((item) => {
					const href = item.content?.href;
					const isActive = !!href && (pathname === href || (pathname?.startsWith(`${href}/`) ?? false));
					const isSelected = selectedItem?.id === item.id;
					return (
						<button
							key={item.id}
							type='button'
							onClick={() => setSelectedItem(item)}
							className={cn(
								'flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors',
								isSelected
									? 'text-brand bg-blue-100 font-medium'
									: isActive
										? 'text-foreground'
										: 'text-muted-foreground hover:bg-blue-100',
							)}
						>
							<div
								className={cn(
									'flex size-5 items-center justify-center',
									isSelected || isActive ? 'text-brand' : 'text-muted-foreground',
								)}
							>
								<Icon
									src={item.icon}
									className='size-full'
								/>
							</div>
							<span>{item.label}</span>
						</button>
					);
				})}
			</div>

			{/* Right Content */}
			{selectedItem?.content && (
				<div className='bg-card flex min-w-0 flex-1 flex-col overflow-hidden'>
					<Link href={selectedItem.content.href ?? '#'}>
						{/* Header */}
						<div
							className={cn(
								'group flex items-center justify-between bg-linear-to-r from-white via-white to-white px-8 py-6 transition-colors',
								selectedItem.content.href && 'hover:via-blue-100',
							)}
						>
							<div className='flex items-center gap-4'>
								{selectedItem.largeImage && (
									<div className='flex size-12 shrink-0 items-center justify-center'>
										<Image
											src={selectedItem.largeImage}
											alt={selectedItem.largeImageAlt || ''}
											className='size-12'
										/>
									</div>
								)}
								<div className='flex flex-col gap-1'>
									<h3 className='text-foreground text-base font-normal'>
										{selectedItem.content.title}
									</h3>
									<p className='text-muted-foreground text-xs'>{selectedItem.content.description}</p>
								</div>
							</div>
							{selectedItem.content.href && (
								<Icon
									src={FlatArrowRightIcon}
									className='group-hover:text-brand size-6 stroke-2'
								/>
							)}
						</div>
					</Link>

					<div className='border-brand border-hairline mx-8 w-[calc(100%-4rem)] border-t border-dashed' />

					{/* Features Content */}
					{selectedItem.content.features}
				</div>
			)}
		</div>
	);
}
