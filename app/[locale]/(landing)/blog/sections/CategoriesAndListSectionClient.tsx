'use client';

import Image from 'next/image';
import { debounce } from 'radash';
import React from 'react';
import type { BlogCategory, BlogPost } from '@/libs/blog/types';
import { CalendarIcon, ClockIcon, EyeIcon, PersonIcon, SearchIcon, XIcon } from '@/libs/components/ui/sealos-icons';
import { Link } from '@/libs/i18n/navigation';
import { cn } from '@/libs/utils/styling';

// formatDate 函数移到客户端组件中，避免导入服务端代码
function formatDate(dateString: string, locale: string = 'zh'): string {
	const date = new Date(dateString);

	if (locale === 'zh') {
		return date.toLocaleDateString('zh-CN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	}

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

interface CategoriesAndListSectionClientProps {
	initialCategories: BlogCategory[];
	initialPosts: BlogPost[];
	locale: string;
}

// 搜索框组件
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
	if (!isOpen) {
		return (
			<button
				onClick={onOpen}
				className='flex size-10 items-center justify-center rounded-full border'
				type='button'
			>
				<SearchIcon className='text-brand size-5' />
			</button>
		);
	}

	return (
		<div className='flex h-10 items-center gap-2 rounded-full border pr-2 pl-4'>
			<input
				type='text'
				placeholder='搜索文章...'
				value={query}
				onChange={(e) => onQueryChange(e.target.value)}
				className='w-64 outline-none'
			/>
			<button
				onClick={onClose}
				className='flex size-10 items-center justify-center rounded-full'
				type='button'
			>
				<XIcon className='text-brand size-5' />
			</button>
		</div>
	);
}

// 分类筛选组件
function CategoryFilter({
	categories,
	selectedCategory,
	onSelectCategory,
}: {
	categories: BlogCategory[];
	selectedCategory: string | null;
	onSelectCategory: (category: string | null) => void;
}) {
	return (
		<aside className='w-40 shrink-0'>
			<nav className='sticky top-20 flex flex-col gap-5'>
				<button
					onClick={() => onSelectCategory(null)}
					className={cn(
						'flex items-center justify-center rounded-full border px-4 py-2 text-base transition-colors',
						!selectedCategory
							? 'border-primary bg-muted text-primary font-medium'
							: 'text-muted-foreground border-border bg-primary-foreground hover:border-primary',
					)}
					type='button'
				>
					全部
				</button>
				{categories.map((category) => (
					<button
						key={category.slug}
						onClick={() => onSelectCategory(category.name)}
						className={cn(
							'flex items-center justify-center rounded-full border px-4 py-2 text-base transition-colors',
							selectedCategory === category.name
								? 'border-primary bg-muted text-primary font-medium'
								: 'text-muted-foreground border-border bg-primary-foreground hover:border-primary',
						)}
						type='button'
					>
						{category.name}
					</button>
				))}
			</nav>
		</aside>
	);
}

// 文章列表组件
function PostList({
	posts,
	locale,
	isSearching,
	searchQuery,
}: {
	posts: BlogPost[];
	locale: string;
	isSearching: boolean;
	searchQuery: string;
}) {
	if (posts.length === 0) {
		return (
			<div className='py-16 text-center'>
				<SearchIcon className='text-muted-foreground mx-auto mb-4 size-16 opacity-50' />
				<p className='text-muted-foreground text-lg'>
					{isSearching ? `没有找到与 "${searchQuery}" 相关的文章` : '该分类下暂无文章'}
				</p>
				{isSearching && <p className='text-muted-foreground mt-2 text-sm'>尝试使用不同的关键词或清除搜索</p>}
			</div>
		);
	}

	return (
		<div className='grid grid-cols-2 gap-5'>
			{posts.slice(0, 6).map((post) => (
				<Link
					key={post.url}
					href={post.url}
					className='block h-full'
				>
					<article className='flex h-full flex-col overflow-hidden border transition-shadow hover:shadow-md'>
						<div className='flex flex-1 flex-col'>
							<div className='flex-1 p-6'>
								<h3 className='mb-3 line-clamp-1 text-xl leading-tight font-medium'>{post.title}</h3>
								<p className='text-muted-foreground line-clamp-2 text-base'>{post.description}</p>
							</div>

							<div className='relative aspect-[5/3] overflow-hidden border-zinc-200'>
								<Image
									src={post.thumbnail || '/sealos.svg'}
									alt={post.title}
									fill
									className='object-cover'
								/>
							</div>

							<div className='text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 px-6 pt-4 pb-2 text-sm'>
								<div className='flex items-center gap-1.5'>
									<PersonIcon className='text-brand size-4' />
									<span>{post.author}</span>
								</div>
								<div className='flex items-center gap-1.5'>
									<CalendarIcon className='text-brand size-4' />
									<span>{formatDate(post.date, locale)}</span>
								</div>
								<div className='flex items-center gap-1.5'>
									<ClockIcon className='text-brand size-4' />
									<span>{post.readingTime} 分钟阅读</span>
								</div>
								<div className='flex items-center gap-1.5'>
									<EyeIcon className='text-brand size-4' />
									<span>{post.views} 次查看</span>
								</div>
							</div>

							{post.tags && post.tags.length > 0 && (
								<div className='flex gap-2 px-6 pb-4'>
									{post.tags.slice(0, 2).map((tag) => (
										<span
											key={tag}
											className='border-brand text-muted-foreground border border-dashed px-3 py-1 text-sm'
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
					</article>
				</Link>
			))}
		</div>
	);
}

export default function CategoriesAndListSectionClient({
	initialCategories,
	initialPosts,
	locale,
}: CategoriesAndListSectionClientProps) {
	const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
	const [isSearchOpen, setIsSearchOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState('');
	const [searchResults, setSearchResults] = React.useState<BlogPost[]>([]);
	const [isPending, startTransition] = React.useTransition();

	// 按分类筛选文章（客户端过滤）
	const filteredPosts = React.useMemo(() => {
		if (!selectedCategory) return initialPosts;
		return initialPosts.filter((post) => post.category === selectedCategory);
	}, [selectedCategory, initialPosts]);

	const isSearching = searchQuery.trim().length > 0;
	const displayPosts = isSearching ? searchResults : filteredPosts;

	const stripLocalePrefix = React.useCallback((url: string): string => url.replace(/^\/(zh|en)(?=\/)/, ''), []);

	// 使用 ref 保存搜索参数，确保防抖函数始终使用最新值
	const searchParamsRef = React.useRef({
		locale,
		stripLocalePrefix,
		initialPosts,
	});
	React.useEffect(() => {
		searchParamsRef.current = { locale, stripLocalePrefix, initialPosts };
	}, [locale, stripLocalePrefix, initialPosts]);

	// 执行搜索请求 - 使用 ref 读取最新参数
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

	// performSearch 用于非防抖的立即搜索
	const performSearch = React.useCallback((query: string, category: string | null) => {
		return performSearchRef.current(query, category);
	}, []);

	// 创建防抖搜索函数的工厂函数
	const createDebouncedSearch = React.useCallback(() => {
		return debounce({ delay: 300 }, (query: string, category: string | null) => {
			performSearchRef.current(query, category);
		}) as ((query: string, category: string | null) => void) & {
			cancel: () => void;
		};
	}, []);

	// 创建防抖搜索函数（使用 ref 保持稳定）
	const debouncedSearchRef = React.useRef<
		| (((query: string, category: string | null) => void) & {
				cancel: () => void;
		  })
		| null
	>(null);

	// 初始化防抖函数
	React.useEffect(() => {
		debouncedSearchRef.current = createDebouncedSearch();

		return () => {
			debouncedSearchRef.current?.cancel();
		};
	}, [createDebouncedSearch]);

	// 使用 ref 跟踪上一次的 selectedCategory，用于检测分类变化
	const prevSelectedCategoryRef = React.useRef(selectedCategory);
	const searchQueryRef = React.useRef(searchQuery);
	const selectedCategoryRef = React.useRef(selectedCategory);

	// 保持 ref 同步
	React.useEffect(() => {
		searchQueryRef.current = searchQuery;
	}, [searchQuery]);

	React.useEffect(() => {
		selectedCategoryRef.current = selectedCategory;
	}, [selectedCategory]);

	// 处理搜索输入变化（直接使用防抖）
	const handleSearchInput = React.useCallback(
		(query: string) => {
			setSearchQuery(query);

			if (!query.trim()) {
				// 清空输入时，取消并重新创建防抖函数
				debouncedSearchRef.current?.cancel();
				debouncedSearchRef.current = createDebouncedSearch();
				setSearchResults([]);
				return;
			}

			// 直接调用防抖函数（从 ref 读取最新的 selectedCategory）
			debouncedSearchRef.current?.(query.trim(), selectedCategoryRef.current);
		},
		[createDebouncedSearch],
	);

	// 当搜索框打开时，重新创建防抖函数确保状态干净
	React.useEffect(() => {
		if (isSearchOpen) {
			debouncedSearchRef.current?.cancel();
			debouncedSearchRef.current = createDebouncedSearch();
		}
	}, [isSearchOpen, createDebouncedSearch]);

	// 当分类改变时，如果有搜索查询，立即重新搜索（不使用防抖）
	React.useEffect(() => {
		// 检测分类是否改变
		if (prevSelectedCategoryRef.current !== selectedCategory) {
			prevSelectedCategoryRef.current = selectedCategory;
			if (isSearchOpen && searchQueryRef.current.trim()) {
				// 分类改变时立即搜索，不使用防抖，然后重新创建防抖函数
				debouncedSearchRef.current?.cancel();
				performSearch(searchQueryRef.current.trim(), selectedCategory);
				debouncedSearchRef.current = createDebouncedSearch();
			}
		}
	}, [selectedCategory, isSearchOpen, performSearch, createDebouncedSearch]);

	// 关闭搜索框
	const handleCloseSearch = React.useCallback(() => {
		// 关闭搜索框时，取消并重新创建防抖函数
		debouncedSearchRef.current?.cancel();
		debouncedSearchRef.current = createDebouncedSearch();
		setIsSearchOpen(false);
		setSearchQuery('');
		setSearchResults([]);
	}, [createDebouncedSearch]);

	// 选择分类
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

	return (
		<section className='container pt-18 pb-32'>
			<div className='mb-8 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<SearchBox
						isOpen={isSearchOpen}
						query={searchQuery}
						onOpen={() => setIsSearchOpen(true)}
						onClose={handleCloseSearch}
						onQueryChange={handleSearchInput}
					/>
				</div>
			</div>

			<div className='flex gap-8'>
				<CategoryFilter
					categories={initialCategories}
					selectedCategory={selectedCategory}
					onSelectCategory={handleSelectCategory}
				/>

				<div className='relative flex-1'>
					{isPending && (
						<div className='absolute inset-0 z-10 flex items-center justify-center bg-white/50'>
							<div className='text-muted-foreground text-sm'>搜索中...</div>
						</div>
					)}
					<PostList
						posts={displayPosts}
						locale={locale}
						isSearching={isSearching}
						searchQuery={searchQuery}
					/>
				</div>
			</div>
		</section>
	);
}
