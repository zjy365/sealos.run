import {
	AiproxyBoxImage,
	AppstoreBoxImage,
	DatabaseBoxImage,
	DevboxBoxImage,
	LaunchpadBoxImage,
	OssBoxImage,
} from '@/assets/app-boxes';
import {
	ClaudeCodeIcon,
	CppIcon,
	DotnetIcon,
	JavaIcon,
	KafkaIcon,
	MilvusIcon,
	MongodbIcon,
	MysqlIcon,
	NextjsIcon,
	NodejsIcon,
	OpenclawIcon,
	PostgresIcon,
	PythonIcon,
	RedisIcon,
	SpringbootIcon,
	UbuntuIcon,
	VueIcon,
} from '@/assets/app-icons';
import {
	BoxIcon,
	ClockCounterIcon,
	CubeIcon,
	CubesIcon,
	DatabaseIcon,
	EditorIcon,
	FramedPlusIcon,
	FramedPrivateIcon,
	FramedReadIcon,
	FramedWriteIcon,
	GlobalIcon,
	ModelIcon,
	ObjectStorageIcon,
	RocketIcon,
} from '@/assets/icons';
import type {
	NavMenuItem,
	ProductIconFeatureItem,
	ProductLinkFeatureItem,
	StorageFeatureItem,
} from './products-panel.types';

export const NAV_MENU_ITEMS_BASE: NavMenuItem[] = [
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
		},
	},
];

export const LAUNCHPAD_FEATURES: ProductLinkFeatureItem[] = [
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

export const DATABASE_FEATURES: ProductIconFeatureItem[] = [
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

export const OSS_STORAGE_TYPES: StorageFeatureItem[] = [
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

export const DEVBOX_TEMPLATES: ProductIconFeatureItem[] = [
	{
		name: 'Claude Code',
		icon: ClaudeCodeIcon,
		href: '/products/devbox',
	},
	{
		name: 'Node.js',
		icon: NodejsIcon,
		href: '/products/devbox',
	},
	{
		name: 'Spring Boot',
		icon: SpringbootIcon,
		href: '/products/devbox',
	},
	{
		name: 'Python',
		icon: PythonIcon,
		href: '/products/devbox',
	},
	{
		name: 'Vue.js',
		icon: VueIcon,
		href: '/products/devbox',
	},
	{
		name: 'Ubuntu',
		icon: UbuntuIcon,
		href: '/products/devbox',
	},
	{
		name: '.NET',
		icon: DotnetIcon,
		href: '/products/devbox',
	},
	{
		name: 'C++',
		icon: CppIcon,
		href: '/products/devbox',
	},
	{
		name: 'Next.js',
		icon: NextjsIcon,
		href: '/products/devbox',
	},
	{
		name: 'Java',
		icon: JavaIcon,
		href: '/products/devbox',
	},
	{
		name: 'OpenClaw',
		icon: OpenclawIcon,
		href: '/products/devbox',
	},
	{
		name: '更多',
		icon: FramedPlusIcon,
		href: '/products/devbox',
	},
];
