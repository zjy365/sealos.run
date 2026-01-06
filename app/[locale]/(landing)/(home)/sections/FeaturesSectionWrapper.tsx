'use client';

import { animate, motion, useMotionValue, useMotionValueEvent, useScroll } from 'motion/react';
import React from 'react';
import { CloudBoxIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { FeaturesDecoLineWrapper } from '../components/FeaturesScene/FeaturesDecoLineWrapper';
import { FeaturesSection } from './FeaturesSection';

const TOTAL_ITEMS = 5;
const SECTION_HEIGHT_REM = 42.5;
const SECTION_HEIGHT_VH = 50;

export function FeaturesSectionWrapper() {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const sectionHeightRef = React.useRef<number>(0);
	const containerOffsetRef = React.useRef<number>(0);
	const scrollProgress = useMotionValue(0);
	const spacerHeight = useMotionValue(0);
	const [activeBoxIndex, setActiveBoxIndex] = React.useState<number | null>(0);
	const marginBottom = useMotionValue(0);

	const TOP_OFFSET = 128;

	const { scrollY } = useScroll();

	React.useEffect(() => {
		const calculateSectionHeight = () => {
			const viewportHeight = window.innerHeight;
			const sectionHeightRem = SECTION_HEIGHT_REM * 16;
			const sectionHeightVh = (SECTION_HEIGHT_VH * viewportHeight) / 100;
			sectionHeightRef.current = Math.max(sectionHeightRem, sectionHeightVh);
		};

		const updateContainerOffset = () => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				containerOffsetRef.current = rect.top + window.scrollY;
			}
		};

		const handleResize = () => {
			calculateSectionHeight();
			updateContainerOffset();
		};

		calculateSectionHeight();
		updateContainerOffset();

		const timeoutId = setTimeout(() => {
			updateContainerOffset();
		}, 0);

		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (!containerRef.current || sectionHeightRef.current === 0) {
			scrollProgress.set(0);
			spacerHeight.set(0);
			marginBottom.set(0);
			return;
		}

		const containerTop = containerOffsetRef.current - latest;
		const scrollStartPoint = TOP_OFFSET;
		const maxSpacerHeight = sectionHeightRef.current * (TOTAL_ITEMS - 1);

		if (containerTop > 0) {
			scrollProgress.set(0);
		} else {
			const progress = Math.abs(containerTop);
			const currentProgress = progress / sectionHeightRef.current;
			animate(scrollProgress, currentProgress, {
				duration: 0.1,
				ease: 'linear',
			});
		}

		if (containerTop > scrollStartPoint) {
			spacerHeight.set(0);
			marginBottom.set(0);
		} else {
			const scrollDistance = scrollStartPoint - containerTop;
			const spacerHeightValue = Math.min(scrollDistance, maxSpacerHeight);
			spacerHeight.set(spacerHeightValue);
			marginBottom.set(spacerHeightValue);
		}
	});

	useMotionValueEvent(scrollProgress, 'change', (latest) => {
		const index = Math.floor(latest);
		const clampedIndex = Math.min(Math.max(0, index), TOTAL_ITEMS - 1);
		setActiveBoxIndex(clampedIndex);
	});

	return (
		<>
			<section
				ref={containerRef}
				className='relative container mx-auto pr-6 pl-32'
			>
				<motion.div
					className='sticky top-32 z-0'
					style={{
						height: `${SECTION_HEIGHT_REM}rem`,
					}}
				>
					<div
						className='absolute top-0 left-0 z-10'
						style={{
							height: `${SECTION_HEIGHT_REM}rem`,
							width: '3rem',
							marginLeft: '-8rem',
						}}
					>
						<FeaturesDecoLineWrapper
							mask={[['1rem', '3.25rem']]}
							activeIndex={activeBoxIndex}
						>
							<Icon
								src={CloudBoxIcon}
								className='size-full'
							/>
						</FeaturesDecoLineWrapper>
					</div>

					<div className='relative h-full'>
						<FeaturesSection activeBoxIndex={activeBoxIndex} />
					</div>
				</motion.div>

				{Array.from({ length: TOTAL_ITEMS - 1 }).map((_, index) => {
					const sectionHeightRem = `${SECTION_HEIGHT_REM}rem`;
					const sectionHeightVh = `${SECTION_HEIGHT_VH}vh`;
					return (
						<motion.div
							// biome-ignore lint/suspicious/noArrayIndexKey: static sections
							key={index}
							style={{
								height: `max(${sectionHeightRem}, ${sectionHeightVh})`,
							}}
							aria-hidden='true'
						/>
					);
				})}
			</section>

			<motion.div
				style={{
					height: `max(${SECTION_HEIGHT_REM}rem, ${SECTION_HEIGHT_VH}vh)`,
					marginBottom: marginBottom,
				}}
				className='-mt-[max(212.5rem,250vh)]'
				aria-hidden='true'
			/>
		</>
	);
}
