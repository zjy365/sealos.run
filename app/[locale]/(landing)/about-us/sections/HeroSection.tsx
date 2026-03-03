import { HeroBg } from '../../(home)/components/HeroBg';

const HERO_CONTENT = {
	title: {
		prefix: '只需专注业务，其它交给',
		highlight: 'Sealos',
	},
	description: [
		'Sealos 是一款以应用为中心的智能云操作系统。',
		'可以帮助业务快速开发，快速迭代，以最快速度上线，并保证业务的稳定高可用运行，全面保障业务数据安全。',
	],
	stats: [
		{ value: '7年+', label: '稳定运行' },
		{ value: '200万台+', label: '装机量' },
		{ value: '25万+', label: '用户量' },
		{ value: '15万+', label: '云上应用' },
	],
} as const;

export function HeroSection() {
	const hero = HERO_CONTENT;

	return (
		<div className='relative overflow-hidden py-20 sm:py-24'>
			<HeroBg />

			<div className='container mx-auto px-6'>
				<div className='mx-auto flex max-w-4xl flex-col items-center gap-32 text-center'>
					<div className='flex flex-col items-center gap-6'>
						<h1 className='text-4xl leading-tight font-semibold sm:text-5xl'>
							{hero.title.prefix} <span className='text-brand'>{hero.title.highlight}</span>
						</h1>

						<div className='text-muted-foreground text-xl leading-normal'>
							{hero.description.map((line) => (
								<p key={line}>{line}</p>
							))}
						</div>
					</div>

					<div className='grid w-full grid-cols-2 gap-y-8 sm:grid-cols-4'>
						{hero.stats.map((stat) => (
							<div
								key={stat.label}
								className='flex flex-col items-center gap-3'
							>
								<p className='text-brand text-2xl leading-none font-semibold sm:text-3xl'>
									{stat.value}
								</p>
								<p className='text-foreground text-xl leading-none'>{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
