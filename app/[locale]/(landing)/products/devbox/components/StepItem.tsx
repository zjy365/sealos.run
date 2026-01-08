'use client';

import { useInView } from 'motion/react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';
import { StepDecoration } from './StepDecoration';

interface StepItemProps {
	icon: StaticImageData;
	title: string;
	description: string;
	tags: string[];
	image: StaticImageData;
	variant: 'left' | 'right';
}

export function StepItem({ icon, title, description, tags, image, variant }: StepItemProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, {
		margin: '0px 0px -60% 0px',
		amount: 'some',
	});

	// Set to active when the element's top enters the top 40% of the viewport
	const isActive = isInView;

	return (
		<div
			ref={ref}
			className='relative flex flex-col gap-4'
		>
			<div className='flex items-start gap-4'>
				{variant === 'left' ? (
					<>
						{/* Tags on the left (outermost, near page edge) */}
						<div className='flex shrink-0 flex-row items-end gap-2 self-end'>
							{tags.map((tag) => (
								<Badge
									key={tag}
									variant='outline'
								>
									<div className='bg-brand size-1.5 rounded-full' />
									{tag}
								</Badge>
							))}
						</div>
						{/* Title, description, and icon in the middle - right aligned */}
						<div className='flex flex-1 flex-col items-end gap-2'>
							<div className='flex w-full items-center justify-end gap-2'>
								<h3 className='text-lg'>{title}</h3>
								<div className='text-brand flex size-8 shrink-0 items-center justify-center'>
									<Icon
										src={icon}
										className='size-8'
									/>
								</div>
							</div>
							<p className='text-muted-foreground text-right text-sm'>{description}</p>
						</div>
						{/* Left decoration (mirrored, positioned on the right side, facing inward) */}
						<div className='flex shrink-0 items-center'>
							<div
								style={{
									transform: 'scaleX(-1)',
								}}
							>
								<StepDecoration variant={isActive ? 'active' : 'default'} />
							</div>
						</div>
					</>
				) : (
					<>
						{/* Right decoration (positioned on the left side, facing inward) */}
						<div className='flex shrink-0 items-center'>
							<StepDecoration variant={isActive ? 'active' : 'default'} />
						</div>
						{/* Title, description, and icon in the middle */}
						<div className='flex flex-1 flex-col gap-2'>
							<div className='flex items-center gap-2'>
								<div className='text-brand flex size-8 shrink-0 items-center justify-center'>
									<Icon
										src={icon}
										className='size-8'
									/>
								</div>
								<h3 className='text-lg'>{title}</h3>
							</div>
							<p className='text-muted-foreground text-sm'>{description}</p>
						</div>
						{/* Tags on the right (outermost, near page edge) */}
						<div className='flex shrink-0 flex-row items-end gap-2 self-end'>
							{tags.map((tag) => (
								<Badge
									key={tag}
									variant='outline'
								>
									<div className='bg-brand size-1.5 rounded-full' />
									{tag}
								</Badge>
							))}
						</div>
					</>
				)}
			</div>
			<div className={`relative w-full overflow-hidden ${variant === 'left' ? 'pr-24' : 'pl-24'}`}>
				<Image
					src={image}
					alt={title}
					className='w-full object-contain'
				/>
			</div>
		</div>
	);
}
