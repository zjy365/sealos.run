const CONTACT_CONTENT = {
	title: { prefix: '联系', highlight: '我们' },
	items: [
		{
			type: 'address',
			label: '地址',
			value: '余杭区五常街道阿里巴巴数字生态创新园6幢4楼W405（西五电梯4楼）',
		},
		{ type: 'email', label: '邮箱', value: 'liwen@sealos.io' },
		{ type: 'website', label: '网站', value: 'https://sealos.run/' },
	],
} as const;

function ContactIcon({ type }: { type: 'address' | 'email' | 'website' }) {
	if (type === 'address') {
		return (
			<svg
				viewBox='0 0 24 24'
				className='text-foreground size-6'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<path
					d='M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z'
					stroke='currentColor'
					strokeWidth='1.6'
				/>
				<path
					d='M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z'
					stroke='currentColor'
					strokeWidth='1.6'
				/>
			</svg>
		);
	}

	if (type === 'email') {
		return (
			<svg
				viewBox='0 0 24 24'
				className='text-foreground size-6'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<path
					d='M4.5 6.5h15A2 2 0 0 1 21.5 8.5v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z'
					stroke='currentColor'
					strokeWidth='1.6'
				/>
				<path
					d='m4.8 8.2 7.2 5 7.2-5'
					stroke='currentColor'
					strokeWidth='1.6'
					strokeLinejoin='round'
				/>
			</svg>
		);
	}

	return (
		<svg
			viewBox='0 0 24 24'
			className='text-foreground size-6'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<path
				d='M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'
				stroke='currentColor'
				strokeWidth='1.6'
			/>
			<path
				d='M3 12h18'
				stroke='currentColor'
				strokeWidth='1.6'
			/>
			<path
				d='M12 3c2.8 2.6 4.5 6 4.5 9s-1.7 6.4-4.5 9c-2.8-2.6-4.5-6-4.5-9s1.7-6.4 4.5-9Z'
				stroke='currentColor'
				strokeWidth='1.6'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export function ContactSection() {
	const contact = CONTACT_CONTENT;

	return (
		<div className='flex w-full flex-col items-center gap-16'>
			<h2 className='text-center text-3xl leading-none font-semibold'>
				<span className='text-brand'>{contact.title.prefix}</span>
				{contact.title.highlight}
			</h2>

			<div className='border-hairline w-full rounded-xl border bg-zinc-50 p-2'>
				<div className='border-brand w-full rounded-lg border border-dashed bg-zinc-50 p-8'>
					<div className='flex w-full flex-col gap-6'>
						{contact.items.map((item) => (
							<div
								key={item.type}
								className='flex items-start gap-3'
							>
								<ContactIcon type={item.type} />
								<p className='text-base leading-normal'>
									<span className='text-foreground'>{item.label}：</span>
									<span className='text-muted-foreground'>{item.value}</span>
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
