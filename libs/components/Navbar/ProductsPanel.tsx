'use client';

import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';
import {
	Ai360Icon,
	AlibabaIcon,
	AnthropicIcon,
	BaaiIcon,
	BaichuanIcon,
	BaiduIcon,
	ChatglmIcon,
	CohereIcon,
	DeepseekIcon,
	DefogIcon,
	DoubaoIcon,
	FishaudioIcon,
	GoogleIcon,
	HuggingfaceIcon,
	LingyiwanwuIcon,
	MetaIcon,
	MicrosoftIcon,
	MinimaxIcon,
	MistralIcon,
	MoonshotIcon,
	NeteaseIcon,
	NexusflowIcon,
	OpenaiIcon,
	OpenchatIcon,
	StabilityaiIcon,
	StepfunIcon,
	StreamlakeIcon,
	TencentIcon,
	UnknownIcon,
	XunfeiIcon,
} from '@/assets/aiproxy-models';
import {
	AiproxyBoxImage,
	AppstoreBoxImage,
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
	AppIcon,
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
import { Link, usePathname } from '@/libs/i18n/navigation';
import { cn } from '@/libs/utils/styling';
import type { AIProxyProviderPanelData, AppStoreCategoryPanelData, ProductsPanelData } from './products-panel.types';

const AIPROXY_OWNER_ICONS = {
	ai360: Ai360Icon,
	alibaba: AlibabaIcon,
	anthropic: AnthropicIcon,
	baai: BaaiIcon,
	baichuan: BaichuanIcon,
	baidu: BaiduIcon,
	chatglm: ChatglmIcon,
	cohere: CohereIcon,
	deepseek: DeepseekIcon,
	defog: DefogIcon,
	doubao: DoubaoIcon,
	fishaudio: FishaudioIcon,
	funaudiollm: AlibabaIcon,
	google: GoogleIcon,
	huggingface: HuggingfaceIcon,
	jina: UnknownIcon,
	lingyiwanwu: LingyiwanwuIcon,
	meta: MetaIcon,
	microsoft: MicrosoftIcon,
	minimax: MinimaxIcon,
	mistral: MistralIcon,
	moonshot: MoonshotIcon,
	netease: NeteaseIcon,
	nexusflow: NexusflowIcon,
	openai: OpenaiIcon,
	openchat: OpenchatIcon,
	stabilityai: StabilityaiIcon,
	stepfun: StepfunIcon,
	streamlake: StreamlakeIcon,
	tencent: TencentIcon,
	unknown: UnknownIcon,
	xunfei: XunfeiIcon,
} as const;

function getAIProxyOwnerIcon(ownerKey: string) {
	return AIPROXY_OWNER_ICONS[ownerKey as keyof typeof AIPROXY_OWNER_ICONS] ?? UnknownIcon;
}

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

function getNavMenuItems({ aiproxyProviders, appStoreCategories }: ProductsPanelData): NavMenuItem[] {
	return [
		{
			id: 'launchpad',
			label: '应用管理',
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
			id: 'oss',
			label: '对象存储',
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
			id: 'devbox',
			label: 'DevBox',
			icon: RocketIcon,
			largeImage: DevboxBoxImage,
			largeImageAlt: 'DevBox',
			content: {
				title: 'DevBox',
				description: '云端开发环境，支持多种编程语言和框架',
				href: '/products/devbox',
				features: <DevBoxFeatures />,
			},
		},
		{
			id: 'aiproxy',
			label: 'AI 网关',
			icon: ModelIcon,
			largeImage: AiproxyBoxImage,
			largeImageAlt: 'AI Proxy',
			content: {
				title: 'AI Proxy',
				description: '统一的 AI 模型代理服务',
				href: '/products/aiproxy',
				features: <AIProxyFeatures providers={aiproxyProviders} />,
			},
		},
		{
			id: 'app',
			label: '开源应用',
			icon: CubesIcon,
			largeImage: AppstoreBoxImage,
			largeImageAlt: '应用商店',
			content: {
				title: '应用商店',
				description: '丰富的应用模板，快速部署',
				href: '/products/appstore',
				features: <AppStoreFeatures categories={appStoreCategories} />,
			},
		},
	];
}

function LaunchpadFeatures() {
	const features = [
		{
			title: '容器服务',
			description: '提供高性能可伸缩的容器应用管理能力',
			icon: CubeIcon,
			href: '/products/launchpad',
		},
		{
			title: '定时任务',
			description: '可视化创建和管理 Kubernetes 资源、状态',
			icon: ClockCounterIcon,
			href: '/products/launchpad',
		},
		{
			title: '免费域名',
			description: '分配公网域名，自动配置 HTTPS、TLS',
			icon: GlobalIcon,
			href: '/products/launchpad',
		},
		{
			title: '终端',
			description: '基于 Web 的容器终端访问',
			icon: EditorIcon,
			href: '/products/launchpad',
		},
	];

	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='grid grid-cols-2 gap-6'>
				{features.map((feature) => (
					<Link
						href={feature.href}
						key={feature.title}
					>
						<div
							key={feature.title}
							className='group flex items-center gap-3 bg-linear-to-r from-white via-white to-white px-0 py-3 transition-colors hover:via-blue-100'
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

							<Icon
								src={FlatArrowRightIcon}
								className='text-muted-foreground group-hover:text-brand size-6 stroke-2'
							/>
						</div>
					</Link>
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
			href: '/products/database',
		},
		{
			name: 'MongoDB',
			icon: MongodbIcon,
			href: '/products/database',
		},
		{
			name: 'MySQL',
			icon: MysqlIcon,
			href: '/products/database',
		},
		{
			name: 'Redis',
			icon: RedisIcon,
			href: '/products/database',
		},
		{
			name: 'Kafka',
			icon: KafkaIcon,
			href: '/products/database',
		},
		{
			name: 'Milvus',
			icon: MilvusIcon,
			href: '/products/database',
		},
	];

	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='grid grid-cols-3 gap-2.5'>
				{databases.map((db) => (
					<Link
						href={db.href}
						key={db.name}
					>
						<div
							key={db.name}
							className='border-border group flex items-center border bg-linear-to-r from-white via-white to-white p-5 transition-colors hover:via-blue-100'
						>
							<div className='w-full'>
								<div className='flex size-8 items-center justify-center'>
									<Icon
										src={db.icon}
										className='size-8'
									/>
								</div>
								<p className='text-foreground mt-2 text-xs'>{db.name}</p>
							</div>
							<div className='size-6'>
								<Icon
									src={FramedPlusIcon}
									className='group-hover:text-brand size-full'
								/>
							</div>
						</div>
					</Link>
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
		<div className='px-8 pt-6 pb-8'>
			<div className='grid grid-cols-2 gap-6 py-3'>
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
			href: '/products/devbox',
		},
		{
			name: 'Python',
			icon: PythonIcon,
			href: '/products/devbox',
		},
		{
			name: 'Node.js',
			icon: NodejsIcon,
			href: '/products/devbox',
		},
		{
			name: 'Node.js 2',
			icon: NodejsIcon,
			href: '/products/devbox',
		},
		{
			name: 'Node.js 3',
			icon: NodejsIcon,
			href: '/products/devbox',
		},
		{
			name: 'Node.js 4',
			icon: NodejsIcon,
			href: '/products/devbox',
		},
		{
			name: 'Go',
			icon: GolangIcon,
			href: '/products/devbox',
		},
		{
			name: 'Rust',
			icon: RustIcon,
			href: '/products/devbox',
		},
		{
			name: 'C++',
			icon: null,
			href: '/products/devbox',
		},
		{
			name: 'PHP',
			icon: PhpIcon,
			href: '/products/devbox',
		},
		{
			name: 'Ruby',
			icon: null,
			href: '/products/devbox',
		},
		{
			name: '更多',
			icon: FramedPlusIcon,
			href: '/products/devbox',
		},
	];

	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='grid grid-cols-4 gap-2.5'>
				{languages.map((lang) => (
					<Link
						href={lang.href}
						key={lang.name}
					>
						<div
							key={lang.name}
							className='border-border group flex items-center border bg-linear-to-r from-white via-white to-white px-3 py-4 transition-colors hover:via-blue-100'
						>
							<div className='flex w-full items-center gap-2'>
								{lang.icon ? (
									<div className='flex size-6 items-center justify-center'>
										<Icon
											src={lang.icon}
											className={lang.name === '更多' ? 'text-brand size-6' : 'size-6'}
										/>
									</div>
								) : (
									<div className='size-6' />
								)}
								<p className='text-foreground text-xs'>{lang.name}</p>
							</div>

							<div className='size-5'>
								<Icon
									src={FramedPlusIcon}
									className='group-hover:text-brand size-full'
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

function AIProxyFeatures({ providers }: { providers: AIProxyProviderPanelData[] }) {
	const defaultProvider = providers[0]?.ownerLabel ?? '';
	const [activeProvider, setActiveProvider] = React.useState(defaultProvider);

	React.useEffect(() => {
		if (!providers.some((provider) => provider.ownerLabel === activeProvider)) {
			setActiveProvider(defaultProvider);
		}
	}, [activeProvider, defaultProvider, providers]);

	const activeItems = providers.find((provider) => provider.ownerLabel === activeProvider) ?? providers[0];

	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='flex flex-col gap-5'>
				<div className='border-border flex flex-wrap gap-1'>
					{providers.map((provider) => (
						<button
							key={provider.ownerKey}
							type='button'
							onClick={() => setActiveProvider(provider.ownerLabel)}
							className={cn(
								'hover:bg-input rounded-t-md px-3 py-2 text-xs transition-colors',
								activeProvider === provider.ownerLabel
									? 'text-foreground border-brand border-b-2'
									: 'text-muted-foreground hover:text-foreground hover:rounded-md',
							)}
						>
							{provider.ownerLabel}
						</button>
					))}
				</div>

				<div className='grid grid-cols-3 gap-2.5'>
					{activeItems?.models.map((item) => (
						<Link
							href={item.href}
							key={item.name}
						>
							<div className='border-border group flex items-center border bg-linear-to-r from-white via-white to-white px-3 py-4 transition-colors hover:via-blue-100'>
								<div className='flex w-full items-center gap-2'>
									<div className='bg-muted flex size-6 items-center justify-center overflow-hidden rounded-full'>
										<Icon
											src={getAIProxyOwnerIcon(activeItems.ownerKey)}
											className='size-4'
										/>
									</div>
									<p className='text-foreground text-xs'>{item.name}</p>
								</div>

								<div className='size-5'>
									<Icon
										src={FramedPlusIcon}
										className='group-hover:text-brand size-full'
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

function PanelAppIcon({ alt, src }: { alt: string; src?: string }) {
	const [failedSrc, setFailedSrc] = React.useState<string | null>(null);

	if (!src || failedSrc === src) {
		return (
			<div className='bg-muted flex size-6 items-center justify-center overflow-hidden rounded-md'>
				<Icon
					src={AppIcon}
					className='text-foreground size-3.5'
				/>
			</div>
		);
	}

	return (
		<div className='bg-muted flex size-6 items-center justify-center overflow-hidden rounded-md'>
			{/* biome-ignore lint/performance/noImgElement: panel app icons are remote images from content frontmatter. */}
			<img
				alt={alt}
				className='size-full object-cover'
				onError={() => setFailedSrc(src)}
				src={src}
			/>
		</div>
	);
}

function AppStoreFeatures({ categories }: { categories: AppStoreCategoryPanelData[] }) {
	const defaultCategory = categories[0]?.slug ?? '';
	const [activeCategory, setActiveCategory] = React.useState(defaultCategory);

	React.useEffect(() => {
		if (!categories.some((category) => category.slug === activeCategory)) {
			setActiveCategory(defaultCategory);
		}
	}, [activeCategory, categories, defaultCategory]);

	const activeItems = categories.find((category) => category.slug === activeCategory) ?? categories[0];

	return (
		<div className='px-8 pt-6 pb-8'>
			<div className='flex flex-col gap-5'>
				<div className='border-border flex flex-wrap gap-1'>
					{categories.map((category) => (
						<button
							key={category.slug}
							type='button'
							onClick={() => setActiveCategory(category.slug)}
							className={cn(
								'hover:bg-input rounded-t-md px-3 py-2 text-xs transition-colors',
								activeCategory === category.slug
									? 'text-foreground border-brand border-b-2'
									: 'text-muted-foreground hover:text-foreground hover:rounded-md',
							)}
						>
							{category.label}
						</button>
					))}
				</div>

				<div className='grid grid-cols-3 gap-2.5'>
					{activeItems?.apps.map((app) => (
						<Link
							href={app.href}
							key={app.href}
						>
							<div className='border-border group flex items-center border bg-linear-to-r from-white via-white to-white px-3 py-4 transition-colors hover:via-blue-100'>
								<div className='flex w-full items-center gap-2'>
									<PanelAppIcon
										alt={app.title}
										src={app.thumbnail}
									/>
									<div className='flex min-w-0 flex-col gap-0.5'>
										<p className='text-foreground truncate text-xs'>{app.title}</p>
									</div>
								</div>

								<div className='size-5'>
									<Icon
										src={FramedPlusIcon}
										className='group-hover:text-brand size-full'
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export function ProductsPanel({ aiproxyProviders, appStoreCategories }: ProductsPanelData) {
	const pathname = usePathname();
	const navMenuItems = React.useMemo(
		() => getNavMenuItems({ aiproxyProviders, appStoreCategories }),
		[aiproxyProviders, appStoreCategories],
	);

	const getMatchedItem = React.useCallback(
		(path: string | null | undefined) => {
			if (!path) return null;
			// Prefer the longest matching href prefix
			const withHref = navMenuItems.filter((i) => i.content?.href);
			const matched = withHref
				.filter((i) => path === i.content?.href || path.startsWith(`${i.content?.href}/`))
				.sort((a, b) => b.content?.href?.length ?? 0 - (a.content?.href?.length ?? 1))
				.at(0);
			return matched ?? null;
		},
		[navMenuItems],
	);

	const [selectedItem, setSelectedItem] = React.useState<NavMenuItem | null>(
		getMatchedItem(pathname) || navMenuItems.find((item) => item.content) || null,
	);

	const prevPathnameRef = React.useRef(pathname);
	React.useEffect(() => {
		if (prevPathnameRef.current === pathname) return;
		prevPathnameRef.current = pathname;
		const matched = getMatchedItem(pathname);
		if (matched) setSelectedItem(matched);
	}, [getMatchedItem, pathname]);

	return (
		<div className='border-hairline border-brand container m-2 flex w-full border-dashed p-0'>
			{/* Left Sidebar */}
			<div className='border-r-hairline border-brand flex w-64 flex-col gap-2 border-dashed px-6 py-8'>
				{navMenuItems.map((item) => {
					const href = item.content?.href;
					const isActive = !!href && (pathname === href || (pathname?.startsWith(`${href}/`) ?? false));
					const isSelected = selectedItem?.id === item.id;
					return (
						<button
							key={item.id}
							type='button'
							onClick={() => setSelectedItem(item)}
							className={cn(
								'flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors',
								isSelected
									? 'text-foreground bg-input font-medium'
									: isActive
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground hover:bg-input',
							)}
						>
							<div
								className={cn(
									'flex size-5 items-center justify-center',
									isSelected || isActive ? 'text-primary' : 'text-muted-foreground',
								)}
							>
								<Icon
									src={item.icon}
									className='size-full'
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
					<Link href={selectedItem.content.href ?? '#'}>
						{/* Header */}
						<div
							className={cn(
								'group flex items-center justify-between bg-linear-to-r from-white via-white to-white px-8 py-6 transition-colors',
								selectedItem.content.href && 'hover:via-blue-100',
							)}
						>
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
									<h3 className='text-foreground text-base font-normal'>
										{selectedItem.content.title}
									</h3>
									<p className='text-muted-foreground text-xs'>{selectedItem.content.description}</p>
								</div>
							</div>
							{selectedItem.content.href && (
								<Icon
									src={FlatArrowRightIcon}
									className='group-hover:text-brand size-6 stroke-2'
								/>
							)}
						</div>
					</Link>

					<div className='border-brand border-hairline mx-8 w-[calc(100%-4rem)] border-t border-dashed' />

					{/* Features Content */}
					{selectedItem.content.features}
				</div>
			)}
		</div>
	);
}
