import { getTranslations } from 'next-intl/server';
import { Button } from '@/libs/components/ui/button';
import { RightArrow } from '@/libs/components/ui/sealos-icons';
import { ShinyInput } from '@/libs/components/ui/shiny-input';

export async function CTASection() {
	const t = await getTranslations('pages.home.cta');

	return (
		<section className='container mt-36 flex flex-col items-center'>
			<h2 className='text-4xl leading-normal font-semibold'>{t('title')}</h2>
			<p className='mt-3 text-xl text-gray-500'>{t('description')}</p>

			<div className='mt-10 flex w-full max-w-2xl gap-5'>
				<ShinyInput inputProps={{ placeholder: t('input.placeholder') }}></ShinyInput>

				<Button
					variant='ghost'
					className='border-foreground h-14 gap-6 rounded-full border bg-transparent px-6 pr-2 text-lg shadow-none'
				>
					<span>{t('button.getPriorityAccess')}</span>
					<div className='bg-foreground flex aspect-square h-10 w-10 items-center justify-center rounded-full text-white'>
						<RightArrow className='size-6' />
					</div>
				</Button>
			</div>

			<p className='mt-5 text-sm text-gray-500'>{t('privacy')}</p>
		</section>
	);
}
