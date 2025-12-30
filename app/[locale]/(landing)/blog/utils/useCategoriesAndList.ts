'use client';

import { debounce } from 'radash';
import React from 'react';
import type { BlogCategory, BlogPost } from '@/libs/blog/types';

interface UseCategoriesAndListProps {
	initialCategories: BlogCategory[];
	initialPosts: BlogPost[];
	locale: string;
}

/**
 * Hook for managing blog post categories and search functionality.
 * Handles category filtering, search with debouncing, and search result management.
 *
 * @param props - Configuration object with initial categories, posts, and locale
 * @returns Object with state and handlers for categories and search
 */
export function useCategoriesAndList({
	initialCategories: _initialCategories,
	initialPosts,
	locale,
}: UseCategoriesAndListProps) {
	const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
	const [isSearchOpen, setIsSearchOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState('');
	const [searchResults, setSearchResults] = React.useState<BlogPost[]>([]);
	const [isPending, startTransition] = React.useTransition();

	const filteredPosts = React.useMemo(() => {
		if (!selectedCategory) return initialPosts;
		return initialPosts.filter((post) => post.category === selectedCategory);
	}, [selectedCategory, initialPosts]);

	const isSearching = searchQuery.trim().length > 0;
	const displayPosts = isSearching ? searchResults : filteredPosts;

	const stripLocalePrefix = React.useCallback((url: string): string => url.replace(/^\/(zh|en)(?=\/)/, ''), []);

	const searchParamsRef = React.useRef({
		locale,
		stripLocalePrefix,
		initialPosts,
	});
	React.useEffect(() => {
		searchParamsRef.current = { locale, stripLocalePrefix, initialPosts };
	}, [locale, stripLocalePrefix, initialPosts]);

	const performSearchRef = React.useRef(async (query: string, category: string | null) => {
		if (!query.trim()) {
			setSearchResults([]);
			return;
		}

		const {
			locale: currentLocale,
			stripLocalePrefix: currentStrip,
			initialPosts: currentPosts,
		} = searchParamsRef.current;

		startTransition(async () => {
			try {
				let searchUrl = `/api/search/blog?q=${encodeURIComponent(query)}&locale=${currentLocale}`;
				if (category) {
					searchUrl += `&category=${encodeURIComponent(category)}`;
				}

				const response = await fetch(searchUrl);
				const data = (await response.json()) as {
					result: Array<{ id: string; url: string }>;
				};

				if (data.result) {
					const foundPosts = data.result
						.map((item) => {
							const normalized = currentStrip(item.url);
							return currentPosts.find((post) => post.url === normalized);
						})
						.filter((post): post is BlogPost => post !== undefined);

					setSearchResults(foundPosts);
				} else {
					setSearchResults([]);
				}
			} catch (error) {
				console.error('Search error:', error);
				setSearchResults([]);
			}
		});
	});

	const performSearch = React.useCallback((query: string, category: string | null) => {
		return performSearchRef.current(query, category);
	}, []);

	const createDebouncedSearch = React.useCallback(() => {
		return debounce({ delay: 300 }, (query: string, category: string | null) => {
			performSearchRef.current(query, category);
		}) as ((query: string, category: string | null) => void) & {
			cancel: () => void;
		};
	}, []);

	const debouncedSearchRef = React.useRef<
		| (((query: string, category: string | null) => void) & {
				cancel: () => void;
		  })
		| null
	>(null);

	React.useEffect(() => {
		debouncedSearchRef.current = createDebouncedSearch();

		return () => {
			debouncedSearchRef.current?.cancel();
		};
	}, [createDebouncedSearch]);

	const prevSelectedCategoryRef = React.useRef(selectedCategory);
	const searchQueryRef = React.useRef(searchQuery);
	const selectedCategoryRef = React.useRef(selectedCategory);

	React.useEffect(() => {
		searchQueryRef.current = searchQuery;
	}, [searchQuery]);

	React.useEffect(() => {
		selectedCategoryRef.current = selectedCategory;
	}, [selectedCategory]);

	const handleSearchInput = React.useCallback(
		(query: string) => {
			setSearchQuery(query);

			if (!query.trim()) {
				debouncedSearchRef.current?.cancel();
				debouncedSearchRef.current = createDebouncedSearch();
				setSearchResults([]);
				return;
			}

			debouncedSearchRef.current?.(query.trim(), selectedCategoryRef.current);
		},
		[createDebouncedSearch],
	);

	React.useEffect(() => {
		if (isSearchOpen) {
			debouncedSearchRef.current?.cancel();
			debouncedSearchRef.current = createDebouncedSearch();
		}
	}, [isSearchOpen, createDebouncedSearch]);

	React.useEffect(() => {
		if (prevSelectedCategoryRef.current !== selectedCategory) {
			prevSelectedCategoryRef.current = selectedCategory;
			if (isSearchOpen && searchQueryRef.current.trim()) {
				debouncedSearchRef.current?.cancel();
				performSearch(searchQueryRef.current.trim(), selectedCategory);
				debouncedSearchRef.current = createDebouncedSearch();
			}
		}
	}, [selectedCategory, isSearchOpen, performSearch, createDebouncedSearch]);

	const handleCloseSearch = React.useCallback(() => {
		debouncedSearchRef.current?.cancel();
		debouncedSearchRef.current = createDebouncedSearch();
		setIsSearchOpen(false);
		setSearchQuery('');
		setSearchResults([]);
	}, [createDebouncedSearch]);

	const handleSelectCategory = React.useCallback(
		(category: string | null) => {
			setSelectedCategory(category);
			if (!isSearchOpen || !searchQuery.trim()) {
				setSearchQuery('');
				setSearchResults([]);
			}
		},
		[isSearchOpen, searchQuery],
	);

	return {
		selectedCategory,
		isSearchOpen,
		searchQuery,
		displayPosts,
		isSearching,
		isPending,
		setIsSearchOpen,
		handleSearchInput,
		handleCloseSearch,
		handleSelectCategory,
	};
}
