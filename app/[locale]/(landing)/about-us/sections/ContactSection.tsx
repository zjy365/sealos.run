import { FramedEmailIcon, GlobalIcon, LocationIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';

const CONTACT_CONTENT = {
	title: { prefix: '联系', highlight: '我们' },
	items: [
		{
			type: 'address',
			label: '地址',
			value: '余杭区五常街道阿里巴巴数字生态创新园6幢4楼W405（西五电梯4楼）',
			iconImage: LocationIcon,
		},
		{
			type: 'email',
			label: '邮箱',
			value: 'liwen@sealos.io',
			iconImage: FramedEmailIcon,
		},
		{
			type: 'website',
			label: '网站',
			value: 'https://sealos.run/',
			iconImage: GlobalIcon,
		},
	],
} as const;

export function ContactSection() {
	const contact = CONTACT_CONTENT;

	return (
		<div className='flex w-full flex-col items-center gap-16'>
			<h2 className='text-center text-3xl leading-none font-semibold'>
				<span className='text-brand'>{contact.title.prefix}</span>
				{contact.title.highlight}
			</h2>

			<div className='border-hairline w-full border bg-zinc-50 p-2'>
				<div className='border-brand w-full border border-dashed bg-zinc-50 p-8'>
					<div className='flex w-full flex-col gap-6'>
						{contact.items.map((item) => (
							<div
								key={item.type}
								className='flex items-start gap-3'
							>
								<Icon
									src={item.iconImage}
									className='size-5 text-brand'
								/>
								<p className='text-base leading-normal'>
									<span className='text-foreground'>{item.label}: </span>
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
