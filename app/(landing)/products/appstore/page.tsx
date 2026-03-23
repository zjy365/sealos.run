import Image from 'next/image';
import { HeroBgImage, ReqBgImage } from './assets';
import { CTASection } from './sections/CTASection';
import { HeroSection } from './sections/HeroSection';
import { RequestSection } from './sections/RequestSection';
import { TemplatesSection } from './sections/TemplatesSection';
import { TrendsSection } from './sections/TrendsSection';

export default async function AppStorePage() {
	return (
		<div className='flex w-full flex-col'>
			<section className='relative w-full overflow-hidden pt-64 pb-6'>
				<div className='pointer-events-none absolute inset-x-0 top-0 -z-10 select-none'>
					<Image
						src={HeroBgImage}
						alt=''
						priority
						className='mx-auto h-auto w-full max-w-360 min-w-200'
					/>
				</div>
				<div className='container mx-auto px-6'>
					<HeroSection />
				</div>
			</section>

			<section className='container mx-auto px-6 py-16 pt-36'>
				<TemplatesSection locale='zh' />
			</section>

			<section className='container mx-auto px-6 py-16'>
				<TrendsSection locale='zh' />
			</section>

			<section className='relative w-full overflow-hidden py-16'>
				<div className='pointer-events-none absolute inset-x-0 bottom-0 -z-10 select-none'>
					<div className='mx-auto w-full max-w-360 min-w-200'>
						<Image
							src={ReqBgImage}
							alt=''
							className='h-auto w-full'
						/>
					</div>
				</div>
				<div className='container mx-auto px-6'>
					<RequestSection />
				</div>
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<CTASection />
				</div>
			</section>
		</div>
	);
}
