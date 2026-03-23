import { getAllCategories, getAllPosts } from '@/libs/blog/utils';
import CategoriesAndListView from '../components/CategoriesAndListView';

export default function CategoriesAndListSection({ locale }: { locale: string }) {
	const categories = getAllCategories(locale);
	const posts = getAllPosts(locale);

	return (
		<CategoriesAndListView
			initialCategories={categories}
			initialPosts={posts}
			locale={locale}
		/>
	);
}
