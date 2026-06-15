import Image from 'next/image';
import {
	CertCmaCnasReportImage,
	CertHighTechEnterpriseImage,
	CertInnovationAwardImage,
	CertMlpsLevel3Image,
	CertSoftwareCopyrightImage,
} from '../assets';

const CERTS_CONTENT = {
	title: { prefix: '我们获得的', highlight: '权威认证' },
	items: [
		{ name: 'CMA + CNAS 测试报告', image: CertCmaCnasReportImage },
		{ name: '软件著作权', image: CertSoftwareCopyrightImage },
		{ name: '等保三级', image: CertMlpsLevel3Image },
		{ name: '创客广东一等奖', image: CertInnovationAwardImage },
		{ name: '高新技术企业证书', image: CertHighTechEnterpriseImage },
	],
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
				{certs.items.map((item) => (
					<div
						key={item.name}
						className='flex flex-col items-center gap-6'
					>
						<div className='flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-3'>
							<Image
								src={item.image}
								alt={item.name}
								className='h-full w-full object-contain'
							/>
						</div>
						<p className='text-center text-base leading-normal font-medium'>{item.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
