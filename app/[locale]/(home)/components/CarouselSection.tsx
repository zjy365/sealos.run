import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Carousel, CarouselContent, CarouselItem } from '@/libs/components/ui/carousel';
import CarouselAlertImage from '../images/carousel-alert.svg';
import CarouselInputImage from '../images/carousel-input.svg';
import CarouselResourceImage from '../images/carousel-resource.svg';
import CarouselViewImage from '../images/carousel-view.svg';
import { CarouselCard } from './CarouselCard';

export async function CarouselSection() {
	const t = await getTranslations('pages.home.carousel');

	return (
		<section className='container'>
			<Carousel
				className='w-full'
				opts={{
					align: 'start',
					containScroll: 'keepSnaps',
				}}
			>
				<CarouselContent className={{ wrapper: 'overflow-visible' }}>
					<CarouselItem className='basis-2/3'>
						<CarouselCard
							title={t('items.input.title')}
							description={t('items.input.description')}
						>
							<Image
								src={CarouselInputImage}
								alt={t('items.input.imageAlt')}
								className='h-full w-full object-fill'
							/>
						</CarouselCard>
					</CarouselItem>

					<CarouselItem className='basis-2/3'>
						<CarouselCard
							title={t('items.view.title')}
							description={t('items.view.description')}
						>
							<Image
								src={CarouselViewImage}
								alt={t('items.view.imageAlt')}
								className='h-full w-full object-fill'
							/>
						</CarouselCard>
					</CarouselItem>

					<CarouselItem className='basis-2/3'>
						<CarouselCard
							title={t('items.resource.title')}
							description={t('items.resource.description')}
						>
							<Image
								src={CarouselResourceImage}
								alt={t('items.resource.imageAlt')}
								className='h-full w-full object-fill'
							/>
						</CarouselCard>
					</CarouselItem>

					<CarouselItem className='basis-2/3'>
						<CarouselCard
							title={t('items.alert.title')}
							description={t('items.alert.description')}
						>
							<Image
								src={CarouselAlertImage}
								alt={t('items.alert.imageAlt')}
								className='h-full w-full object-fill'
							/>
						</CarouselCard>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</section>
	);
}
