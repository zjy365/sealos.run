import { DatabaseIcon, GlobalIcon, PhoneIcon, SaveIcon } from '@/assets/icons';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';

const scenarios = [
	{
		icon: (
			<Icon
				src={DatabaseIcon}
				className='size-full'
			/>
		),
		title: '媒体存储',
		description: '存储和分发图片、视频、音频等多媒体文件，支持 CDN 加速',
		tags: ['用户头像和相册', '视频点播平台', '音乐流媒体服务', '图片素材库'],
	},
	{
		icon: (
			<Icon
				src={GlobalIcon}
				className='size-full'
			/>
		),
		title: '网站资源',
		description: '托管静态网站资源，提升加载速度和用户体验',
		tags: ['静态网站托管', 'CSS/JS 文件存储', 'Web 应用资源', 'CDN 源站存储'],
	},
	{
		icon: (
			<Icon
				src={SaveIcon}
				className='size-full'
			/>
		),
		title: '数据备份',
		description: '安全可靠的数据备份和归档，支持版本控制和生命周期管理',
		tags: ['数据库备份', '日志归档存储', '文档版本管理', '灾难恢复备份'],
	},
	{
		icon: (
			<Icon
				src={PhoneIcon}
				className='size-full'
			/>
		),
		title: '移动应用',
		description: '为移动应用提供文件存储服务，支持直传和断点续传',
		tags: ['用户生成内容', '应用更新包', '离线数据同步', '多端文件同步'],
	},
];

export function ScenariosSection() {
	return (
		<div className='flex flex-col gap-14'>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col gap-5'>
					<h2 className='text-3xl font-semibold'>
						应用<span className='text-brand'>场景</span>
					</h2>
					<p className='text-muted-foreground text-base'>
						从内容分发到数据备份，OSS为各种业务场景提供完美解决方案
					</p>
				</div>
				<div className='border-brand h-px w-full border-t border-dashed' />
			</div>

			<div className='flex flex-col gap-14'>
				{scenarios.map((scenario) => (
					<div
						key={scenario.title}
						className='grid grid-cols-3 gap-4 lg:gap-20'
					>
						<div className='col-span-1 flex gap-2 sm:gap-4'>
							<div className='text-brand flex size-6 items-center justify-center'>{scenario.icon}</div>
							<h3 className='text-base font-medium sm:text-xl'>{scenario.title}</h3>
						</div>
						<div className='col-span-2 flex flex-col gap-4'>
							<p className='text-base'>{scenario.description}</p>
							<div className='flex flex-wrap gap-2'>
								{scenario.tags.map((tag) => (
									<Badge
										key={tag}
										variant='outline'
									>
										<div className='bg-brand size-1.5 rounded-full' />
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
