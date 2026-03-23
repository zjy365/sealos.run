'use client';

import React from 'react';
import type { TOCItem, VisibleHeading } from './useTocHeadings';

// Inline getLineOffset function
function getLineOffset(level: number): number {
	return level >= 3 ? 14 : 0;
}

export interface SVGData {
	path: string;
	width: number;
	height: number;
	top: number;
	gradientStart?: number;
	gradientEnd?: number;
}

export function useTocSvg(
	toc: TOCItem[],
	activeId: string,
	visibleHeadings: VisibleHeading[],
	containerRef: React.RefObject<HTMLOListElement | null>,
) {
	const [svg, setSvg] = React.useState<SVGData>();
	const [highlightSvg, setHighlightSvg] = React.useState<SVGData>();

	const updateSvg = React.useCallback(() => {
		if (!containerRef.current || toc.length === 0) return;

		const container = containerRef.current;

		if (container.clientHeight === 0) return;

		let w = 0;
		let h = 0;
		const d: string[] = [];

		for (let i = 0; i < toc.length; i++) {
			const item = toc[i];
			if (!item) continue;
			const element: HTMLElement | null = container.querySelector(`a[href="#${item.id}"]`);

			if (!element) continue;

			const styles = getComputedStyle(element);
			const offset = getLineOffset(item.level) + 1;
			const top = element.offsetTop + (parseFloat(styles.paddingTop) || 0);
			const bottom = element.offsetTop + element.clientHeight - (parseFloat(styles.paddingBottom) || 0);

			w = Math.max(offset + 2, w);
			h = Math.max(h, bottom);

			if (i > 0) {
				const prevItem = toc[i - 1];
				if (!prevItem) continue;
				const prevOffset = getLineOffset(prevItem.level) + 1;
				if (prevOffset !== offset) {
					const prevElement: HTMLElement | null = container.querySelector(`a[href="#${prevItem.id}"]`);
					if (prevElement) {
						const prevStyles = getComputedStyle(prevElement);
						const prevBottom =
							prevElement.offsetTop +
							prevElement.clientHeight -
							(parseFloat(prevStyles.paddingBottom) || 0);
						d.push(`L${prevOffset} ${prevBottom}`);
						d.push(`L${offset} ${top}`);
					}
				} else {
					d.push(`L${offset} ${top}`);
				}
			} else {
				d.push(`M${offset} ${top}`);
			}

			d.push(`L${offset} ${bottom}`);
		}

		if (d.length > 0) {
			setSvg({
				path: d.join(' '),
				width: w,
				height: h,
				top: 0,
			});
		}
	}, [toc, containerRef]);

	// Calculate highlight SVG based on svg, activeId, and visible headings
	React.useEffect(() => {
		if (!activeId || !svg || !containerRef.current || visibleHeadings.length === 0) {
			setHighlightSvg(undefined);
			return;
		}

		const container = containerRef.current;

		// Find first and last visible headings
		const firstVisible = visibleHeadings[0];
		const lastVisible = visibleHeadings[visibleHeadings.length - 1];

		if (!firstVisible || !lastVisible) {
			setHighlightSvg(undefined);
			return;
		}

		// Find corresponding TOC items by content
		const firstTocItem = toc.find((item) => item.text === firstVisible.content);
		const lastTocItem = toc.find((item) => item.text === lastVisible.content);

		if (!firstTocItem || !lastTocItem) {
			setHighlightSvg(undefined);
			return;
		}

		// Calculate gradient positions based on first and last visible headings
		let gradientStart = 0;
		let gradientEnd = 100;
		if (svg.height > 0) {
			// Get first visible heading position
			const firstElement: HTMLElement | null = container.querySelector(`a[href="#${firstTocItem.id}"]`);
			if (firstElement) {
				const firstStyles = getComputedStyle(firstElement);
				const firstTop = firstElement.offsetTop + (parseFloat(firstStyles.paddingTop) || 0);
				gradientStart = (firstTop / svg.height) * 100;
			}

			// Get last visible heading position
			const lastElement: HTMLElement | null = container.querySelector(`a[href="#${lastTocItem.id}"]`);
			if (lastElement) {
				const lastStyles = getComputedStyle(lastElement);
				const lastBottom =
					lastElement.offsetTop + lastElement.clientHeight - (parseFloat(lastStyles.paddingBottom) || 0);
				gradientEnd = (lastBottom / svg.height) * 100;
			}
		}

		setHighlightSvg({
			path: svg.path,
			width: svg.width,
			height: svg.height,
			top: 0,
			gradientStart,
			gradientEnd,
		});
	}, [svg, activeId, toc, visibleHeadings, containerRef]);

	React.useEffect(() => {
		if (!containerRef.current) return;

		const observer = new ResizeObserver(updateSvg);
		observer.observe(containerRef.current);

		updateSvg();

		const handleScroll = () => {
			updateSvg();
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	}, [updateSvg, containerRef]);

	return { svg, highlightSvg };
}
