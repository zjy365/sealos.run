import { Footer } from '@/libs/components/Footer';
import { Navbar } from '@/libs/components/Navbar';
import { Config } from '@/libs/config';

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<header className='sticky top-0 z-50'>
				<Navbar />
			</header>

			<main className='relative min-h-screen'>{children}</main>

			<footer className='pt-16 sm:pt-24 md:pt-36'>
				<Footer config={Config.components.footer} />
			</footer>
		</>
	);
}
