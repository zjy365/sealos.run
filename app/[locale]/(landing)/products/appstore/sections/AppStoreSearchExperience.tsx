'use client';

import Fuse from 'fuse.js';
import Image from 'next/image';
import { debounce } from 'radash';
import React from 'react';
import type { AppStoreCategory, AppStoreTemplate } from '@/libs/appstore/types';
import { HeroBgImage } from '../assets';
import { HeroSection } from './HeroSection';
import { TemplatesSectionClient } from './TemplatesSectionClient';

type AppStoreSearchExperienceProps = {
	templates: AppStoreTemplate[];
};

export function AppStoreSearchExperience({ templates }: AppStoreSearchExperienceProps) {
	const [query, setQuery] = React.useState('');
	const [settledQuery, setSettledQuery] = React.useState('');
	const [activeCategory, setActiveCategory] = React.useState<AppStoreCategory | null>('all');
	const [searchVersion, setSearchVersion] = React.useState(0);
	const [, startTransition] = React.useTransition();
	const fuse = React.useMemo(
		() =>
			new Fuse(templates, {
				includeScore: true,
				ignoreLocation: true,
				threshold: 0.4,
				keys: [
					{ name: 'title', weight: 0.45 },
					{ name: 'slug', weight: 0.25 },
					{ name: 'github', weight: 0.2 },
					{ name: 'description', weight: 0.1 },
				],
			}),
		[templates],
	);
	const runSettledSearch = React.useCallback((nextQuery: string) => {
		startTransition(() => {
			setSettledQuery(nextQuery);
			setSearchVersion((current) => current + 1);
		});
	}, []);

	const scrollToTemplates = React.useCallback(() => {
		window.requestAnimationFrame(() => {
			document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}, []);
	const debouncedSearchRef = React.useRef<
		| (((nextQuery: string) => void) & {
				cancel: () => void;
		  })
		| null
	>(null);

	React.useEffect(() => {
		debouncedSearchRef.current = debounce({ delay: 300 }, (nextQuery: string) => {
			runSettledSearch(nextQuery);
		});

		return () => {
			debouncedSearchRef.current?.cancel();
		};
	}, [runSettledSearch]);

	const searchedTemplates = React.useMemo(() => {
		if (!settledQuery) return templates;
		return fuse.search(settledQuery).map((result) => result.item);
	}, [settledQuery, fuse, templates]);

	const handleQueryChange = React.useCallback(
		(value: string) => {
			const trimmedValue = value.trim();

			setQuery(value);
			setActiveCategory((current) => {
				const nextCategory = trimmedValue ? null : 'all';
				return current === nextCategory ? current : nextCategory;
			});

			if (!trimmedValue) {
				debouncedSearchRef.current?.cancel();
				runSettledSearch('');
				return;
			}

			debouncedSearchRef.current?.(trimmedValue);
		},
		[runSettledSearch],
	);

	const handleSearch = React.useCallback(() => {
		debouncedSearchRef.current?.cancel();
		const trimmedQuery = query.trim();
		runSettledSearch(trimmedQuery);
		setActiveCategory(trimmedQuery ? null : 'all');
		scrollToTemplates();
	}, [query, runSettledSearch, scrollToTemplates]);

	const handleCategoryChange = React.useCallback((category: AppStoreCategory) => {
		debouncedSearchRef.current?.cancel();
		setQuery('');
		startTransition(() => {
			setSettledQuery('');
			setActiveCategory(category);
			setSearchVersion((current) => current + 1);
		});
	}, []);

	return (
		<>
			<section className='relative w-full overflow-hidden pt-64 pb-6'>
				<div className='pointer-events-none absolute inset-x-0 top-0 -z-10 select-none'>
					<Image
						src={HeroBgImage}
						alt=''
						priority
						className='mx-auto h-auto w-full max-w-360 min-w-200'
					/>
				</div>

				<div className='container mx-auto px-6'>
					<HeroSection
						query={query}
						onQueryChange={handleQueryChange}
						onSearch={handleSearch}
					/>
				</div>
			</section>

			<section className='container mx-auto px-6 py-16 pt-36'>
				<div
					id='templates'
					className='flex w-full flex-col items-center gap-12'
				>
					<div className='flex flex-col items-center gap-6 text-center'>
						<div className='text-foreground flex flex-col gap-3 text-xl leading-none font-semibold sm:text-3xl lg:flex-row'>
							<p>
								<span>已部署</span>
								<span className='text-brand'> 100,000+</span>
								<span> 应用实例</span>
							</p>
							<span className='hidden lg:inline'>|</span>
							<p>
								<span className='text-brand'>1000+</span>
								<span> GitHub项目模板</span>
							</p>
						</div>
					</div>

					<TemplatesSectionClient
						templates={searchedTemplates}
						activeCategory={activeCategory}
						onCategoryChange={handleCategoryChange}
						searchQuery={settledQuery}
						searchVersion={searchVersion}
					/>
				</div>
			</section>
		</>
	);
}
