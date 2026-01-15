'use client';

import React from 'react';

export interface TOCItem {
	id: string;
	text: string;
	level: number;
}

export interface VisibleHeading {
	level: number;
	content: string;
}

export function useTocHeadings() {
	const [toc, setToc] = React.useState<TOCItem[]>([]);
	const [activeId, setActiveId] = React.useState<string>('');
	const [visibleHeadings, setVisibleHeadings] = React.useState<VisibleHeading[]>([]);

	React.useEffect(() => {
		const headings = document.querySelectorAll('article h1, article h2, article h3');
		const items: TOCItem[] = Array.from(headings).map((heading) => ({
			id: heading.id,
			text: heading.textContent || '',
			level: Number(heading.tagName.charAt(1)),
		}));
		setToc(items);

		// Store heading data for Intersection Observer
		const headingDataMap = new Map<string, VisibleHeading>();
		for (const heading of headings) {
			headingDataMap.set(heading.id, {
				level: Number(heading.tagName.charAt(1)),
				content: heading.textContent || '',
			});
		}

		const observer = new IntersectionObserver(
			(entries) => {
				setVisibleHeadings((prev) => {
					const next = new Map<string, VisibleHeading>();
					// Keep existing visible headings
					for (const heading of prev) {
						next.set(heading.content, heading);
					}

					// Update based on intersection changes
					for (const entry of entries) {
						const data = headingDataMap.get(entry.target.id);
						if (!data) continue;

						if (entry.isIntersecting) {
							next.set(data.content, data);
						} else {
							next.delete(data.content);
						}
					}

					// Convert to array and sort by TOC order
					const visibleArray = Array.from(next.values());
					visibleArray.sort((a, b) => {
						const indexA = items.findIndex((item) => item.text === a.content);
						const indexB = items.findIndex((item) => item.text === b.content);
						return indexA - indexB;
					});

					// Active should be the first visible heading in viewport
					if (visibleArray.length > 0) {
						const first = visibleArray[0];
						if (first) {
							const match = items.find((i) => i.text === first.content);
							if (match) setActiveId(match.id);
						}
					}

					return visibleArray;
				});
			},
			{ rootMargin: '0px' },
		);

		for (const heading of headings) {
			observer.observe(heading);
		}

		// Initial check: manually check all headings to see which are currently visible
		const checkAllHeadings = () => {
			const visibleSet = new Set<string>();
			for (const heading of headings) {
				const rect = heading.getBoundingClientRect();
				const viewportTop = window.scrollY;
				const viewportBottom = viewportTop + window.innerHeight;
				const headingTop = rect.top + window.scrollY;
				const headingBottom = rect.bottom + window.scrollY;
				const isVisible = headingBottom > viewportTop && headingTop < viewportBottom;

				if (isVisible) {
					visibleSet.add(heading.id);
				}
			}

			if (visibleSet.size > 0) {
				setVisibleHeadings((_prev) => {
					const next = new Map<string, VisibleHeading>();
					for (const headingId of visibleSet) {
						const data = headingDataMap.get(headingId);
						if (data) {
							next.set(data.content, data);
						}
					}

					const visibleArray = Array.from(next.values());
					visibleArray.sort((a, b) => {
						const indexA = items.findIndex((item) => item.text === a.content);
						const indexB = items.findIndex((item) => item.text === b.content);
						return indexA - indexB;
					});

					// Set active to first visible on initial check as well
					if (visibleArray.length > 0) {
						const first = visibleArray[0];
						if (first) {
							const match = items.find((i) => i.text === first.content);
							if (match) setActiveId(match.id);
						}
					}

					return visibleArray;
				});
			}
		};

		setTimeout(checkAllHeadings, 100);

		return () => observer.disconnect();
	}, []);

	return { toc, activeId, visibleHeadings };
}
