import Image from 'next/image';
import { Badge } from '@/libs/components/ui/badge';
import { TypePrivateImage, TypePublicReadImage, TypePublicReadWriteImage } from './assets';

const storageTypes = [
	{
		type: 'private',
		label: '私有访问',
		description: '仅允许经过身份验证的用户访问存储桶内容，适用于存储敏感数据或内部使用',
		image: TypePrivateImage,
	},
	{
		type: 'publicRead',
		label: '公共读',
		description:
			'允许所有人读取存储桶内对象 (无需身份验证)，但写入操作仍需认证，适用于内容分发、静态网站托管等场景',
		image: TypePublicReadImage,
	},
	{
		type: 'publicReadWrite',
		label: '公共读写',
		description: '开放完整的读写权限 (需谨慎使用)，适用于需要临时文件共享或协作的场景，生产环境不建议开启',
		image: TypePublicReadWriteImage,
	},
];

export function TypesSection() {
	return (
		<div className='flex flex-col gap-14'>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col gap-5'>
					<h2 className='text-3xl font-semibold'>
						<span className='text-brand'>存储</span>类型
					</h2>
					<p className='text-muted-foreground text-base'>根据不同的访问频率选择合适的存储类型，优化成本</p>
				</div>
				<div className='border-brand h-px w-full border-t border-dashed' />
			</div>

			<div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
				{storageTypes.map((item) => (
					<div
						key={item.type}
						className='flex flex-col gap-6'
					>
						<div className='relative h-56 w-full overflow-hidden bg-zinc-100'>
							<Image
								src={item.image}
								alt={item.type}
								className='object-contain'
								fill
							/>
						</div>
						<div className='flex flex-col gap-3'>
							<div className='flex items-center gap-3'>
								<h3 className='text-xl font-medium'>{item.type}</h3>
								<Badge variant='outline'>
									<div className='bg-brand size-1.5 rounded-full' />
									{item.label}
								</Badge>
							</div>
							<p className='text-muted-foreground text-base'>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
