import Image from 'next/image';
import { Footer } from '@/libs/components/Footer';
import { Navbar } from '@/libs/components/Navbar';
import FooterHexagonalPattern from './images/footer-hexagonal-pattern.svg';

export default async function HomePage() {
	return (
		<>
			<header className='sticky top-0 z-50'>
				<Navbar />
			</header>

			<main className='relative'></main>

			<footer className='relative'>
				<Footer />

				<div className='pointer-events-none absolute bottom-0 w-full'>
					<Image
						src={FooterHexagonalPattern}
						alt=''
						role='presentation'
						className='object-fit w-full'
					/>
				</div>
			</footer>
		</>
	);
}
