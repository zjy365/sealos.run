'use client';

import React from 'react';
import { cn } from '@/libs/utils/styling';

interface TOCItem {
	id: string;
	text: string;
	level: number;
}

export function TableOfContents() {
	const [toc, setToc] = React.useState<TOCItem[]>([]);
	const [activeId, setActiveId] = React.useState<string>('');

	React.useEffect(() => {
		// 从文章内容中提取标题
		const headings = document.querySelectorAll('article h2, article h3');
		const items: TOCItem[] = Array.from(headings).map((heading) => ({
			id: heading.id,
			text: heading.textContent || '',
			level: Number(heading.tagName.charAt(1)),
		}));
		setToc(items);

		// 监听滚动以高亮当前标题
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: '-80px 0px -80% 0px' },
		);

		for (const heading of headings) {
			observer.observe(heading);
		}

		return () => observer.disconnect();
	}, []);

	if (toc.length === 0) return null;

	return (
		<nav className='sticky top-20'>
			<div className='mb-3 flex items-center gap-3'>
				<svg
					className='text-muted-foreground size-4'
					viewBox='0 0 16 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>目录</title>
					<path
						d='M2 3h12M2 8h12M2 13h12'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
				<h2 className='text-foreground text-xl font-semibold'>目录</h2>
			</div>
			<ol className='border-border relative space-y-2 border-l-2 pl-4 text-base'>
				{toc.map((item, index) => (
					<li
						key={item.id}
						className={cn(item.level === 3 && 'ml-4')}
					>
						<a
							href={`#${item.id}`}
							className={cn(
								'text-muted-foreground hover:text-foreground block transition-colors',
								activeId === item.id && 'text-primary font-medium',
							)}
						>
							{item.level === 2 && `${index + 1}. `}
							{item.text}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
}
