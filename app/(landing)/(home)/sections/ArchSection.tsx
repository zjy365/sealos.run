import { cn } from '@/libs/utils/styling';

type BorderConfig = {
	bl: [boolean, boolean]; // Bottom-left corner: [left side bottom, bottom side left]
	br: [boolean, boolean]; // Bottom-right corner: [right side bottom, bottom side right]
	tl: [boolean, boolean]; // Top-left corner: [left side top, top side left]
	tr: [boolean, boolean]; // Top-right corner: [right side top, top side right]
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
		label: '交互接入层',
		content: {
			type: 'simple',
			title: '用户访问',
			items: ['开发者终端 （Sealos CLI）', '开放 API 网关', '桌面级 Web 控制台'],
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
		label: 'AI 原生应用层',
		content: {
			type: 'columns',
			items: [
				{
					title: '产品梳理',
					items: ['Jotlin 需求分析', '需求挖掘', '文档生成', '版本管理'],
					border: {
						bl: [true, true],
						br: [true, false],
						tl: [false, true],
						tr: [true, false],
					},
					className: 'pl-6 pr-1 pt-3 pb-8',
				},
				{
					title: '在线开发',
					items: ['DevBox 云端环境', '10+ IDE 深度集成', '自动网络配置', 'CI/CD 流水线'],
					border: {
						bl: [true, true],
						br: [true, true],
						tl: [true, true],
						tr: [true, false],
					},
					className: 'px-1 pt-3 pb-8',
				},
				{
					title: '中间件',
					items: [
						'全栈数据库支持 (SQL/NoSQL)',
						'PgSQL/MySQL/Mongo/Redis',
						'数据交互 (Chat2DB)',
						'企业级高可用集群',
					],
					border: {
						bl: [true, false],
						br: [true, true],
						tl: [true, true],
						tr: [true, true],
					},
					className:
						'px-1 pt-3 pb-8 [&>div>:nth-child(n+1):nth-child(-n+2)_span]:text-xs xl:[&>div>:nth-child(n+1):nth-child(-n+2)_span]:text-sm',
				},
				{
					title: '智能运维',
					items: ['故障自愈', '证书自动续期', 'HPA 弹性伸缩', '高稳定性'],
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
		label: '核心管控层',
		content: {
			type: 'columns',
			items: [
				{
					title: '网络',
					items: [
						['Http/WS/GRPC', '自动证书'],
						['TCP/UDP', '全局流量治理'],
					],
					border: {
						bl: [true, true],
						br: [true, false],
						tl: [false, true],
						tr: [true, false],
					},
					className:
						'pl-6 pr-1 pt-3 pb-8 [&>div>div:nth-child(1)>div:nth-child(1)>span]:text-xs xl:[&>div>div:nth-child(1)>div:nth-child(1)>span]:text-base',
				},
				{
					title: '多租户',
					items: ['RBAC 权限体系', '沙箱隔离与多工作区'],
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
						['容灾备份机制', '扩容'],
						['持久卷', '分布式存储引擎'],
					],
					border: {
						bl: [true, false],
						br: [true, true],
						tl: [true, false],
						tr: [false, true],
					},
					className:
						'pr-6 pl-1 pt-3 pb-8 [&>div>div:nth-child(2)>div:nth-child(2)>span]:text-sm xl:[&>div>div:nth-child(2)>div:nth-child(2)>span]:text-base',
				},
			],
		},
	},
	{
		label: '分布式集群层',
		content: {
			type: 'grid',
			items: [
				{
					title: 'Sealos Kubernetes 集群 SG /CN',
					items: ['CNI 网络插件', 'CRI 容器运行时', 'CSI 存储插件', '网关', '监控', '告警', '精细化计量计费'],
					columns: 3,
					border: {
						bl: [false, true],
						br: [true, false],
						tl: [false, true],
						tr: [true, true],
					},
					className: 'pl-6 pr-1 pt-3 pb-8',
				},
			],
		},
	},
	{
		label: '混合基础设施',
		content: {
			type: 'simple',
			items: ['虚拟机', '物理机', 'AWS', 'GPU服务器'],
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
	const horizontalLength = 'min(40px, 8%)'; // Fixed horizontal line length in pixels
	const verticalLength = 'min(24px, 30%)'; // Fixed vertical line length in pixels
	const strokeWidth = 1.5;
	const strokeColor = 'var(--color-brand)';
	const dashArray = '4 4';

	return (
		<svg
			className={cn('pointer-events-none absolute inset-0 size-full', className)}
			preserveAspectRatio='none'
			aria-hidden='true'
		>
			{/* Top-left corner */}
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
			{/* Top-right corner */}
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
			{/* Bottom-right corner */}
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
			{/* Bottom-left corner */}
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
			<div>
				<h2 className='text-xl font-semibold sm:text-3xl'>
					<span>系统架构</span>
				</h2>
				<p className='text-muted-foreground mt-4 text-xs sm:text-base'>
					从内核到应用，构建 AI 时代的新一代云基础设施。
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
