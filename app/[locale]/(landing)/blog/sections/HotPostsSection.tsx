import { getHotPosts } from '@/libs/blog/utils';
import HotPostsView from './HotPostsView';

export default function HotPostsSection({ locale }: { locale: string }) {
	const hotPosts = getHotPosts(locale, 3);

	return (
		<HotPostsView
			hotPosts={hotPosts}
			locale={locale}
		/>
	);
}
