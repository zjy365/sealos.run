import Image from 'next/image';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import HeroBgImage from '../assets/hero-bg.svg';

const VIEWBOX_WIDTH = 1247;
const VIEWBOX_HEIGHT = 633;

function SolutionsHeroBg() {
	return (
		<div className='w-full'>
			<svg
				className='relative top-0 left-0 h-120 w-full overflow-visible sm:h-140 lg:h-180'
				viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
				preserveAspectRatio='xMidYMin slice'
				role='graphics-symbol'
				style={{
					WebkitMaskImage:
						'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)',
					WebkitMaskRepeat: 'no-repeat',
					WebkitMaskSize: '100% 100%',

					maskImage:
						'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)',
					maskRepeat: 'no-repeat',
					maskSize: '100% 100%',
				}}
			>
				<foreignObject
					x='0'
					y='0'
					width={VIEWBOX_WIDTH}
					height={VIEWBOX_HEIGHT}
				>
					<Image
						src={HeroBgImage}
						alt=''
						priority
					/>
				</foreignObject>
			</svg>
		</div>
	);
}

export function HeroSection() {
	return (
		<div className='flex w-full flex-col items-center gap-6'>
			<p className='text-muted-foreground text-center text-xl leading-normal font-normal'>企业级云原生解决方案</p>

			<h1 className='text-foreground text-center text-4xl leading-none font-semibold sm:text-5xl'>
				<span>{`"`}</span>
				<span className='text-brand'>一键部署</span>
				<span>，让复杂的 K8s 变得</span>
				<span className='text-brand'>简单易用</span>
				<span>{`"`}</span>
			</h1>

			<LandingOutlineButton
				href='#solutions'
				size='lg'
				className='text-xl font-bold'
			>
				获取行业解决方案
			</LandingOutlineButton>

			<div className='mt-6 w-full'>
				<SolutionsHeroBg />
			</div>
		</div>
	);
}
