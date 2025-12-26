'use client';

import React from 'react';
import { useTranslations } from '@/libs/i18n/client';
import { cn } from '@/libs/utils/styling';
import TocBackgroundSVG from './TocBackgroundSVG';
import TocHighlightSVG from './TocHighlightSVG';
import { useTocHeadings } from './useTocHeadings';
import { useTocSvg } from './useTocSvg';

export function TableOfContents() {
	const t = useTranslations('pages.blog.tableOfContents');
	const containerRef = React.useRef<HTMLOListElement>(null);
	const containerWrapperRef = React.useRef<HTMLDivElement>(null);
	const gradientIdRef = React.useRef(`highlight-gradient-${Math.random().toString(36).substring(2, 9)}`);

	const { toc, activeId, visibleHeadings } = useTocHeadings();
	const { svg, highlightSvg } = useTocSvg(toc, activeId, visibleHeadings, containerRef);

	// Calculate container height based on viewport
	const [containerHeight, setContainerHeight] = React.useState<number | undefined>(undefined);

	React.useEffect(() => {
		const updateHeight = () => {
			if (containerWrapperRef.current) {
				const rect = containerWrapperRef.current.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				const topOffset = rect.top;
				const availableHeight = viewportHeight - topOffset - 20; // 20px padding
				setContainerHeight(Math.max(200, availableHeight));
			}
		};

		updateHeight();
		window.addEventListener('resize', updateHeight);
		window.addEventListener('scroll', updateHeight, { passive: true });

		return () => {
			window.removeEventListener('resize', updateHeight);
			window.removeEventListener('scroll', updateHeight);
		};
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
					<title>{t('title')}</title>
					<path
						d='M2 3h12M2 8h12M2 13h12'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
				<h2 className='text-foreground text-xl font-semibold'>{t('title')}</h2>
			</div>
			<div
				ref={containerWrapperRef}
				className='relative overflow-visible overflow-y-auto pr-2'
				style={{
					paddingLeft: '16px',
					maxHeight: containerHeight ? `${containerHeight}px` : undefined,
				}}
			>
				{svg && (
					<TocBackgroundSVG
						path={svg.path}
						width={svg.width}
						height={svg.height}
					/>
				)}
				{highlightSvg && (
					<TocHighlightSVG
						path={highlightSvg.path}
						width={highlightSvg.width}
						height={highlightSvg.height}
						gradientId={gradientIdRef.current}
						gradientStart={highlightSvg.gradientStart}
						gradientEnd={highlightSvg.gradientEnd}
					/>
				)}
				<ol
					ref={containerRef}
					className='relative space-y-2 pl-4 text-base'
					style={{ paddingLeft: '1rem' }}
				>
					{toc.map((item) => (
						<li
							key={item.id}
							className={cn(item.level === 3 && 'ml-4')}
						>
							<a
								href={`#${item.id}`}
								className={cn(
									'text-muted-foreground hover:text-foreground block py-1.5 transition-colors',
									activeId === item.id && 'text-primary font-medium',
								)}
							>
								{item.text}
							</a>
						</li>
					))}
				</ol>
			</div>
		</nav>
	);
}
