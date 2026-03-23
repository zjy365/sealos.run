import { cn } from '@/libs/utils/styling';

type BorderConfig = {
	bl: [boolean, boolean];
	br: [boolean, boolean];
	tl: [boolean, boolean];
	tr: [boolean, boolean];
};

type ArchLayerItem =
	| {
			type: 'simple';
			title?: string;
			items: string[];
			border?: BorderConfig;
			className?: string;
	  }
	| {
			type: 'columns';
			items: Array<{
				title: string;
				items: string[] | string[][];
				border?: BorderConfig;
				className?: string;
			}>;
			border?: BorderConfig;
			className?: string;
	  }
	| {
			type: 'grid';
			items: Array<{
				title: string;
				items: string[];
				columns?: number;
				border?: BorderConfig;
				className?: string;
			}>;
			border?: BorderConfig;
			className?: string;
	  };

type ArchLayer = {
	label: string;
	content: ArchLayerItem;
};

const fullBorder: BorderConfig = {
	bl: [true, true],
	br: [true, true],
	tl: [true, true],
	tr: [true, true],
};

const archLayers: ArchLayer[] = [
	{
		label: '访问',
		content: {
			type: 'simple',
			title: '用户访问',
			items: ['命令行界面 (CLI)', '图形用户界面 (GUI)'],
			border: {
				bl: [true, true],
				br: [true, true],
				tl: [true, true],
				tr: [true, true],
			},
			className: 'px-6 pt-3 pb-8',
		},
	},
	{
		label: '应用层',
		content: {
			type: 'columns',
			items: [
				{
					title: '应用管理',
					items: [
						['创建', '更新', '预览', '删除'],
						['调试', 'AI 分析'],
					],
					border: {
						bl: [true, true],
						br: [true, false],
						tl: [false, true],
						tr: [true, false],
					},
					className: 'pl-6 pr-1 pt-3 pb-8',
				},
				{
					title: '终端',
					items: [
						['kubectl', 'sealos', 'helm'],
						['go', 'vim', 'node'],
					],
					border: {
						bl: [true, true],
						br: [true, true],
						tl: [true, true],
						tr: [true, false],
					},
					className: 'px-1 pt-3 pb-8',
				},
				{
					title: '数据库提供商',
					items: [['Mongo', 'MySQL'], ['PostgreSQL']],
					border: {
						bl: [true, false],
						br: [true, true],
						tl: [true, true],
						tr: [false, true],
					},
					className: 'pr-6 pl-1 pt-3 pb-8',
				},
			],
		},
	},
	{
		label: '控制器',
		content: {
			type: 'columns',
			items: [
				{
					title: '网络',
					items: [
						['Http/WS/GRPC', '自动证书'],
						['TCP/UDP', '流量调度'],
					],
					border: {
						bl: [true, true],
						br: [true, false],
						tl: [false, true],
						tr: [true, false],
					},
					className: 'pl-6 pr-1 pt-3 pb-8',
				},
				{
					title: '多租户',
					items: ['基于角色的访问控制', '暂停/停止'],
					border: {
						bl: [true, true],
						br: [true, true],
						tl: [true, true],
						tr: [true, true],
					},
					className: 'px-1 pt-3 pb-8',
				},
				{
					title: '存储',
					items: [
						['备份/恢复', '持久卷'],
						['扩容', '到期删除'],
					],
					border: {
						bl: [true, false],
						br: [true, true],
						tl: [true, false],
						tr: [false, true],
					},
					className: 'pr-6 pl-1 pt-3 pb-8',
				},
			],
		},
	},
	{
		label: '集群',
		content: {
			type: 'grid',
			items: [
				{
					title: 'Sealos Kubernetes 集群 SG',
					items: ['CN', 'CRI', 'CSI', '网关', '监控', '通知', '计量'],
					columns: 3,
					border: {
						bl: [false, true],
						br: [true, false],
						tl: [false, true],
						tr: [true, true],
					},
					className: 'pl-6 pr-1 pt-3 pb-8',
				},
				{
					title: 'Sealos Kubernetes 集群 CN',
					items: ['CN', 'CRI', 'CSI', '网关', '监控', '通知', '计量'],
					columns: 3,
					border: {
						bl: [true, true],
						br: [false, true],
						tl: [true, false],
						tr: [false, true],
					},
					className: 'pr-6 pl-1 pt-3 pb-8',
				},
			],
		},
	},
	{
		label: '基础设施',
		content: {
			type: 'simple',
			items: ['阿里云', '谷歌云', '亚马逊云', '裸金属服务器'],
			border: fullBorder,
			className: 'px-6 py-3',
		},
	},
];

function ItemBox({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex min-w-0 flex-1 items-center justify-center border border-zinc-300 px-4 py-1'>
			<span className='text-sidebar-foreground text-center text-base leading-6 break-all'>{children}</span>
		</div>
	);
}

function CornerBorder({ border, className }: { border: BorderConfig; className?: string }) {
	const horizontalLength = 'min(40px, 8%)';
	const verticalLength = 'min(24px, 30%)';
	const strokeWidth = 1.5;
	const strokeColor = 'var(--color-brand)';
	const dashArray = '4 4';

	return (
		<svg
			className={cn('pointer-events-none absolute inset-0 size-full', className)}
			preserveAspectRatio='none'
			aria-hidden='true'
		>
			{border.tl[0] && (
				<line
					x1='0%'
					y1='0%'
					x2={`${horizontalLength}`}
					y2='0%'
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					strokeDasharray={dashArray}
					vectorEffect='non-scaling-stroke'
				/>
			)}
			{border.tl[1] && (
				<line
					x1='0%'
					y1={`${verticalLength}`}
					x2='0%'
					y2='0%'
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					strokeDasharray={dashArray}
					vectorEffect='non-scaling-stroke'
				/>
			)}
			{border.tr[0] && (
				<line
					x1={`calc(100% - ${horizontalLength})`}
					y1='0%'
					x2='100%'
					y2='0%'
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					strokeDasharray={dashArray}
					vectorEffect='non-scaling-stroke'
				/>
			)}
			{border.tr[1] && (
				<line
					x1='100%'
					y1='0%'
					x2='100%'
					y2={`${verticalLength}`}
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					strokeDasharray={dashArray}
					vectorEffect='non-scaling-stroke'
				/>
			)}
			{border.br[0] && (
				<line
					x1={`calc(100% - ${horizontalLength})`}
					y1='100%'
					x2='100%'
					y2='100%'
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					strokeDasharray={dashArray}
					vectorEffect='non-scaling-stroke'
				/>
			)}
			{border.br[1] && (
				<line
					x1='100%'
					y1={`calc(100% - ${verticalLength})`}
					x2='100%'
					y2='100%'
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					strokeDasharray={dashArray}
					vectorEffect='non-scaling-stroke'
				/>
			)}
			{border.bl[0] && (
				<line
					x1='0%'
					y1='100%'
					x2={`${horizontalLength}`}
					y2='100%'
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					strokeDasharray={dashArray}
					vectorEffect='non-scaling-stroke'
				/>
			)}
			{border.bl[1] && (
				<line
					x1='0%'
					y1={`calc(100% - ${verticalLength})`}
					x2='0%'
					y2='100%'
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					strokeDasharray={dashArray}
					vectorEffect='non-scaling-stroke'
				/>
			)}
		</svg>
	);
}

function renderContent(decoration: ArchLayerItem) {
	if (decoration.type === 'simple') {
		return (
			<div
				className={cn(
					'flex w-full flex-col items-center gap-2',
					decoration.border && 'relative',
					decoration.className,
				)}
			>
				{decoration.title && (
					<p className='text-base leading-6 font-medium whitespace-nowrap'>{decoration.title}</p>
				)}
				<div className='flex w-full items-stretch gap-3'>
					{decoration.items.map((item) => (
						<ItemBox key={item}>{item}</ItemBox>
					))}
				</div>
				{decoration.border && <CornerBorder border={decoration.border} />}
			</div>
		);
	}

	if (decoration.type === 'columns') {
		return (
			<div className={cn('flex w-full items-stretch', decoration.border && 'relative', decoration.className)}>
				{decoration.items.map((column) => {
					const rows: string[][] = Array.isArray(column.items[0])
						? (column.items as string[][])
						: (column.items as string[]).map((item) => [item]);

					return (
						<div
							key={column.title}
							className={cn(
								'flex min-w-0 flex-1 flex-col items-center gap-1.5',
								column.border && 'relative',
								column.className,
							)}
						>
							<p className='text-center text-base leading-6 font-medium'>{column.title}</p>
							<div className='flex w-full flex-1 flex-col items-stretch gap-2'>
								{rows.map((row, rowIdx) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: static content
										key={rowIdx}
										className='flex w-full flex-1 gap-2'
									>
										{row.map((item) => (
											<ItemBox key={item}>{item}</ItemBox>
										))}
									</div>
								))}
							</div>
							{column.border && <CornerBorder border={column.border} />}
						</div>
					);
				})}
				{decoration.border && <CornerBorder border={decoration.border} />}
			</div>
		);
	}

	if (decoration.type === 'grid') {
		return (
			<div className={cn('flex w-full items-stretch', decoration.border && 'relative', decoration.className)}>
				{decoration.items.map((item) => {
					const columns = item.columns ?? 3;
					const rows: string[][] = (item.items as string[]).reduce<string[][]>((acc, subItem, subIndex) => {
						const rowIndex = Math.floor(subIndex / columns);
						if (!acc[rowIndex]) {
							acc[rowIndex] = [];
						}
						acc[rowIndex].push(subItem);
						return acc;
					}, []);

					return (
						<div
							key={item.title}
							className={cn(
								'flex flex-1 flex-col items-center gap-1.5',
								item.border && 'relative',
								item.className,
							)}
						>
							<p className='text-base leading-6 font-medium'>{item.title}</p>
							<div className='flex w-full flex-1 flex-col items-stretch gap-2'>
								{rows.map((row, rowIdx) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: static content
										key={rowIdx}
										className='flex w-full flex-1 items-stretch gap-2'
									>
										{row.map((subItem) => (
											<ItemBox key={subItem}>{subItem}</ItemBox>
										))}
									</div>
								))}
							</div>
							{item.border && <CornerBorder border={item.border} />}
						</div>
					);
				})}
				{decoration.border && <CornerBorder border={decoration.border} />}
			</div>
		);
	}

	return null;
}

export function ArchSection() {
	return (
		<div className='flex w-full flex-col items-start gap-14'>
			<div className='flex w-full flex-col gap-4'>
				<h2 className='text-3xl font-semibold'>
					<span>技术</span>
					<span className='text-brand'>架构</span>
				</h2>
				<p className='text-muted-foreground text-base'>
					基于云原生技术栈构建,支持所有混合云部署,采用云操作系统理念,提供统一的资源抽象和动态管理
				</p>
			</div>
			<div className='w-full max-w-full overflow-x-scroll'>
				<div className='flex w-full min-w-5xl flex-col'>
					{archLayers.map((layer) => (
						<div
							key={layer.label}
							className='grid w-full grid-cols-[max-content_1fr] items-center gap-0'
						>
							<p className='w-20 pr-36 text-xl font-medium whitespace-nowrap'>{layer.label}</p>
							<div className={cn('w-full', layer.content.border && 'relative')}>
								{renderContent(layer.content)}
								{layer.content.border && <CornerBorder border={layer.content.border} />}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
