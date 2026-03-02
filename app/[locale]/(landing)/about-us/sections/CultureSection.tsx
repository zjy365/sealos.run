const CULTURE_CONTENT = {
	title: { prefix: '企业', highlight: '文化' },
	address: '余杭区五常街道阿里巴巴数字生态创新园6幢4楼W405（西五电梯4楼）',
	items: [{ title: '园区环境' }, { title: '员工食堂' }, { title: '办公环境' }],
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
						<div className='text-muted-foreground flex h-64 items-center justify-center bg-zinc-200 text-sm'>
							图片占位
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
