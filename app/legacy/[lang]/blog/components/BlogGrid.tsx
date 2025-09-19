import type { BlogPost } from '@/libs/legacy/utils/blog-utils';
import type { languagesType } from '@/libs/legacy/utils/i18n';
import BlogItem from './BlogItem';

interface BlogGridProps {
	posts: BlogPost[];
	lang: languagesType;
}

export default function BlogGrid({ posts, lang }: BlogGridProps) {
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{posts.length > 0 ? (
				posts.map((page, index) => (
					<BlogItem
						key={index}
						page={page}
						priorityImage={index < 9}
					/>
				))
			) : (
				<div className='col-span-3 py-10 text-center'>
					<p className='text-muted-foreground text-lg'>No posts found.</p>
				</div>
			)}
		</div>
	);
}
