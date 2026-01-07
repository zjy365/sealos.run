import Image from 'next/image';
import { BuptLogo, FastgptLogo, OsiLogo, SinocareLogo, SnddLogo, TeableLogo, WhuLogo, ZsmarterLogo } from '../assets';

const orgLogos = [
	{ name: 'ZSmarter', logo: ZsmarterLogo },
	{ name: 'Teable', logo: TeableLogo },
	{ name: 'Sinocare', logo: SinocareLogo },
	{ name: '少年得到', logo: SnddLogo },
	{ name: '北京邮电大学', logo: BuptLogo },
	{ name: 'FastGPT', logo: FastgptLogo },
	{ name: 'OSI', logo: OsiLogo },
	{ name: '武汉大学', logo: WhuLogo },
];

export function OrgsSection() {
	// duplicate for seamless animation
	const duplicatedLogos = [
		...orgLogos.map((i) => ({ ...i, name: `${i.name}_1` })),
		...orgLogos.map((i) => ({ ...i, name: `${i.name}_2` })),
	];

	return (
		<div className='flex w-full flex-col items-center gap-4'>
			<p className='text-muted-foreground shrink-0 text-center text-base leading-none'>
				Sealos 深受全球企业的信赖
			</p>
			<div className='pointer-events-none relative w-full overflow-hidden'>
				{/* Left gradient fade */}
				<div className='from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-linear-to-r to-transparent' />
				{/* Right gradient fade */}
				<div className='from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-linear-to-l to-transparent' />
				<div className='animate-scroll-left flex gap-20 opacity-80 saturate-0'>
					{duplicatedLogos.map((org) => (
						<div
							key={org.name}
							className='flex h-9 shrink-0 items-center justify-center'
						>
							<Image
								src={org.logo}
								alt={org.name}
								className='h-full w-auto object-contain'
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
