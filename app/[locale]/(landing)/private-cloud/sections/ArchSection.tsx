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

const archLayers: ArchLayer[] = [
	{
		label: '运维层',
		content: {
			type: 'simple',
			title: '统一运维与观测',
			items: ['Brain', 'Grafana'],
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
			type: 'grid',
			items: [
				{
					title: '应用能力',
					items: ['应用管理', 'DevBox', 'FastGPT', '数据库', '对象存储', '应用商店', 'AI Proxy'],
					columns: 4,
					border: {
						bl: [true, true],
						br: [true, true],
						tl: [true, true],
						tr: [true, true],
					},
					className: 'px-6 pt-3 pb-8',
				},
			],
		},
	},
	{
		label: '组件层',
		content: {
			type: 'grid',
			items: [
				{
					title: '平台公共组件',
					items: ['多租户', '日志', '监控', '告警', '网关', '负载均衡'],
					columns: 3,
					border: {
						bl: [true, true],
						br: [true, true],
						tl: [true, true],
						tr: [true, true],
					},
					className: 'px-6 pt-3 pb-8',
				},
			],
		},
	},
	{
		label: '调度层',
		content: {
			type: 'simple',
			title: '统一调度底座',
			items: ['Kubernetes'],
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
		label: '驱动层',
		content: {
			type: 'grid',
			items: [
				{
					title: '运行时与网络驱动',
					items: ['OpenI', 'Containerd', 'Firecracker', 'BSC', 'Cilium', 'Nvidia'],
					columns: 3,
					border: {
						bl: [true, true],
						br: [true, true],
						tl: [true, true],
						tr: [true, true],
					},
					className: 'px-6 pt-3 pb-8',
				},
			],
		},
	},
	{
		label: '操作系统',
		content: {
			type: 'grid',
			items: [
				{
					title: '支持国产操作系统',
					items: ['麒麟 V10', '统信 UOS', 'Ubuntu', 'CentOS'],
					columns: 2,
					border: {
						bl: [true, true],
						br: [true, true],
						tl: [true, true],
						tr: [true, true],
					},
					className: 'px-6 pt-3 pb-8',
				},
			],
		},
	},
	{
		label: '服务器',
		content: {
			type: 'grid',
			items: [
				{
					title: '支持混合云统一管理',
					items: ['虚拟机', '物理机', '裸金属'],
					columns: 3,
					border: {
						bl: [true, true],
						br: [true, true],
						tl: [true, true],
						tr: [true, true],
					},
					className: 'px-6 pt-3 pb-8',
				},
			],
		},
	},
];

function ItemBox({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex min-w-0 flex-1 items-center justify-center border border-zinc-300 px-3 py-1.5'>
			<span className='text-sidebar-foreground text-center text-sm leading-5 break-all'>{children}</span>
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
					<p className='text-sm leading-5 font-medium whitespace-nowrap'>{decoration.title}</p>
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
								'flex min-w-0 flex-1 flex-col items-center gap-2',
								column.border && 'relative',
								column.className,
							)}
						>
							<p className='text-center text-sm leading-5 font-medium'>{column.title}</p>
							<div className='flex w-full flex-1 flex-col items-stretch gap-2.5'>
								{rows.map((row, rowIdx) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: static content
										key={rowIdx}
										className='flex w-full flex-1 gap-2.5'
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
								'flex flex-1 flex-col items-center gap-2',
								item.border && 'relative',
								item.className,
							)}
						>
							<p className='text-sm leading-5 font-medium'>{item.title}</p>
							<div className='flex w-full flex-1 flex-col items-stretch gap-2.5'>
								{rows.map((row, rowIdx) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: static content
										key={rowIdx}
										className='flex w-full flex-1 items-stretch gap-2.5'
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
		<div className='flex w-full flex-col items-start gap-10'>
			<div className='flex w-full flex-col gap-4'>
				<h2 className='text-3xl font-semibold'>
					<span>技术</span>
					<span className='text-brand'>架构</span>
				</h2>
				<p className='text-muted-foreground text-base'>
					基于云原生技术栈构建，支持所有混合云部署，采用云操作系统理念，提供统一的资源抽象和动态管理。
				</p>
			</div>
			<div className='w-full max-w-full overflow-x-scroll'>
				<div className='flex w-full min-w-5xl flex-col'>
					{archLayers.map((layer) => (
						<div
							key={layer.label}
							className='grid w-full grid-cols-[max-content_1fr] items-center gap-0'
						>
							<p className='text-muted-foreground w-16 pr-8 text-base font-medium whitespace-nowrap'>
								{layer.label}
							</p>
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
