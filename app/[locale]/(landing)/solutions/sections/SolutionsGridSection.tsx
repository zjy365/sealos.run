'use client';

import React from 'react';
import {
	AiIcon,
	ApiIcon,
	AppIcon,
	BoxIcon,
	BuildingIcon,
	ClockCounterIcon,
	CloudBoxIcon,
	CpuIcon,
	CubesIcon,
	DatabaseIcon,
	DatabaseStackedIcon,
	DiskIcon,
	EditorIcon,
	GlobalIcon,
	LayersIcon,
	LinkIcon,
	MemoryIcon,
	ModelIcon,
	ObjectStorageIcon,
	PhoneIcon,
	RocketIcon,
	TemplateIcon,
	ToolIcon,
} from '@/assets/icons';
import { Badge } from '@/libs/components/ui/badge';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import type { InlinedSvgData } from '@/libs/types';
import { cn } from '@/libs/utils/styling';

type SolutionsTabKey = 'ai-compute' | 'app-dev' | 'app-hosting' | 'data-storage' | 'ai-boost';

type SolutionsTab = {
	key: SolutionsTabKey;
	label: string;
};

type SolutionCardData = {
	title: string;
	description: string;
	icon: InlinedSvgData;
	tags: string[];
};

const tabs: SolutionsTab[] = [
	{ key: 'ai-compute', label: 'AI 算力' },
	{ key: 'app-dev', label: '应用开发' },
	{ key: 'app-hosting', label: '应用托管' },
	{ key: 'data-storage', label: '数据存储' },
	{ key: 'ai-boost', label: 'AI 助力' },
];

const appDevCards: SolutionCardData[] = [
	{
		title: 'Web 应用开发',
		description: '从前端到后端，快速构建和部署现代化 Web 应用',
		icon: GlobalIcon,
		tags: ['DevBox', '数据库'],
	},
	{
		title: 'API 服务',
		description: '构建高性能、可扩展的 API 服务，支持移动端和第三方集成',
		icon: ApiIcon,
		tags: ['DevBox', '数据库'],
	},
	{
		title: '数据库应用',
		description: '基于数据库快速构建业务应用，实现数据的增删改查和分析',
		icon: DatabaseIcon,
		tags: ['DevBox', '数据库'],
	},
	{
		title: '移动应用后端',
		description: '为移动 App 提供稳定可靠的后端 API 和数据服务',
		icon: PhoneIcon,
		tags: ['DevBox', '数据库'],
	},
	{
		title: '微信小游戏开发',
		description: '基于数据库快速构建业务应用，实现数据的增删改查和分析',
		icon: EditorIcon,
		tags: ['DevBox', '数据库'],
	},
	{
		title: '数据库应用',
		description: '基于数据库快速构建业务应用，实现数据的增删改查和分析',
		icon: DatabaseIcon,
		tags: ['DevBox', '数据库'],
	},
	{
		title: '数据库应用',
		description: '基于数据库快速构建业务应用，实现数据的增删改查和分析',
		icon: DatabaseIcon,
		tags: ['DevBox', '数据库'],
	},
	{
		title: '企业内部系统',
		description: '构建企业内部使用的管理系统和工作流程应用',
		icon: BuildingIcon,
		tags: ['DevBox', '数据库'],
	},
];

const aiComputeCards: SolutionCardData[] = [
	{
		title: '训练集群',
		description: '按需创建 GPU/CPU 训练集群，统一调度与隔离',
		icon: CpuIcon,
		tags: ['AI 算力', '集群'],
	},
	{
		title: '推理服务',
		description: '一键发布推理服务，支持弹性扩缩与灰度升级',
		icon: ModelIcon,
		tags: ['推理', '弹性'],
	},
	{
		title: '算力池',
		description: '多集群算力统一纳管，配额与计量可视化',
		icon: CubesIcon,
		tags: ['配额', '计量'],
	},
	{
		title: '镜像与依赖',
		description: '加速镜像构建与分发，缩短训练/部署启动时间',
		icon: BoxIcon,
		tags: ['镜像', '加速'],
	},
	{
		title: '任务编排',
		description: '支持多阶段任务编排，复用模板快速搭建流水线',
		icon: TemplateIcon,
		tags: ['编排', '模板'],
	},
	{
		title: '多租户隔离',
		description: '租户级隔离与权限控制，保障算力安全与合规',
		icon: LayersIcon,
		tags: ['多租户', '权限'],
	},
	{
		title: '数据通道',
		description: '训练数据与模型产物高效传输，减少 IO 瓶颈',
		icon: DiskIcon,
		tags: ['IO', '吞吐'],
	},
	{
		title: '资源监控',
		description: 'GPU/CPU/内存实时监控与告警，定位热点更快',
		icon: MemoryIcon,
		tags: ['监控', '告警'],
	},
	{
		title: '作业优先级',
		description: '按业务优先级调度资源，保证关键任务先跑起来',
		icon: RocketIcon,
		tags: ['优先级', '调度'],
	},
	{
		title: '成本优化',
		description: '闲置回收与自动扩缩，降低长期运行成本',
		icon: ToolIcon,
		tags: ['成本', '回收'],
	},
	{
		title: '模型仓库',
		description: '模型版本管理与回滚，统一追踪训练与发布',
		icon: AiIcon,
		tags: ['版本', '回滚'],
	},
	{
		title: '边缘算力',
		description: '面向边缘节点的轻量调度与统一运维',
		icon: CloudBoxIcon,
		tags: ['边缘', '运维'],
	},
];

const appHostingCards: SolutionCardData[] = [
	{
		title: '一键发布',
		description: '从代码到线上，一键构建并发布应用',
		icon: RocketIcon,
		tags: ['发布', 'CI/CD'],
	},
	{
		title: '多环境管理',
		description: '开发/测试/生产环境隔离与一体化管理',
		icon: LayersIcon,
		tags: ['环境', '隔离'],
	},
	{
		title: '弹性扩缩',
		description: '按流量自动扩缩容，稳定应对突发访问',
		icon: CubesIcon,
		tags: ['弹性', '稳定'],
	},
	{
		title: '配置与密钥',
		description: '集中管理配置与密钥，安全可控',
		icon: ToolIcon,
		tags: ['配置', '安全'],
	},
	{
		title: '灰度发布',
		description: '分批上线与回滚，降低变更风险',
		icon: TemplateIcon,
		tags: ['灰度', '回滚'],
	},
	{
		title: '日志与追踪',
		description: '统一日志、链路追踪与告警，快速定位问题',
		icon: GlobalIcon,
		tags: ['可观测', '告警'],
	},
	{
		title: '服务网关',
		description: '统一入口与路由治理，支持鉴权与限流',
		icon: ApiIcon,
		tags: ['网关', '治理'],
	},
	{
		title: '服务目录',
		description: '应用与依赖服务统一目录化管理，方便复用',
		icon: AppIcon,
		tags: ['目录', '复用'],
	},
	{
		title: '多租户托管',
		description: '企业级多租户托管能力，权限清晰可审计',
		icon: BuildingIcon,
		tags: ['企业', '多租户'],
	},
	{
		title: '定时任务',
		description: 'CronJob 与任务队列统一托管，可靠执行',
		icon: ClockCounterIcon,
		tags: ['任务', '可靠'],
	},
	{
		title: '域名与证书',
		description: '自动化证书签发与续期，HTTPS 开箱即用',
		icon: LinkIcon,
		tags: ['HTTPS', '自动化'],
	},
	{
		title: '跨区域部署',
		description: '支持多地域部署与就近访问，提升体验',
		icon: CloudBoxIcon,
		tags: ['多地域', '可用性'],
	},
];

const dataStorageCards: SolutionCardData[] = [
	{
		title: '托管数据库',
		description: '标准化交付与自动化运维，数据库即开即用',
		icon: DatabaseIcon,
		tags: ['数据库', '托管'],
	},
	{
		title: '对象存储',
		description: '海量文件存储与加速分发，面向图片/音视频/备份',
		icon: ObjectStorageIcon,
		tags: ['对象存储', '分发'],
	},
	{
		title: '数据备份',
		description: '自动备份与按需恢复，降低数据风险',
		icon: DiskIcon,
		tags: ['备份', '恢复'],
	},
	{
		title: '读写分离',
		description: '读写分离与连接池优化，提升吞吐能力',
		icon: DatabaseStackedIcon,
		tags: ['性能', '吞吐'],
	},
	{
		title: '多副本高可用',
		description: '多副本与故障切换，保障业务连续性',
		icon: LayersIcon,
		tags: ['高可用', '容灾'],
	},
	{
		title: '数据迁移',
		description: '支持平滑迁移与校验，降低迁移成本',
		icon: ToolIcon,
		tags: ['迁移', '校验'],
	},
	{
		title: '冷热分层',
		description: '冷热数据分层存储，降低整体成本',
		icon: BoxIcon,
		tags: ['分层', '成本'],
	},
	{
		title: '指标监控',
		description: '存储与数据库指标监控，告警及时可控',
		icon: MemoryIcon,
		tags: ['监控', '告警'],
	},
	{
		title: '权限与审计',
		description: '细粒度权限控制与审计日志，满足合规要求',
		icon: BuildingIcon,
		tags: ['权限', '审计'],
	},
	{
		title: '多租户隔离',
		description: '租户级资源隔离，避免相互影响',
		icon: CubesIcon,
		tags: ['多租户', '隔离'],
	},
	{
		title: '数据 API',
		description: '统一数据访问 API，简化业务集成',
		icon: ApiIcon,
		tags: ['API', '集成'],
	},
	{
		title: '缓存加速',
		description: '缓存层与策略管理，提升响应速度',
		icon: RocketIcon,
		tags: ['缓存', '加速'],
	},
];

const aiBoostCards: SolutionCardData[] = [
	{
		title: 'AI Proxy 接入',
		description: '统一大模型 API 接入与路由，便于治理与切换',
		icon: ApiIcon,
		tags: ['AI', '路由'],
	},
	{
		title: 'Prompt 工程',
		description: '模板化 Prompt 管理与版本控制，便于复用',
		icon: TemplateIcon,
		tags: ['Prompt', '版本'],
	},
	{
		title: '应用模板',
		description: '用模板快速搭建 AI 应用骨架，降低上手成本',
		icon: AppIcon,
		tags: ['模板', '加速'],
	},
	{
		title: '数据集成',
		description: '连接业务数据源，为检索与分析提供支撑',
		icon: GlobalIcon,
		tags: ['数据源', '集成'],
	},
	{
		title: '向量存储',
		description: '向量数据存储与索引，加速检索增强',
		icon: DatabaseStackedIcon,
		tags: ['向量', '检索'],
	},
	{
		title: 'A/B 实验',
		description: '对比不同模型与策略效果，数据驱动迭代',
		icon: ToolIcon,
		tags: ['实验', '对比'],
	},
	{
		title: '内容安全',
		description: '敏感内容检测与策略控制，保障输出合规',
		icon: LayersIcon,
		tags: ['安全', '合规'],
	},
	{
		title: '多模型切换',
		description: '按成本/质量/延迟切换模型，最优可用',
		icon: ModelIcon,
		tags: ['模型', '策略'],
	},
	{
		title: '调用监控',
		description: '统计调用量、延迟与失败率，快速定位问题',
		icon: MemoryIcon,
		tags: ['监控', '统计'],
	},
	{
		title: '成本控制',
		description: '按租户/应用计量计费，预算可控',
		icon: CpuIcon,
		tags: ['成本', '计量'],
	},
	{
		title: '知识库构建',
		description: '知识库采集与更新流程，持续保持内容新鲜',
		icon: EditorIcon,
		tags: ['知识库', '更新'],
	},
	{
		title: '工作流编排',
		description: '多步骤工具调用编排，打造自动化智能体',
		icon: CubesIcon,
		tags: ['工作流', '自动化'],
	},
];

const dataByTab: Record<SolutionsTabKey, SolutionCardData[]> = {
	'ai-compute': aiComputeCards,
	'app-dev': appDevCards,
	'app-hosting': appHostingCards,
	'data-storage': dataStorageCards,
	'ai-boost': aiBoostCards,
};

function SolutionsTabPill({
	active,
	children,
	onClick,
}: {
	active: boolean;
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<Button
			variant='outline'
			size='default'
			onClick={onClick}
			className={cn(
				'px-4 text-xs leading-normal transition-colors sm:text-xl',
				active
					? 'border-border text-foreground bg-white sm:font-semibold'
					: 'border-border text-muted-foreground bg-transparent font-normal hover:bg-white/70',
			)}
		>
			{children}
		</Button>
	);
}

function TagPill({ text }: { text: string }) {
	return (
		<Badge
			variant='outline'
			size='sm'
			className='text-foreground border-zinc-400/80 bg-white/5 px-3 py-1 text-sm'
		>
			<span className='bg-brand size-1.5 rounded-full' />
			<span className='leading-normal'>{text}</span>
		</Badge>
	);
}

function SolutionCard({ data }: { data: SolutionCardData }) {
	return (
		<div className='border-brand border-b border-dashed py-10 nth-last-[-n+1]:border-none sm:nth-last-[-n+2]:border-none lg:nth-last-[-n+4]:border-none'>
			<div className='border-brand flex flex-col gap-16 border-dashed px-8 sm:not-[&:nth-child(2n)>div]:border-r lg:not-[&:nth-child(4n)>div]:border-r'>
				<div className='flex flex-col gap-5'>
					<div className='flex items-center gap-2'>
						<div className='size-6'>
							<Icon
								src={data.icon}
								className='size-full'
							/>
						</div>
						<p className='text-foreground text-xl leading-normal font-medium'>{data.title}</p>
					</div>
					<p className='text-muted-foreground h-[3lh] text-base leading-normal font-normal whitespace-pre-wrap'>
						{data.description}
					</p>
				</div>

				<div className='flex flex-wrap items-center gap-2'>
					{data.tags.map((t) => (
						<TagPill
							key={t}
							text={t}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export function SolutionsGridSection() {
	const [activeTab, setActiveTab] = React.useState<SolutionsTabKey>('app-dev');
	const scrollRef = React.useRef<HTMLDivElement | null>(null);

	const cards = dataByTab[activeTab] ?? [];

	return (
		<div className='flex w-full flex-col items-center gap-10'>
			<div className='flex flex-wrap items-center justify-center gap-2'>
				{tabs.map((t) => (
					<SolutionsTabPill
						key={t.key}
						active={activeTab === t.key}
						onClick={() => {
							if (scrollRef.current) scrollRef.current.scrollTop = 0;
							setActiveTab(t.key);
						}}
					>
						{t.label}
					</SolutionsTabPill>
				))}
			</div>

			{cards.length > 0 && (
				<div
					ref={scrollRef}
					className={cn(
						'w-full overflow-y-auto overscroll-contain',
						// roughly show ~2 rows by default, scroll for the rest
						'max-h-140 sm:max-h-155 lg:max-h-140',
					)}
				>
					<div className={cn('w-full', 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4')}>
						{cards.map((c, idx) => (
							<SolutionCard
								// eslint-disable-next-line react/no-array-index-key -- Figma content may be duplicated
								key={`${c.title}-${idx}`}
								data={c}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
