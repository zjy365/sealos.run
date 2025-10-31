import Image from 'next/image';
import { Footer } from '@/libs/components/Footer';
import { Navbar } from '@/libs/components/Navbar';
import { Config } from '@/libs/config';
import FooterHexagonalPattern from './assets/footer-hexagonal-pattern.svg';

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<header className='sticky top-0 z-50'>
				<Navbar />
			</header>

			<main className='relative min-h-screen'>{children}</main>

			<footer className='relative'>
				<Footer config={Config.components.footer} />

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
