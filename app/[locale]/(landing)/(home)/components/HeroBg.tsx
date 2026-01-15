import Image from 'next/image';
import {
	AiproxyBoxImage,
	AppstoreBoxImage,
	BrainBoxImage,
	DatabaseBoxImage,
	DevboxBoxImage,
	OssBoxImage,
} from '@/assets/app-boxes';
import { HeroBgImage } from '../assets';

const appBoxIcons = [
	{ id: 'aiproxy', src: AiproxyBoxImage, x: 952.06, y: 319.58 },
	{ id: 'appstore', src: AppstoreBoxImage, x: 583.56, y: 106.5 },
	{ id: 'brain', src: BrainBoxImage, x: 276.56, y: 213.08 },
	{ id: 'database', src: DatabaseBoxImage, x: 461.06, y: 319.08 },
	{ id: 'devbox', src: DevboxBoxImage, x: 952.06, y: 107.58 },
	{ id: 'oss', src: OssBoxImage, x: 767.86, y: 425.58 },
];

const VIEWBOX_WIDTH = 1440;
const VIEWBOX_HEIGHT = 718;

export function HeroBg() {
	return (
		<div className='container mx-auto'>
			<svg
				className='relative top-0 left-0 h-128 w-full overflow-visible'
				viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
				preserveAspectRatio='xMidYMin slice'
				role='graphics-symbol'
				style={{
					WebkitMaskImage:
						'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 85%)',
					WebkitMaskRepeat: 'no-repeat',
					WebkitMaskSize: '100% 100%',

					maskImage:
						'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 85%)',
					maskRepeat: 'no-repeat',
					maskSize: '100% 100%',
				}}
			>
				<style>
					{`
					.hero-bg-image {
						width: 100%;
						height: 100%;
						object-fit: cover;
						object-position: top center;
					}
					.app-box-icon {
						opacity: 0;
						transition: opacity 0.3s ease;
						cursor: pointer;
					}
					.app-box-icon:hover {
						opacity: 1;
					}
					.app-box-icon img {
						width: 100%;
						height: 100%;
						object-fit: contain;
					}
				`}
				</style>
				{/* Background Image */}
				<foreignObject
					x='0'
					y='0'
					width={VIEWBOX_WIDTH}
					height={VIEWBOX_HEIGHT}
				>
					<Image
						src={HeroBgImage}
						alt=''
						className='hero-bg-image'
					/>
				</foreignObject>
				{/* Interactive Icons */}
				{appBoxIcons.map((icon) => (
					<foreignObject
						key={icon.id}
						x={icon.x}
						y={icon.y}
						width='123.35'
						height='142.68'
						className='app-box-icon'
					>
						<Image
							src={icon.src}
							alt={icon.id}
						/>
					</foreignObject>
				))}
			</svg>
		</div>
	);
}
