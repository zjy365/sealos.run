import Image from 'next/image';
import { CultureCafeteriaImage, CultureOfficeImage, CultureParkImage } from '../assets';

const CULTURE_CONTENT = {
	title: { prefix: '企业', highlight: '文化' },
	address: '余杭区五常街道阿里巴巴数字创新生态园 6 幢 4 楼 W405（西五电梯 4 楼）',
	items: [
		{ title: '园区环境', image: CultureParkImage },
		{ title: '员工食堂', image: CultureCafeteriaImage },
		{ title: '办公环境', image: CultureOfficeImage },
	],
} as const;

export function CultureSection() {
	const culture = CULTURE_CONTENT;

	return (
		<div className='flex w-full flex-col items-center gap-16'>
			<h2 className='text-center text-3xl leading-none font-semibold'>
				{culture.title.prefix}
				<span className='text-brand'>{culture.title.highlight}</span>
			</h2>

			<div className='grid w-full grid-cols-1 gap-8 lg:grid-cols-3'>
				{culture.items.map((item) => (
					<div
						key={item.title}
						className='overflow-hidden border border-zinc-100 bg-zinc-50'
					>
						<div className='relative h-64 w-full overflow-hidden bg-zinc-200'>
							<Image
								src={item.image}
								alt={item.title}
								fill
								className='object-cover'
							/>
						</div>
						<div className='flex flex-col gap-2 px-8 pt-3 pb-8'>
							<p className='text-foreground text-xl leading-normal font-medium'>{item.title}</p>
							<p className='text-muted-foreground text-sm leading-normal'>{culture.address}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
