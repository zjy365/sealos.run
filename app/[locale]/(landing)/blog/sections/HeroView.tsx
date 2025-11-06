'use client';

import { useTranslations } from 'next-intl';

export default function HeroView() {
	const t = useTranslations('pages.blog.sections.hero');

	return (
		<section className='container pt-40 pb-48'>
			<h1 className='mb-8 text-5xl font-semibold'>{t('title')}</h1>
			<p className='text-muted-foreground text-2xl'>{t('description')}</p>
		</section>
	);
}
