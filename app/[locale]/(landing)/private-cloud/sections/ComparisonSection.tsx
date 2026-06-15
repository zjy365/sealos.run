import { CheckOverFrameIcon, FramedCrossIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';

type ComparisonRow = {
	type?: string;
	component: string;
	description: string;
	openSource: string | boolean;
	privateCloud: string | boolean;
};

const comparisonData: ComparisonRow[] = [
	// 账号
	{
		type: '账号',
		component: '账号数',
		description: '支持的平台账号数量上限。',
		openSource: '1 个',
		privateCloud: '不限',
	},
	{
		type: '账号',
		component: '第三方登录',
		description: '支持通过外部身份平台快速登录。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '账号',
		component: '单点登录',
		description: '接入企业统一身份认证体系。',
		openSource: false,
		privateCloud: true,
	},
	// 团队空间
	{
		type: '团队空间',
		component: '创建空间',
		description: '按团队或项目创建独立工作空间。',
		openSource: true,
		privateCloud: true,
	},
	{
		type: '团队空间',
		component: '读写权限',
		description: '为成员分配资源管理和变更权限。',
		openSource: true,
		privateCloud: true,
	},
	{
		type: '团队空间',
		component: '只读权限',
		description: '允许成员查看资源但不能修改配置。',
		openSource: true,
		privateCloud: true,
	},
	{
		type: '团队空间',
		component: '配额',
		description: '限制空间可使用的计算、存储等资源。',
		openSource: false,
		privateCloud: true,
	},
	// 应用类型
	{
		type: '应用',
		component: '应用管理',
		description: '部署和管理容器应用的核心入口。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: 'DevBox',
		description: '提供云端开发环境和公网预览能力。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: 'laf 云开发',
		description: '提供函数、数据库和存储一体化开发能力。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: 'FastGPT',
		description: '用于构建企业知识库和 AI 应用。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: '数据库',
		description: '托管 MySQL、PostgreSQL、Redis 等数据库。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: '对象存储',
		description: '提供兼容 S3 的文件和对象存储服务。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: '应用商店',
		description: '通过模板快速部署常用开源应用。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: 'AI Proxy',
		description: '统一接入和管理多家 AI 模型服务。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: 'Brain',
		description: '面向企业智能助手和知识应用场景。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: '终端',
		description: '在浏览器中直接访问命令行环境。',
		openSource: true,
		privateCloud: true,
	},
	{
		type: '应用',
		component: 'Kite',
		description: '支持开源 Kite 应用的部署和使用。',
		openSource: true,
		privateCloud: true,
	},
	{
		type: '应用',
		component: '镜像仓库',
		description: '管理企业内部容器镜像和代理仓库。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '应用',
		component: '定时任务',
		description: '按计划触发一次性或周期性任务。',
		openSource: false,
		privateCloud: true,
	},
	// 底层
	{
		type: '底层',
		component: '适合集群',
		description: '支持的集群规模和部署场景。',
		openSource: '1 台',
		privateCloud: '不限',
	},
	{
		type: '底层',
		component: '部署方式',
		description: '平台安装时对外部网络的依赖方式。',
		openSource: '在线',
		privateCloud: '纯离线',
	},
	{
		type: '底层',
		component: 'DNS',
		description: '提供集群内部和平台域名解析能力。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '底层',
		component: 'NTP',
		description: '统一集群节点时间同步服务。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '底层',
		component: 'GPU 虚拟化',
		description: '支持 GPU 资源池化和隔离调度。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '底层',
		component: '日志',
		description: '集中查看平台和应用运行日志。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '底层',
		component: '监控',
		description: '观测集群、应用和资源运行状态。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '底层',
		component: '告警',
		description: '对异常资源和平台事件进行通知。',
		openSource: false,
		privateCloud: true,
	},
	{
		type: '底层',
		component: '管理后台',
		description: '集中管理用户、空间、许可证和平台配置。',
		openSource: false,
		privateCloud: true,
	},
];

function renderValue(value: string | boolean): React.ReactNode {
	if (typeof value === 'boolean') {
		return value ? (
			<Icon
				src={CheckOverFrameIcon}
				className='text-brand size-4'
			/>
		) : (
			<Icon
				src={FramedCrossIcon}
				className='text-muted-foreground size-4'
			/>
		);
	}
	return value;
}

export function ComparisonSection() {
	// 按类型分组数据
	const groupedData = comparisonData.reduce<Record<string, ComparisonRow[]>>((acc, row) => {
		const type = row.type || '其他';
		if (!acc[type]) {
			acc[type] = [];
		}
		acc[type].push(row);
		return acc;
	}, {});

	const typeEntries = Object.entries(groupedData);

	return (
		<div className='flex flex-col gap-8'>
			<div className='flex flex-col items-start gap-4'>
				<h2 className='text-3xl font-semibold'>
					Sealos <span className='text-brand'>功能清单</span>
				</h2>
				<p className='text-muted-foreground text-base'>
					对比开源版与私有云的核心能力边界，快速判断私有化部署可获得的完整能力
				</p>
			</div>
			<div className='w-full max-w-full overflow-x-scroll'>
				<div className='relative min-w-4xl'>
					<div className='bg-foreground text-background relative left-5/6 z-10 w-1/6 rounded-tr-3xl py-2 pl-4 text-sm font-normal whitespace-nowrap'>
						推荐选择
					</div>

					<table className='border-border w-full border-collapse border'>
						<colgroup>
							<col className='w-1/12' />
							<col className='w-1/6' />
							<col className='w-5/12' />
							<col className='w-1/6' />
							<col className='w-1/6' />
						</colgroup>
						<thead>
							<tr>
								<th className='border-border text-foreground h-12 border-r border-b px-4 text-center text-sm font-bold'>
									类型
								</th>
								<th className='border-border text-foreground h-12 border-r border-b px-4 text-left text-sm font-bold'>
									组件
								</th>
								<th className='border-border text-foreground h-12 border-r border-b px-4 text-left text-sm font-bold'>
									描述
								</th>
								<th className='border-border text-foreground h-12 border-r border-b px-4 text-left text-sm font-bold'>
									开源版
								</th>
								<th className='border-border text-brand relative h-12 border-b px-4 text-left text-sm font-bold'>
									私有云
								</th>
							</tr>
						</thead>
						<tbody>
							{typeEntries.flatMap(([type, rows], typeIndex) => [
								...rows.map((row, index) => (
									<tr
										key={`${type}-${row.component}-${index}`}
										className='border-b'
									>
										{index === 0 && (
											<td
												className='border-border text-muted-foreground border-r px-4 text-sm'
												rowSpan={rows.length}
											>
												<div className='flex h-full items-center justify-center'>{type}</div>
											</td>
										)}
										<td className='border-border text-muted-foreground h-10 border-r px-4 text-sm'>
											{row.component}
										</td>
										<td className='border-border text-muted-foreground h-10 border-r px-4 text-sm'>
											{row.description}
										</td>
										<td className='border-border text-muted-foreground h-10 border-r px-4 text-sm'>
											<div className='flex items-center'>{renderValue(row.openSource)}</div>
										</td>
										<td className='border-border text-foreground relative h-10 bg-white/80 px-4 text-sm'>
											<div className='flex items-center'>{renderValue(row.privateCloud)}</div>
										</td>
									</tr>
								)),
								...(typeIndex < typeEntries.length - 1
									? [
											<tr key={`spacer-${type}`}>
												<td
													colSpan={5}
													className='h-2'
												/>
											</tr>,
										]
									: []),
							])}
						</tbody>
					</table>
					<div className='border-brand pointer-events-none absolute top-10 bottom-0 left-5/6 w-1/6 rounded-none border' />
				</div>
			</div>
		</div>
	);
}
