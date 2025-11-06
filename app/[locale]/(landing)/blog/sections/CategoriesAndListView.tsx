'use client';

import Image from 'next/image';
import { formatDate } from '@/libs/blog/date-utils';
import type { BlogCategory, BlogPost } from '@/libs/blog/types';
import { CalendarIcon, ClockIcon, EyeIcon, PersonIcon, SearchIcon, XIcon } from '@/libs/components/ui/sealos-icons';
import { useTRich } from '@/libs/i18n/client';
import { Link } from '@/libs/i18n/navigation';
import { cn } from '@/libs/utils/styling';
import { useCategoriesAndList } from './useCategoriesAndList';

interface CategoriesAndListViewProps {
	initialCategories: BlogCategory[];
	initialPosts: BlogPost[];
	locale: string;
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
	const t = useTRich('pages.blog.sections.categoriesAndList');
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
				placeholder={t('searchPlaceholder')}
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

function CategoryFilter({
	categories,
	selectedCategory,
	onSelectCategory,
}: {
	categories: BlogCategory[];
	selectedCategory: string | null;
	onSelectCategory: (category: string | null) => void;
}) {
	const t = useTRich('pages.blog.sections.categoriesAndList');
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
					{t('allCategories')}
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
	const t = useTRich('pages.blog.sections.categoriesAndList');
	if (posts.length === 0) {
		return (
			<div className='py-16 text-center'>
				<SearchIcon className='text-muted-foreground mx-auto mb-4 size-16 opacity-50' />
				<p className='text-muted-foreground text-lg'>
					{isSearching ? t('noResultsFound', { query: searchQuery }) : t('noPostsInCategory')}
				</p>
				{isSearching && <p className='text-muted-foreground mt-2 text-sm'>{t('tryDifferentKeywords')}</p>}
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
									<span>{t('readingTime', { minutes: post.readingTime })}</span>
								</div>
								<div className='flex items-center gap-1.5'>
									<EyeIcon className='text-brand size-4' />
									<span>{t('views', { views: post.views })}</span>
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

export default function CategoriesAndListView({ initialCategories, initialPosts, locale }: CategoriesAndListViewProps) {
	const {
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
	} = useCategoriesAndList({ initialCategories, initialPosts, locale });
	const t = useTRich('pages.blog.sections.categoriesAndList');

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
							<div className='text-muted-foreground text-sm'>{t('searching')}</div>
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
