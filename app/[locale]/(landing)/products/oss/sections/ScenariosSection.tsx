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
		title: 'AI 模型与数据集',
		description:
			'专为高性能计算（HPC）优化。在 Sealos 内网实现 TB 级训练数据与模型权重的极速加载，显著减少 GPU 等待时间。',
		tags: ['模型权重存储', '训练数据集', '向量库后端', 'PyTorch/TF'],
	},
	{
		icon: (
			<Icon
				src={GlobalIcon}
				className='size-full'
			/>
		),
		title: '云原生构建产物',
		description:
			'CI/CD 流水线的最佳缓冲池。统一存储 Docker 镜像层、Helm Charts 包及构建日志，支持 S3 协议无缝对接主流 DevOps 工具。',
		tags: ['镜像仓库后端', '流水线缓存', 'Terraform State', '构建日志'],
	},
	{
		icon: (
			<Icon
				src={SaveIcon}
				className='size-full'
			/>
		),
		title: '静态网站托管',
		description:
			'像传文件一样发布网站。一键托管 HTML/CSS/JS 构建产物，支持 自定义域名 与 HTTPS，轻松实现现代化的前后端分离架构。',
		tags: ['前端 Dist 托管', '文档/博客站', '动静分离', 'CDN 源站'],
	},
	{
		icon: (
			<Icon
				src={PhoneIcon}
				className='size-full'
			/>
		),
		title: '容灾备份与归档',
		description:
			'业务数据的最后一道防线。自动化存储 数据库快照 (Snapshots) 与系统审计日志，支持 对象锁定 (WORM) 技术，有效防御勒索软件与意外删除。',
		tags: ['数据库冷备', '日志长期归档', '防勒索锁定', '多跨区域复制'],
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
