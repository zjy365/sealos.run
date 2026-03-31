import { AlibabaCloudIcon, GoogleCloudIcon, TencentCloudIcon, VolcanoEngineIcon } from '@/assets/app-icons';

export const GiB_BYTES = 1024 ** 3;

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

export const appTypes = [{ id: 'web', label: 'Web 应用' }] as const;
export type AppTypeId = (typeof appTypes)[number]['id'];

export const calculatorDefaults = {
	regionId: 'hzh' satisfies RegionId as RegionId,
	appTypeId: 'web' satisfies AppTypeId as AppTypeId,
	cpuCores: 8,
	memoryBytes: 8 * GiB_BYTES,
	storageBytes: 1 * GiB_BYTES,
	ports: 1,
	runtimeHoursPerDay: 1,
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
