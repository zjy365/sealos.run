'use client';

import { motion } from 'motion/react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { InlinedSvgData } from '@/libs/types';
import { PlatformBg } from '../../assets';

const BOX_SIZE = {
	width: 103.3,
	height: 119.3,
};

const BOX_POSITIONS = {
	t: { x: 148.5, y: 0 },
	l: { x: 4.5, y: 82.75 },
	c: { x: 148.5, y: 82.75 },
	r: { x: 293, y: 82.75 },
	b: { x: 148.5, y: 166.5 },
} as const;

export type ArchSceneBoxKey = keyof typeof BOX_POSITIONS;

export interface ArchSceneBoxConfig {
	label: string;
	image: StaticImageData;
	icon: InlinedSvgData;
	desc: string[];
}

export type ArchSceneBoxes = Partial<Record<ArchSceneBoxKey, ArchSceneBoxConfig | null>>;

interface ArchSceneProps {
	alt: string;
	boxes: ArchSceneBoxes;
	activeBoxKey: ArchSceneBoxKey | null;
	hoveredBoxKey: ArchSceneBoxKey | null;
	onBoxClick: (key: ArchSceneBoxKey) => void;
	onBoxHover: (key: ArchSceneBoxKey | null) => void;
}

export function ArchScene({ alt, boxes, activeBoxKey, hoveredBoxKey, onBoxClick, onBoxHover }: ArchSceneProps) {
	return (
		<div className='relative aspect-400/331 w-full max-w-100 shrink-0'>
			<svg
				viewBox='0 0 400 331'
				className='absolute inset-0 size-full'
				role='img'
				aria-label={alt}
			>
				<title>{alt}</title>
				<foreignObject
					width={400}
					height={276}
					x={0}
					y={55}
				>
					<Image
						src={PlatformBg}
						alt=''
						className='size-full'
					/>
				</foreignObject>
			</svg>

			{(Object.entries(BOX_POSITIONS) as Array<[ArchSceneBoxKey, (typeof BOX_POSITIONS)[ArchSceneBoxKey]]>).map(
				([key, position]) => {
					const box = boxes[key];
					if (!box) {
						return null;
					}

					const isActive = key === activeBoxKey;
					const isHovered = key === hoveredBoxKey;
					const offsetY = isActive ? -32 : isHovered ? -16 : 0;

					return (
						<motion.button
							key={key}
							type='button'
							className='absolute cursor-pointer border-0 bg-transparent p-0'
							style={{
								left: `${(position.x / 400) * 100}%`,
								top: `${(position.y / 331) * 100}%`,
								width: `${(BOX_SIZE.width / 400) * 100}%`,
								height: `${(BOX_SIZE.height / 331) * 100}%`,
								zIndex: isActive ? 2 : isHovered ? 1 : 0,
							}}
							animate={{ y: offsetY }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
							onClick={() => onBoxClick(key)}
							onMouseEnter={() => onBoxHover(key)}
							onMouseLeave={() => onBoxHover(null)}
							aria-label={`查看 ${box.label}`}
							aria-pressed={isActive}
						>
							<Image
								src={box.image}
								alt=''
								className='size-full select-none'
								draggable={false}
							/>
						</motion.button>
					);
				},
			)}
		</div>
	);
}
