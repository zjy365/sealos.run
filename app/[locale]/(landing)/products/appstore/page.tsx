import Image from 'next/image';
import { getAppStoreTemplates } from '@/libs/appstore/utils';
import { ReqBgImage } from './assets';
import { AppStoreSearchExperience } from './sections/AppStoreSearchExperience';
import { CTASection } from './sections/CTASection';
import { RequestSection } from './sections/RequestSection';
import { TrendsSection } from './sections/TrendsSection';

export default async function AppStorePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const templates = getAppStoreTemplates(locale);

	return (
		<div className='flex w-full flex-col'>
			<AppStoreSearchExperience templates={templates} />

			<section className='container mx-auto px-6 py-16'>
				<TrendsSection locale={locale} />
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
