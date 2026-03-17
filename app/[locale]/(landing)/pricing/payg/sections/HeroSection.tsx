import Image from 'next/image';
import { Badge } from '@/libs/components/ui/badge';
import { HeroBgImage } from '../../assets';

export function HeroSection() {
	const highlights = ['超低单价', '即开即用', '暂停不计费'];

	return (
		<div className='relative flex h-128 w-full flex-col justify-end gap-6 py-36'>
			<div className='pointer-events-none absolute inset-0 -z-10 -translate-y-24 transform lg:translate-y-0'>
				<Image
					src={HeroBgImage}
					alt=''
					fill
					className='overflow-visible object-cover object-center lg:object-right'
					priority
				/>
			</div>

			<div className='relative z-10 flex flex-col gap-6'>
				<h1 className='text-5xl leading-none font-semibold'>
					小时计费，
					<span className='text-brand'>用多少付多少</span>
				</h1>

				<div className='flex flex-wrap items-center gap-2'>
					{highlights.map((text) => (
						<Badge
							key={text}
							variant='outline'
						>
							<span className='bg-brand size-1.5 shrink-0 rounded-full' />
							<span className='text-foreground'>{text}</span>
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
}
