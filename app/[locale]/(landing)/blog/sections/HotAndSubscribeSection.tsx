import { getAllPosts } from '@/libs/blog/utils';
import HotAndSubscribeView from './HotAndSubscribeView';

export default function HotAndSubscribeSection({ locale }: { locale: string }) {
	const recentPosts = getAllPosts(locale).slice(0, 3);

	return <HotAndSubscribeView recentPosts={recentPosts} />;
}
