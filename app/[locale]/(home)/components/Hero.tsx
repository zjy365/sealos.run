import { getTranslations } from 'next-intl/server';
import { Button } from '@/libs/components/ui/button';
import { RightArrow } from '@/libs/components/ui/sealos-icons';
import { ShinyInput } from '@/libs/components/ui/shiny-input';

export async function Hero() {
	const t = await getTranslations('pages.home.hero');

	return (
		<section className='relative container mx-auto px-4 py-16 md:py-24'>
			<h1 className='text-5xl leading-tight font-medium'>
				<div>
					<span>{t('title.meet')} </span>
					<span className='text-blue-600'>{t('title.sealosBrain')}</span>
				</div>
				<div>{t('title.subtitle')}</div>
			</h1>
			<p className='mt-2 text-xl font-normal text-gray-500'>{t('description')}</p>

			<div className='mt-12 flex items-center gap-4'>
				<ShinyInput
					inputProps={{
						placeholder: t('input.placeholder'),
					}}
				/>
				<Button
					variant='ghost'
					className='border-foreground h-14 gap-6 rounded-full border bg-transparent px-6 pr-2 text-lg shadow-none'
				>
					<span>{t('button.tryNow')}</span>
					<div className='bg-foreground flex aspect-square h-10 w-10 items-center justify-center rounded-full text-white'>
						<RightArrow className='size-6' />
					</div>
				</Button>
			</div>
		</section>
	);
}
