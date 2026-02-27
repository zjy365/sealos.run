const CERTS_CONTENT = {
	title: { prefix: '我们获得的', highlight: '权威认证' },
	items: ['ISO 27001', 'KISMS认证', '网络安全等级保护', 'SOC 鉴证审计', 'CSA STAR金牌认证'],
} as const;

export function CertsSection() {
	const certs = CERTS_CONTENT;

	return (
		<div className='flex w-full flex-col items-center gap-16'>
			<h2 className='text-center text-3xl leading-none font-semibold'>
				{certs.title.prefix}
				<span className='text-brand'>{certs.title.highlight}</span>
			</h2>

			<div className='grid w-full grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5'>
				{certs.items.map((name) => (
					<div
						key={name}
						className='flex flex-col items-center gap-6'
					>
						<div className='text-muted-foreground flex size-40 items-center justify-center rounded-xl bg-zinc-100 text-sm'>
							图片占位
						</div>
						<p className='text-center text-base leading-normal font-medium'>{name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
