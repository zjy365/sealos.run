import type React from 'react';
import { Card, CardContent, CardHeader } from '@/libs/components/ui/card';

interface WhyUseCardProps {
	children: React.ReactNode;
	title: string;
	description: string;
}

export function WhyUseCard({ children, title, description }: WhyUseCardProps) {
	return (
		<Card className='w-full flex-1 gap-0 overflow-visible rounded-none border-none bg-transparent p-0 shadow-none'>
			<CardHeader className='z-10 m-0 -mb-32 flex justify-center bg-transparent p-0'>{children}</CardHeader>

			<CardContent className='h-full border-none bg-gray-100 px-8 pt-36 pb-10 shadow-md'>
				<h3 className='text-center text-xl font-semibold tracking-tight'>{title}</h3>
				<p className='mt-2 w-full text-center text-sm leading-normal text-gray-500'>{description}</p>
			</CardContent>
		</Card>
	);
}
