import LandingOutlineButton from '@/libs/components/LandingOutlineButton';
import { getTRich } from '@/libs/i18n/server';

export default async function CTABannerSection() {
	const t = await getTRich('pages.blog.sections.ctaBanner');
	return (
		<section className='bg-muted py-18'>
			<div className='container px-20'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='mb-3 text-2xl font-medium'>{t('title')}</h2>
                        <p className='text-3xl font-semibold'>{t('description')}</p>
					</div>
					<LandingOutlineButton href='/'>{t('buttonText')}</LandingOutlineButton>
				</div>
			</div>
		</section>
	);
}
