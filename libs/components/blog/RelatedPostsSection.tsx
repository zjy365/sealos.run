import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/libs/blog/types';
import { getAllPosts } from '@/libs/blog/utils';
import { Link } from '@/libs/i18n/navigation';

interface RelatedPostsSectionProps {
	currentPost: BlogPost;
	locale: string;
	limit?: number;
}

/**
 * Calculate relevance score between two posts.
 * Scoring factors:
 * - Same category: +5 points
 * - Common tags: +3 points per tag
 *
 * @param currentPost - The current post
 * @param candidatePost - The candidate post to score
 * @returns Relevance score
 */
function calculateRelevanceScore(currentPost: BlogPost, candidatePost: BlogPost): number {
	let score = 0;

	if (currentPost.category && candidatePost.category && currentPost.category === candidatePost.category) {
		score += 5;
	}

	const currentTags = new Set(currentPost.tags || []);
	const candidateTags = new Set(candidatePost.tags || []);
	const commonTags = [...currentTags].filter((tag) => candidateTags.has(tag));
	score += commonTags.length * 3;

	return score;
}

/**
 * Get related posts based on relevance score.
 * Sorted by score (descending), then by views (descending) if scores are equal.
 *
 * @param currentPost - The current post
 * @param allPosts - All available posts
 * @param limit - Maximum number of posts to return
 * @returns Array of related posts
 */
function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit: number = 5): BlogPost[] {
	const candidates = allPosts.filter((post) => post.slug !== currentPost.slug);

	const scoredPosts = candidates.map((post) => ({
		post,
		score: calculateRelevanceScore(currentPost, post),
	}));

	scoredPosts.sort((a, b) => {
		if (b.score !== a.score) {
			return b.score - a.score;
		}
		return b.post.views - a.post.views;
	});

	return scoredPosts.slice(0, limit).map((item) => item.post);
}

interface RelatedPostsSectionPropsWithTitle extends RelatedPostsSectionProps {
	title: string;
}

export function RelatedPostsSection({ currentPost, locale, limit = 5, title }: RelatedPostsSectionPropsWithTitle) {
	const allPosts = getAllPosts(locale);
	const relatedPosts = getRelatedPosts(currentPost, allPosts, limit);

	if (relatedPosts.length === 0) {
		return null;
	}

	return (
		<section>
			<h2 className='text-foreground mb-6 text-xl font-semibold'>{title}</h2>
			<div className='space-y-3'>
				{relatedPosts.map((post) => (
					<Link
						key={post.slug}
						href={post.url}
						className='text-muted-foreground hover:text-foreground flex items-center gap-3 transition-colors'
					>
						<span className='flex-1 truncate text-base'>{post.title}</span>
						<ArrowRight className='size-4 shrink-0' />
					</Link>
				))}
			</div>
		</section>
	);
}
