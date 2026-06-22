import Image from 'next/image';
import { CultureCafeteriaImage, CultureOfficeImage, CultureParkImage } from '../assets';

const CULTURE_CONTENT = {
	title: { prefix: '企业', highlight: '文化' },
	items: [
		{
			title: '园区环境',
			description: '办公区配套 300 平+室外花园，兼顾开放交流与放松休憩，让团队在自然舒展的环境中高效协作。',
			image: CultureParkImage,
		},
		{
			title: '员工食堂',
			description: '园区食堂共 2 层，汇集数十家商贩，全部可享 85 折优惠，日常用餐选择丰富又方便。',
			image: CultureCafeteriaImage,
		},
		{
			title: '办公环境',
			description:
				'办公空间清晰划分为 Sealos 区、FastGPT 区和中台区，既支持各业务线高效协同，也方便跨团队快速联动。',
			image: CultureOfficeImage,
		},
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
							<p className='text-muted-foreground text-sm leading-normal'>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
