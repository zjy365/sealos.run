import Image from 'next/image';
import { Footer } from '@/libs/components/Footer';
import { Navbar } from '@/libs/components/Navbar';
import { CarouselSection } from './components/CarouselSection';
import { CTASection } from './components/CTASection';
import { FAQSection } from './components/FAQSection';
import { Hero } from './components/Hero';
import { PartnersSection } from './components/PartnersSection';
import { WhoSection } from './components/WhoSection';
import { WhySection } from './components/WhySection';
import FooterHexagonalPattern from './images/footer-hexagonal-pattern.svg';
import HeaderHexagonalPattern from './images/header-hexagonal-pattern.svg';

export default async function HomePage() {
	return (
		<>
			<header className='sticky top-0 z-50'>
				<Navbar />
			</header>

			<main className='relative'>
				<div className='absolute top-0 right-0'>
					<Image
						src={HeaderHexagonalPattern}
						alt=''
						role='presentation'
					/>
				</div>

				<Hero />

				<CarouselSection />
				<WhySection />
				<WhoSection />
				<FAQSection />
				<PartnersSection />
			</main>

			<footer className='relative'>
				<CTASection />

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
