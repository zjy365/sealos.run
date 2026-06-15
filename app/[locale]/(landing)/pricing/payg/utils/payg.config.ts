import { AlibabaCloudIcon, GoogleCloudIcon, TencentCloudIcon, VolcanoEngineIcon } from '@/assets/app-icons';

export const GiB_BYTES = 1024 ** 3;
export const MiB_BYTES = 1024 ** 2;

export type RegionId = 'hzh' | 'bja' | 'gzg' | 'sgp';

export interface RegionOption {
	id: RegionId;
	label: string;
	vendor: string;
	vendorIcon: typeof AlibabaCloudIcon;
}

export const regions: RegionOption[] = [
	{
		id: 'hzh',
		label: '杭州可用区',
		vendor: '阿里云',
		vendorIcon: AlibabaCloudIcon,
	},
	{
		id: 'bja',
		label: '北京可用区',
		vendor: '火山引擎',
		vendorIcon: VolcanoEngineIcon,
	},
	{
		id: 'gzg',
		label: '广东可用区',
		vendor: '腾讯云',
		vendorIcon: TencentCloudIcon,
	},
	{
		id: 'sgp',
		label: '新加坡可用区',
		vendor: '谷歌云',
		vendorIcon: GoogleCloudIcon,
	},
];

export interface UnitPrices {
	/** ¥ per core-hour */
	cpuCoreHour: number;
	/** ¥ per GiB-hour */
	memoryGiBHour: number;
	/** ¥ per GiB-hour */
	storageGiBHour: number;
	/** ¥ per port-hour */
	portHour: number;
	/** ¥ per GiB traffic */
	networkGiB: number;
}

export const unitPricesByRegion: Record<RegionId, UnitPrices> = {
	hzh: {
		cpuCoreHour: 0.027671,
		memoryGiBHour: 0.013956,
		storageGiBHour: 0.000846,
		portHour: 0.0139,
		networkGiB: 0.000781,
	},
	bja: {
		cpuCoreHour: 0.017125,
		memoryGiBHour: 0.008637,
		storageGiBHour: 0.000523,
		portHour: 0.007,
		networkGiB: 0.000781,
	},
	gzg: {
		cpuCoreHour: 0.01742,
		memoryGiBHour: 0.008786,
		storageGiBHour: 0.000532,
		portHour: 0.007,
		networkGiB: 0.000781,
	},
	sgp: {
		cpuCoreHour: 0.067,
		memoryGiBHour: 0.033792,
		storageGiBHour: 0.002048,
		portHour: 0.0139,
		networkGiB: 0.000781,
	},
};

export type RuntimeUnit = 'hour' | 'day' | 'week' | 'month' | 'year';

export const cpuCoreOptions = [0.5, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export const memoryOptions = [
	{ bytes: 512 * MiB_BYTES, label: '512Mi' },
	{ bytes: 1 * GiB_BYTES, label: '1G' },
	{ bytes: 2 * GiB_BYTES, label: '2G' },
	{ bytes: 4 * GiB_BYTES, label: '4G' },
	{ bytes: 6 * GiB_BYTES, label: '6G' },
	{ bytes: 8 * GiB_BYTES, label: '8G' },
	{ bytes: 12 * GiB_BYTES, label: '12G' },
	{ bytes: 16 * GiB_BYTES, label: '16G' },
	{ bytes: 32 * GiB_BYTES, label: '32G' },
] as const;

export interface AppTypePreset {
	id: string;
	label: string;
	description: string;
	cpuCores: number;
	memoryBytes: number;
	storageBytes: number;
	ports: number;
	runtimeUnit: RuntimeUnit;
	runtimeValue: number;
}

export const appTypes = [
	{
		id: 'light-cloud-server',
		label: '轻量云服务器',
		description: '适合个人站点、测试环境和轻量服务，使用 0.5 核配置进一步压低起步成本。',
		cpuCores: 0.5,
		memoryBytes: 1 * GiB_BYTES,
		storageBytes: 5 * GiB_BYTES,
		ports: 1,
		runtimeUnit: 'month',
		runtimeValue: 1,
	},
	{
		id: 'landing-page',
		label: '营销官网 / 落地页',
		description: '适合企业官网、活动页和产品展示站点，资源需求轻、适合长期在线。',
		cpuCores: 1,
		memoryBytes: 1 * GiB_BYTES,
		storageBytes: 5 * GiB_BYTES,
		ports: 1,
		runtimeUnit: 'month',
		runtimeValue: 1,
	},
	{
		id: 'blog-cms',
		label: '博客 / 内容管理',
		description: '适合博客、文档站和轻量 CMS，需要更多存储空间承载内容与媒体文件。',
		cpuCores: 2,
		memoryBytes: 2 * GiB_BYTES,
		storageBytes: 20 * GiB_BYTES,
		ports: 1,
		runtimeUnit: 'month',
		runtimeValue: 1,
	},
	{
		id: 'saas-web',
		label: 'SaaS Web 应用',
		description: '适合后台管理、用户中心和标准业务系统，兼顾并发访问与稳定运行。',
		cpuCores: 2,
		memoryBytes: 4 * GiB_BYTES,
		storageBytes: 30 * GiB_BYTES,
		ports: 1,
		runtimeUnit: 'month',
		runtimeValue: 1,
	},
	{
		id: 'workflow-automation',
		label: '工作流自动化',
		description: '适合 n8n、Webhook 和定时任务等自动化服务，内存和存储需求相对均衡。',
		cpuCores: 2,
		memoryBytes: 4 * GiB_BYTES,
		storageBytes: 20 * GiB_BYTES,
		ports: 1,
		runtimeUnit: 'month',
		runtimeValue: 1,
	},
	{
		id: 'ai-assistant',
		label: 'AI 助手 / 知识库',
		description: '适合 AI 对话、知识检索和多 Agent 服务，需要更高的计算与缓存空间。',
		cpuCores: 4,
		memoryBytes: 8 * GiB_BYTES,
		storageBytes: 50 * GiB_BYTES,
		ports: 1,
		runtimeUnit: 'month',
		runtimeValue: 1,
	},
	{
		id: 'database',
		label: '数据库服务',
		description: '适合 MySQL、PostgreSQL 等持久化数据服务，重点保障内存和磁盘容量。',
		cpuCores: 4,
		memoryBytes: 16 * GiB_BYTES,
		storageBytes: 200 * GiB_BYTES,
		ports: 1,
		runtimeUnit: 'month',
		runtimeValue: 1,
	},
] as const satisfies readonly AppTypePreset[];

export type AppTypeId = (typeof appTypes)[number]['id'];

const defaultAppType = appTypes.find((appType) => appType.id === 'saas-web') ?? appTypes[0];

export const calculatorDefaults = {
	regionId: 'hzh' satisfies RegionId as RegionId,
	appTypeId: defaultAppType.id satisfies AppTypeId as AppTypeId,
	cpuCores: defaultAppType.cpuCores,
	memoryBytes: defaultAppType.memoryBytes,
	storageBytes: defaultAppType.storageBytes,
	ports: defaultAppType.ports,
	runtimeUnit: defaultAppType.runtimeUnit,
	runtimeValue: defaultAppType.runtimeValue,
};

export const newUserCredit = {
	creditCny: 100,
	validDays: 65,
};

export const unitPriceTable = [
	{
		key: 'cpu',
		name: 'CPU',
		unit: '核/小时',
		get: (p: UnitPrices) => p.cpuCoreHour,
	},
	{
		key: 'memory',
		name: '内存',
		unit: 'GiB/小时',
		get: (p: UnitPrices) => p.memoryGiBHour,
	},
	{
		key: 'storage',
		name: '存储卷',
		unit: 'GiB/小时',
		get: (p: UnitPrices) => p.storageGiBHour,
	},
	{
		key: 'port',
		name: '端口',
		unit: '个/小时',
		get: (p: UnitPrices) => p.portHour,
	},
	{
		key: 'network',
		name: '网络',
		unit: 'M',
		get: (p: UnitPrices) => p.networkGiB,
	},
] as const;
