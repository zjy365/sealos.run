import {
	ApiIcon,
	ArchitectureIcon,
	BoxIcon,
	CheckOverFrameIcon,
	EditorIcon,
	FramedPrivateIcon,
	IntoIcon,
	IsolateIcon,
	LightningOverFrameIcon,
	MonitorIcon,
	ScaleIcon,
	SliderIcon,
} from '@/assets/icons';
import type { FeaturesConfig } from './features.types';

export const launchpadConfig: FeaturesConfig = {
	title: '应用管理',
	description: (
		<>
			<p>支持所有 Docker 镜像一键容器化部署</p>
		</>
	),
	features: [
		{
			icon: MonitorIcon,
			title: '域名分配',
			description: '自动分配二级域名，默认开启 HTTPS',
		},
		{
			icon: ScaleIcon,
			title: '智能伸缩',
			description: '秒级扩容保障稳定，自动缩容极致降本',
		},
		{
			icon: IsolateIcon,
			title: '安全隔离',
			description: '应用、空间、租户的数据强隔离机制',
		},
	],
	engineFeatures: [
		{
			type: 'arrow',
			title: '用户创建',
		},
		{
			type: 'block',
			title: '交互与接入层',
			orientation: 'horizontal',
			items: ['Docker 地址', '资源配置', '网络配置', '高级参数'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: '调度控制器',
			orientation: 'horizontal',
			items: ['配置解析', '资源计算', '多副本启停', '弹性伸缩'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: 'Kubernetes 资源',
			items: [
				['Deployment', 'Ingress', 'Service', 'PVC'],
				['Configmap', 'Secret', 'HPA'],
			],
		},
	],
};

export const aiproxyConfig: FeaturesConfig = {
	title: 'AI Proxy',
	description: (
		<>
			<p>
				<span>一个接口 </span>
				，连接全球 200+ 顶尖 AI 模型
			</p>
		</>
	),
	features: [
		{
			icon: IntoIcon,
			title: '统一鉴权',
			description: '一个 API Key，即可按需调用全球任意主流模型。',
		},
		{
			icon: ApiIcon,
			title: 'OpenAI',
			description: '标准 OpenAI 接口规范，替换地址即可无缝迁移',
		},
		{
			icon: LightningOverFrameIcon,
			title: '高并发网关',
			description: '分布式架构，支持智能路由与高频缓存',
		},
	],
	engineFeatures: [
		{
			type: 'arrow',
			title: '用户请求',
		},
		{
			type: 'row',
			items: [
				{
					type: 'block',
					title: 'MCP 生态',
					items: ['MCP 服务市场', 'MCP 配置管理', 'OpenAPI 协议转换'],
				},
				{
					type: 'arrow',
					direction: 'left',
				},
				{
					type: 'block',
					title: '网关层',
					orientation: 'vertical',
					items: ['高性能路由网关', { type: 'arrow', direction: 'down' }, '智能重试与熔断'],
				},
				{
					type: 'arrow',
					direction: 'right',
				},
				{
					type: 'block',
					title: '配额监控',
					items: ['精细化计费', '全链路监控', '配额管理'],
				},
			],
		},
		{
			type: 'arrow',
			direction: 'down',
		},
		{
			type: 'block',
			title: '插件系统',
			orientation: 'horizontal',
			items: [
				'缓存插件',
				{ type: 'arrow', direction: 'right' },
				'联网搜索插件',
				{ type: 'arrow', direction: 'right' },
				'深度思考 (Deep Think)',
				{ type: 'arrow', direction: 'right' },
				'流式输出优化',
			],
		},
		{
			type: 'arrow',
			direction: 'down',
		},
		{
			type: 'block',
			title: 'AI 提供商',
			orientation: 'horizontal',
			items: ['OpenAI', 'Anthropic/Claude', 'Azure OpenAI', '其他提供商'],
		},
	],
};

export const devboxConfig: FeaturesConfig = {
	title: 'DevBox',
	description: (
		<>
			<p>开发、测试、上线，一站式云端闭环</p>
		</>
	),
	features: [
		{
			icon: IsolateIcon,
			title: '本地开发',
			description: '本地IDE/IDEA一键连接，随时随地远程开发',
		},
		{
			icon: EditorIcon,
			title: '公网预览',
			description: '自动分配 HTTPS 二级域名，服务一键暴露公网',
		},
		{
			icon: BoxIcon,
			title: '容器化上线',
			description: '基于 Docker 标准自动构建镜像，一键发布至生产环境',
		},
		{
			icon: IsolateIcon,
			title: '环境一致',
			description: '开发环境与生产环境严格同构，消除环境差异',
		},
	],
	engineFeatures: [
		{
			type: 'block',
			title: '用户层',
			orientation: 'horizontal',
			items: ['Web 控制台', 'Cloud IDE', 'API 调用', 'MCP 扩展'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: 'DevBox 控制器',
			items: [
				['生命周期管理', '实例状态', '代码更新', '版本控制'],
				['网络入口', '数据库配置'],
			],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: 'Kubernetes',
			items: [
				[
					'API 服务器',
					'容器接口',
					{ type: 'arrow', direction: 'right' },
					'镜像仓库',
					{ type: 'arrow', direction: 'right' },
					'持久化存储',
				],
				[
					{
						type: 'arrow',
						direction: 'down',
					},
				],
				['容器运行时'],
			],
		},
	],
};

export const ossConfig: FeaturesConfig = {
	title: '对象存储',
	description: <p>完全兼容 S3 的高性能分布式对象存储</p>,
	features: [
		{
			icon: FramedPrivateIcon,
			title: '数据加密',
			description: '租户级网络隔离，支持 TLS 全链路传输加密',
		},
		{
			icon: IntoIcon,
			title: '极致读写',
			description: '基于高性能分布式架构，提供接近裸机的 I/O 吞吐',
		},
		{
			icon: SliderIcon,
			title: '按需弹性',
			description: '存储空间随数据增长自动伸缩，按实际用量计费',
		},
	],
	engineFeatures: [
		{
			type: 'arrow',
			title: '用户请求',
		},
		{
			type: 'block',
			orientation: 'horizontal',
			items: ['可视化', '密钥管理', '配额管理', '监控指标'],
		},
		{
			type: 'row',
			items: [
				{
					type: 'block',
					border: false,
					items: [
						{
							type: 'arrow',
						},
					],
				},
				{
					type: 'arrow',
					direction: 'right',
					visible: false,
				},
				{
					type: 'block',
					border: false,
					items: [
						{
							type: 'arrow',
						},
					],
				},
			],
		},
		{
			type: 'row',
			items: [
				{
					type: 'block',
					title: '控制器',
					items: [
						['自动化管理', '多副本'],
						['滚动更新', '声明式 API'],
					],
				},
				{
					type: 'arrow',
					direction: 'right',
				},
				{
					type: 'block',
					title: 'MinIO',
					items: [
						['分布式架构', '高性能'],
						['监控指标', '兼容 S3 接口'],
					],
				},
			],
		},
	],
};

export const databaseConfig: FeaturesConfig = {
	title: '数据库',
	description: (
		<>
			<p>全面兼容Mysql、Redis等所有数据库生态</p>
		</>
	),
	features: [
		{
			icon: LightningOverFrameIcon,
			title: '高性能',
			description: '分布式存储，支持快速扩展与无缝迁移',
		},
		{
			icon: CheckOverFrameIcon,
			title: '高可用',
			description: '内置监控告警，主备双机，故障无感自动切换',
		},
		{
			icon: ArchitectureIcon,
			title: '高并发',
			description: '30% 的成本，提供超百万级 QPS 的高吞吐',
		},
	],
	engineFeatures: [
		{
			type: 'block',
			title: '用户接入层',
			orientation: 'horizontal',
			items: ['可视化控制台', 'AI 智能客户端 (Chat2DB) ', 'CLI 工具', '外网访问', 'API 调用'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: '服务管理层',
			orientation: 'horizontal',
			items: ['日志分析', '数据迁移/同步', '可观测性平台', '备份恢复', '参数配置'],
		},
		{
			type: 'arrow',
			title: 'KubeBlocks 控制器',
		},
		{
			type: 'block',
			title: '数据库实例层',
			items: [
				['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Clickhouse'],
				['Milvus', 'Weaviate', 'RabbitMQ', 'Elasticsearch', 'Kafka'],
			],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: '基础设施层',
			items: [
				['计算资源', '存储资源', '网络组件', '监控组件'],
				['CPU/内存', '高性能持久化存储', 'Minio/负载均衡', 'Prometheus/Grafana'],
			],
		},
	],
};
