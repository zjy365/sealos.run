'use client';

import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';
import {
	AppstoreBoxImage,
	BrainBoxImage,
	DatabaseBoxImage,
	DevboxBoxImage,
	LaunchpadBoxImage,
	OssBoxImage,
} from '@/assets/app-boxes';
import {
	GolangIcon,
	JavaIcon,
	KafkaIcon,
	MilvusIcon,
	MongodbIcon,
	MysqlIcon,
	NodejsIcon,
	PhpIcon,
	PostgresIcon,
	PythonIcon,
	RedisIcon,
	RustIcon,
} from '@/assets/app-icons';
import {
	BoxIcon,
	ClockCounterIcon,
	CubeIcon,
	CubesIcon,
	DatabaseIcon,
	EditorIcon,
	FlatArrowRightIcon,
	FramedPlusIcon,
	FramedPrivateIcon,
	FramedReadIcon,
	FramedWriteIcon,
	GlobalIcon,
	ModelIcon,
	ObjectStorageIcon,
	RocketIcon,
} from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { cn } from '@/libs/utils/styling';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface NavMenuItem {
	id: string;
	label: string;
	icon: StaticImageData;
	largeImage?: StaticImageData;
	largeImageAlt?: string;
	content?: {
		title: string;
		description: string;
		href?: string;
		features?: React.ReactNode;
	};
}

const navMenuItems: NavMenuItem[] = [
	{
		id: 'container',
		label: '容器',
		icon: BoxIcon,
		largeImage: LaunchpadBoxImage,
		largeImageAlt: '应用管理',
		content: {
			title: '应用管理',
			description: '原生 K8s 架构，可视化页面配置',
			href: '/products/launchpad',
			features: <LaunchpadFeatures />,
		},
	},
	{
		id: 'database',
		label: '数据库',
		icon: DatabaseIcon,
		largeImage: DatabaseBoxImage,
		largeImageAlt: '数据库服务',
		content: {
			title: '数据库服务',
			description: '提供多种数据库类型，一键部署和管理',
			href: '/products/database',
			features: <DatabaseFeatures />,
		},
	},
	{
		id: 'storage',
		label: '存储',
		icon: ObjectStorageIcon,
		largeImage: OssBoxImage,
		largeImageAlt: '对象存储',
		content: {
			title: '对象存储',
			description: '高性能、可扩展的对象存储服务',
			href: '/products/oss',
			features: <OSSFeatures />,
		},
	},
	{
		id: 'cloud-dev',
		label: '云开发',
		icon: RocketIcon,
		largeImage: DevboxBoxImage,
		largeImageAlt: 'DevBox',
		content: {
			title: 'DevBox',
			description: '云端开发环境，支持多种编程语言和框架',
			href: '/products/cloud-dev',
			features: <DevBoxFeatures />,
		},
	},
	{
		id: 'ai-model',
		label: 'AI 模型',
		icon: ModelIcon,
		largeImage: BrainBoxImage,
		largeImageAlt: 'AI Proxy',
		content: {
			title: 'AI Proxy',
			description: '统一的 AI 模型代理服务',
			href: '/products/ai-model',
			features: <AIProxyFeatures />,
		},
	},
	{
		id: 'app',
		label: '应用',
		icon: CubesIcon,
		largeImage: AppstoreBoxImage,
		largeImageAlt: '应用商店',
		content: {
			title: '应用商店',
			description: '丰富的应用模板，快速部署',
			href: '/products/app',
			features: <AppStoreFeatures />,
		},
	},
];

function LaunchpadFeatures() {
	const features = [
		{
			title: '容器服务',
			description: '提供高性能可伸缩的容器应用管理能力',
			icon: CubeIcon,
		},
		{
			title: '定时任务',
			description: '可视化创建和管理 Kubernetes 资源、状态',
			icon: ClockCounterIcon,
		},
		{
			title: '免费域名',
			description: '分配公网域名，自动配置 HTTPS、TLS',
			icon: GlobalIcon,
		},
		{
			title: '终端',
			description: '基于 Web 的容器终端访问',
			icon: EditorIcon,
		},
	];

	return (
		<div className='px-8 pt-0 pb-8'>
			<div className='grid grid-cols-2 gap-6'>
				{features.map((feature) => (
					<div
						key={feature.title}
						className='flex items-start gap-3 px-0 py-3'
					>
						<div className='text-primary size-6 shrink-0'>
							<Icon
								src={feature.icon}
								className='text-brand size-6'
							/>
						</div>
						<div className='flex flex-1 flex-col gap-1'>
							<h4 className='text-foreground text-sm font-normal'>{feature.title}</h4>
							<p className='text-muted-foreground text-xs'>{feature.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function DatabaseFeatures() {
	const databases = [
		{
			name: 'PostgreSQL',
			icon: PostgresIcon,
		},
		{
			name: 'MongoDB',
			icon: MongodbIcon,
		},
		{
			name: 'MySQL',
			icon: MysqlIcon,
		},
		{
			name: 'Redis',
			icon: RedisIcon,
		},
		{
			name: 'Kafka',
			icon: KafkaIcon,
		},
		{
			name: 'Milvus',
			icon: MilvusIcon,
		},
	];

	return (
		<div className='px-8 pt-0 pb-8'>
			<div className='grid grid-cols-3 gap-2.5'>
				{databases.map((db) => (
					<div
						key={db.name}
						className='border-border flex flex-1 flex-col items-start gap-2 border p-5'
					>
						<div className='flex size-8 items-center justify-center'>
							<Icon
								src={db.icon}
								className='size-8'
								colorful
							/>
						</div>
						<p className='text-foreground text-xs'>{db.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function OSSFeatures() {
	const storageTypes = [
		{
			title: '私有存储桶｜Private',
			description: '仅允许授权用户访问，保护数据安全',
			icon: FramedPrivateIcon,
		},
		{
			title: '公开读存储桶｜Public-Read',
			description: '允许公开读取，适合静态资源分发',
			icon: FramedReadIcon,
		},
		{
			title: '公开读写存储桶｜Public-Read-Write',
			description: '允许公开读写，适合协作场景',
			icon: FramedWriteIcon,
		},
	];

	return (
		<div className='px-8 pt-0 pb-8'>
			<div className='flex flex-col gap-6 py-3'>
				{storageTypes.map((type) => (
					<div
						key={type.title}
						className='flex items-start gap-3'
					>
						<div className='text-primary size-6 shrink-0'>
							<Icon
								src={type.icon}
								className='text-brand size-6'
							/>
						</div>
						<div className='flex flex-1 flex-col gap-1'>
							<h4 className='text-foreground text-sm font-normal'>{type.title}</h4>
							<p className='text-muted-foreground text-xs'>{type.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function DevBoxFeatures() {
	const languages = [
		{
			name: 'Java',
			icon: JavaIcon,
		},
		{
			name: 'Python',
			icon: PythonIcon,
		},
		{
			name: 'Node.js',
			icon: NodejsIcon,
		},
		{
			name: 'Go',
			icon: GolangIcon,
		},
		{
			name: 'Rust',
			icon: RustIcon,
		},
		{ name: 'C++', icon: null },
		{
			name: 'PHP',
			icon: PhpIcon,
		},
		{ name: 'Ruby', icon: null },
		{
			name: '更多',
			icon: FramedPlusIcon,
		},
	];

	return (
		<div className='px-8 pb-8'>
			<div className='grid grid-cols-4 gap-2.5'>
				{languages.map((lang) => (
					<div
						key={lang.name}
						className='border-border flex items-center gap-2 border px-3 py-4'
					>
						{lang.icon ? (
							<div className='flex size-6 items-center justify-center'>
								<Icon
									src={lang.icon}
									className={lang.name === '更多' ? 'text-brand size-6' : 'size-6'}
									colorful={lang.name !== '更多'}
								/>
							</div>
						) : (
							<div className='size-6' />
						)}
						<p className='text-foreground text-xs'>{lang.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function AIProxyFeatures() {
	const [activeTab, setActiveTab] = React.useState('千问');

	const tabs = ['千问', '豆包', '智谱'];

	const modelsByTab: Record<string, Array<{ name: string; tags: string[] }>> = {
		千问: [
			{
				name: 'qwen-turbo',
				tags: ['聊天补全', '工具调用', '128K'],
			},
			{
				name: 'qwen-plus',
				tags: ['聊天补全', '工具调用', '128K'],
			},
			{
				name: 'qwen-max',
				tags: ['聊天补全', '工具调用', '128K'],
			},
			{
				name: 'qwen-vl-max',
				tags: ['聊天补全', '视觉', '工具调用', '128K', '4K 输出'],
			},
		],
		豆包: [
			{
				name: 'doubao-pro',
				tags: ['聊天补全', '工具调用', '128K'],
			},
			{
				name: 'doubao-lite',
				tags: ['聊天补全', '工具调用', '64K'],
			},
			{
				name: 'doubao-vision',
				tags: ['聊天补全', '视觉', '工具调用', '128K'],
			},
		],
		智谱: [
			{
				name: 'glm-4',
				tags: ['聊天补全', '工具调用', '128K'],
			},
			{
				name: 'glm-4-plus',
				tags: ['聊天补全', '工具调用', '128K'],
			},
			{
				name: 'glm-4v',
				tags: ['聊天补全', '视觉', '工具调用', '128K'],
			},
		],
	};

	const models = modelsByTab[activeTab] || [];

	return (
		<div className='px-8 pt-0 pb-8'>
			<div className='flex flex-col gap-5'>
				{/* Tabs */}
				<div className='border-border flex border-b'>
					{tabs.map((tab) => (
						<button
							key={tab}
							type='button'
							onClick={() => setActiveTab(tab)}
							className={cn(
								'rounded-t-md px-3 py-2 text-xs transition-colors',
								activeTab === tab
									? 'text-foreground border-foreground border-b-2'
									: 'text-muted-foreground hover:text-foreground',
							)}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Models */}
				<div className='flex flex-col gap-4'>
					{models.map((model) => (
						<div
							key={model.name}
							className='flex items-center gap-3'
						>
							<p className='text-foreground text-xs whitespace-nowrap'>{model.name}</p>
							<div className='flex flex-wrap gap-2'>
								{model.tags.map((tag, tagIndex) => (
									<Badge
										key={tag}
										variant={tagIndex === 0 ? 'default' : 'outline'}
									>
										{tagIndex === 0 && (
											<span className='bg-brand inline-block size-1.5 shrink-0 rounded-full' />
										)}

										{tag}
									</Badge>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function AppStoreFeatures() {
	const [activeCategory, setActiveCategory] = React.useState('AI');

	const categories = ['AI', '数据库', '应用', '工具', '低代码', '后端', 'DevOps', '游戏', '监控', '博客', '存储'];

	const appsByCategory: Record<string, Array<{ name: string; icon: null }>> = {
		AI: [
			{ name: 'ChatGPT', icon: null },
			{ name: 'Claude', icon: null },
			{ name: 'Midjourney', icon: null },
			{ name: 'Stable Diffusion', icon: null },
			{ name: 'DALL-E', icon: null },
			{ name: 'GPT-4', icon: null },
		],
		数据库: [
			{ name: 'PostgreSQL', icon: null },
			{ name: 'MySQL', icon: null },
			{ name: 'MongoDB', icon: null },
			{ name: 'Redis', icon: null },
			{ name: 'Elasticsearch', icon: null },
			{ name: 'InfluxDB', icon: null },
		],
		应用: [
			{ name: 'AFFiNE', icon: null },
			{ name: 'WordPress', icon: null },
			{ name: 'Ghost', icon: null },
			{ name: 'Gitea', icon: null },
			{ name: 'Jupyter', icon: null },
			{ name: 'VS Code', icon: null },
		],
		工具: [
			{ name: 'Jenkins', icon: null },
			{ name: 'GitLab', icon: null },
			{ name: 'SonarQube', icon: null },
			{ name: 'Grafana', icon: null },
			{ name: 'Prometheus', icon: null },
			{ name: 'ELK Stack', icon: null },
		],
		低代码: [
			{ name: 'Appsmith', icon: null },
			{ name: 'Retool', icon: null },
			{ name: 'Budibase', icon: null },
			{ name: 'NocoDB', icon: null },
			{ name: 'ToolJet', icon: null },
			{ name: 'Metabase', icon: null },
		],
		后端: [
			{ name: 'Node.js', icon: null },
			{ name: 'Python', icon: null },
			{ name: 'Go', icon: null },
			{ name: 'Java', icon: null },
			{ name: 'PHP', icon: null },
			{ name: 'Ruby', icon: null },
		],
		DevOps: [
			{ name: 'Kubernetes', icon: null },
			{ name: 'Docker', icon: null },
			{ name: 'Terraform', icon: null },
			{ name: 'Ansible', icon: null },
			{ name: 'ArgoCD', icon: null },
			{ name: 'Helm', icon: null },
		],
		游戏: [
			{ name: 'Minecraft', icon: null },
			{ name: 'Terraria', icon: null },
			{ name: 'Factorio', icon: null },
			{ name: 'Valheim', icon: null },
			{ name: 'Rust', icon: null },
			{ name: 'ARK', icon: null },
		],
		监控: [
			{ name: 'Grafana', icon: null },
			{ name: 'Prometheus', icon: null },
			{ name: 'Loki', icon: null },
			{ name: 'Jaeger', icon: null },
			{ name: 'Zabbix', icon: null },
			{ name: 'Nagios', icon: null },
		],
		博客: [
			{ name: 'Ghost', icon: null },
			{ name: 'WordPress', icon: null },
			{ name: 'Hexo', icon: null },
			{ name: 'Hugo', icon: null },
			{ name: 'Jekyll', icon: null },
			{ name: 'Gatsby', icon: null },
		],
		存储: [
			{ name: 'MinIO', icon: null },
			{ name: 'Nextcloud', icon: null },
			{ name: 'SeaweedFS', icon: null },
			{ name: 'Ceph', icon: null },
			{ name: 'GlusterFS', icon: null },
			{ name: 'Longhorn', icon: null },
		],
	};

	const apps = appsByCategory[activeCategory] || [];

	return (
		<div className='px-8 pt-0 pb-8'>
			<div className='flex flex-col gap-5'>
				{/* Category Tabs */}
				<div className='border-border flex overflow-x-auto border-b'>
					{categories.map((category) => (
						<button
							key={category}
							type='button'
							onClick={() => setActiveCategory(category)}
							className={cn(
								'rounded-t-md px-3 py-2 text-xs whitespace-nowrap transition-colors',
								activeCategory === category
									? 'text-foreground border-foreground border-b-2'
									: 'text-muted-foreground hover:text-foreground',
							)}
						>
							{category}
						</button>
					))}
				</div>

				{/* Apps Grid */}
				<div className='grid grid-cols-3 gap-2.5'>
					{apps.map((app) => (
						<div
							key={app.name}
							className='border-border flex items-center gap-2 border px-3 py-4'
						>
							<div className='size-6' />
							<p className='text-foreground text-xs'>{app.name}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function ProductsPanel() {
	const [selectedItem, setSelectedItem] = React.useState<NavMenuItem | null>(
		navMenuItems.find((item) => item.content) || null,
	);

	return (
		<div className='bg-card flex w-200 border border-dashed border-blue-400 p-0'>
			{/* Left Sidebar */}
			<div className='flex w-40 flex-col gap-2 border-r border-dashed border-blue-400 px-4 py-6'>
				{navMenuItems.map((item) => {
					const isSelected = selectedItem?.id === item.id;
					return (
						<button
							key={item.id}
							type='button'
							onClick={() => setSelectedItem(item)}
							className={cn(
								'flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors',
								isSelected
									? 'text-foreground font-medium'
									: 'text-muted-foreground hover:text-foreground',
							)}
						>
							<div
								className={cn(
									'flex size-4 items-center justify-center',
									isSelected ? 'text-primary' : 'text-muted-foreground',
								)}
							>
								<Icon
									src={item.icon}
									className='size-4'
								/>
							</div>
							<span>{item.label}</span>
						</button>
					);
				})}
			</div>

			{/* Right Content */}
			{selectedItem?.content && (
				<div className='flex flex-1 flex-col'>
					{/* Header */}
					<div className='flex items-center justify-between px-8 pt-10 pb-5'>
						<div className='flex items-center gap-4'>
							{selectedItem.largeImage && (
								<div className='flex size-12 shrink-0 items-center justify-center'>
									<Image
										src={selectedItem.largeImage}
										alt={selectedItem.largeImageAlt || ''}
										className='size-12'
									/>
								</div>
							)}
							<div className='flex flex-col gap-1'>
								<h3 className='text-foreground text-base font-normal'>{selectedItem.content.title}</h3>
								<p className='text-muted-foreground text-xs'>{selectedItem.content.description}</p>
							</div>
						</div>
						{selectedItem.content.href && (
							<Button
								asChild
								variant='outline'
							>
								<a href={selectedItem.content.href}>
									<span>详情</span>
									<Icon
										src={FlatArrowRightIcon}
										className='size-5 stroke-2'
									/>
								</a>
							</Button>
						)}
					</div>

					{/* Features Content */}
					{selectedItem.content.features}
				</div>
			)}
		</div>
	);
}
