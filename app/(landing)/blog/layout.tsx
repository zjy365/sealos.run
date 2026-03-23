import Image from 'next/image';
import { BlogHeaderImage } from '@/assets';

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Image
				src={BlogHeaderImage}
				className='pointer-events-none absolute -top-16 left-1/2 -z-10 container -translate-x-1/2'
				alt=''
			/>

			{children}
		</>
	);
}
