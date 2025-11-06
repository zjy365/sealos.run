import { getAllCategories, getAllPosts } from '@/libs/blog/utils';
import CategoriesAndListSectionClient from './CategoriesAndListSectionClient';

export default function CategoriesAndListSection({ locale }: { locale: string }) {
	const categories = getAllCategories(locale);
	const posts = getAllPosts(locale);

	return (
		<CategoriesAndListSectionClient
			initialCategories={categories}
			initialPosts={posts}
			locale={locale}
		/>
	);
}
