import { getTranslations } from 'next-intl/server';

export async function PartnersSection() {
	const t = await getTranslations('pages.home.partners');

	return (
		<section className='group relative container mt-36'>
			<div className='grid grid-cols-5 gap-4 group-hover:blur-md'>
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: TEMP
						key={index}
						className='flex flex-col items-center justify-center gap-4 text-gray-500'
					>
						<div className='h-20 w-20 bg-gray-300'></div>
						<div>Cursor</div>
					</div>
				))}
			</div>

			<div className='absolute inset-0 z-10 -m-5 flex items-center justify-center bg-gray-50/50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
				<span className='text-center text-4xl font-semibold'>{t('overlay.text')}</span>
			</div>
		</section>
	);
}
