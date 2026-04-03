import Image from 'next/image';
import { cn } from '@/libs/utils/styling';
import AppsArchImage from '../assets/arch-images/apps.svg';
import AppstoreArchImage from '../assets/arch-images/appstore.svg';
import MaintainingArchImage from '../assets/arch-images/maintaining.svg';
import PlatformArchImage from '../assets/arch-images/platform.svg';

const archImages = [
	{ src: MaintainingArchImage, alt: 'Maintaining architecture' },
	{ src: AppstoreArchImage, alt: 'Appstore architecture' },
	{ src: AppsArchImage, alt: 'Apps architecture' },
	{ src: PlatformArchImage, alt: 'Platform architecture' },
];

export function ArchSection() {
	return (
		<div className='flex w-full flex-col items-start gap-14'>
			<div>
				<h2 className='text-xl font-semibold sm:text-3xl'>
					<span>系统架构</span>
				</h2>
				<p className='text-muted-foreground mt-4 text-xs sm:text-base'>
					从内核到应用，构建 AI 时代的新一代云基础设施。
				</p>
			</div>

			<div className='mx-auto w-full max-w-6xl'>
				{archImages.map((image, index) => {
					const isRightAligned = (index + 1) % 2 === 0;

					return (
						<div
							key={image.alt}
							className={cn(
								'max-w-[581px]',
								index === 2 && 'max-w-[851px]',
								index > 0 && 'lg:-mt-12',
								isRightAligned && 'justify-self-end',
							)}
						>
							<Image
								src={image.src}
								alt={image.alt}
								className={cn('h-auto')}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
