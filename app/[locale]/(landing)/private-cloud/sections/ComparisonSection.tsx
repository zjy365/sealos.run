import { CheckOverFrameIcon, FramedCrossIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';

type ComparisonRow = {
	type?: string;
	component: string;
	openSource: string | boolean;
	commercial: string | boolean;
};

const comparisonData: ComparisonRow[] = [
	// 集群类型
	{
		type: '集群',
		component: '部署方式',
		openSource: '半离线',
		commercial: '纯离线',
	},
	{
		type: '集群',
		component: '网络性能',
		openSource: 'v1.0',
		commercial: 'v2.0',
	},
	{
		type: '集群',
		component: '存储性能',
		openSource: 'v1.0',
		commercial: 'v2.0',
	},
	{
		type: '集群',
		component: '监控性能',
		openSource: 'v1.0',
		commercial: 'v2.0',
	},
	{
		type: '集群',
		component: '多租户',
		openSource: '单用户',
		commercial: '多用户',
	},
	{
		type: '集群',
		component: '管理后台',
		openSource: false,
		commercial: true,
	},
	{
		type: '集群',
		component: 'DNS',
		openSource: false,
		commercial: true,
	},
	{
		type: '集群',
		component: 'NTP',
		openSource: false,
		commercial: true,
	},
	// 应用类型
	{
		type: '应用',
		component: 'DevBox',
		openSource: false,
		commercial: true,
	},
	{
		type: '应用',
		component: '应用管理',
		openSource: true,
		commercial: true,
	},
	{
		type: '应用',
		component: '数据库',
		openSource: true,
		commercial: true,
	},
	{
		type: '应用',
		component: '对象存储',
		openSource: false,
		commercial: true,
	},
	{
		type: '应用',
		component: '应用商店',
		openSource: true,
		commercial: true,
	},
	{
		type: '应用',
		component: 'sealaf',
		openSource: false,
		commercial: true,
	},
	{
		type: '应用',
		component: 'AI Proxy',
		openSource: false,
		commercial: true,
	},
	{
		type: '应用',
		component: 'Kubepanel',
		openSource: false,
		commercial: true,
	},
	{
		type: '应用',
		component: 'GPU 算力',
		openSource: false,
		commercial: true,
	},
	{
		type: '应用',
		component: '费用中心',
		openSource: true,
		commercial: true,
	},
	{
		type: '应用',
		component: '终端',
		openSource: true,
		commercial: true,
	},
	{
		type: '应用',
		component: '定时任务',
		openSource: true,
		commercial: true,
	},
	{
		type: '应用',
		component: '日志',
		openSource: false,
		commercial: true,
	},
];

function renderValue(value: string | boolean): React.ReactNode {
	if (typeof value === 'boolean') {
		return value ? (
			<Icon
				src={CheckOverFrameIcon}
				className='text-brand size-5'
			/>
		) : (
			<Icon
				src={FramedCrossIcon}
				className='text-muted-foreground size-5'
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
		<div className='flex flex-col gap-16'>
			<div className='flex flex-col items-center gap-4 text-center'>
				<h2 className='text-3xl font-semibold'>
					为什么选择 <span className='text-brand'>Sealos 私有云</span>
				</h2>
				<p className='text-muted-foreground text-base'>
					与传统云操作系统相比,Sealos 私有云在部署简易性、运维成本、技术先进性方面具有显著优势
				</p>
			</div>
			<div className='relative overflow-x-auto'>
				<div className='bg-foreground text-background relative left-[66.66%] z-10 w-64 rounded-tr-3xl py-4 pl-4 font-normal whitespace-nowrap'>
					推荐选择
				</div>

				<table className='border-border w-full border-collapse border'>
					<colgroup>
						<col className='w-1/6' />
						<col className='w-1/6' />
						<col className='w-1/3' />
						<col className='w-1/3' />
					</colgroup>
					<thead>
						<tr>
							<th className='border-border text-foreground h-20 border-r border-b px-8 text-center text-lg font-bold'>
								类型
							</th>
							<th className='border-border text-foreground h-20 border-b px-8 text-left text-lg font-bold'>
								组件
							</th>
							<th className='border-border text-foreground h-20 border-b px-8 text-left text-lg font-bold'>
								开源版
							</th>
							<th className='border-border text-brand relative h-20 border-b px-8 text-left text-lg font-bold'>
								商业版
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
											className='border-border text-muted-foreground border-r px-8 text-base'
											rowSpan={rows.length}
										>
											<div className='flex h-full items-center justify-center'>{type}</div>
										</td>
									)}
									<td className='border-border text-muted-foreground h-14 px-8 text-base'>
										{row.component}
									</td>
									<td className='border-border text-muted-foreground h-14 px-8 text-base'>
										<div className='flex items-center'>{renderValue(row.openSource)}</div>
									</td>
									<td className='border-border text-foreground relative h-14 bg-white/80 px-8 text-base'>
										<div className='flex items-center'>{renderValue(row.commercial)}</div>
									</td>
								</tr>
							)),
							...(typeIndex < typeEntries.length - 1
								? [
										<tr key={`spacer-${type}`}>
											<td
												colSpan={4}
												className='h-4'
											/>
										</tr>,
									]
								: []),
						])}
					</tbody>
				</table>
				<div className='border-brand pointer-events-none absolute top-14 left-2/3 h-[calc(100%-3.5rem)] w-1/3 rounded-none border' />
			</div>
		</div>
	);
}
