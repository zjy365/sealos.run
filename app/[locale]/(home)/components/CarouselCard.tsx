import type React from 'react';
import { Card, CardContent } from '@/libs/components/ui/card';

interface CarouselCardProps {
	children: React.ReactNode;
	title: string;
	description: string;
}

export function CarouselCard({ children, title, description }: CarouselCardProps) {
	return (
		<Card className='h-full w-full gap-0 overflow-hidden rounded-none border border-gray-200 bg-white p-0 shadow-lg'>
			<div className='m-0 h-80 gap-0 bg-gray-50 p-0'>{children}</div>

			<CardContent className='bg-card border-none px-8 py-6'>
				<h3 className='text-xl font-semibold tracking-tight'>{title}</h3>
				<p className='mt-2 text-lg leading-normal text-gray-500'>{description}</p>
			</CardContent>
		</Card>
	);
}
