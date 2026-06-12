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
	href: '/products/launchpad',
	description: (
		<>
			<p>基于 Docker 镜像的应用快速交付部署</p>
		</>
	),
	features: [
		{
			icon: MonitorIcon,
			title: '自动分配域名和 HTTPS',
			description: '部署完成即可访问，默认生成二级域名并开启 HTTPS，无需额外配置证书。',
		},
		{
			icon: ScaleIcon,
			title: '高峰自动扩容，低峰自动缩容',
			description: '根据流量和资源负载自动伸缩，保障稳定访问，也避免长期空跑浪费。',
		},
		{
			icon: IsolateIcon,
			title: '应用天然隔离',
			description: '应用、工作空间和租户之间资源隔离，团队协作和多项目部署更安心。',
		},
	],
	engineFeatures: [
		{
			type: 'arrow',
			title: '用户创建',
		},
		{
			type: 'block',
			title: '镜像与运行配置',
			orientation: 'horizontal',
			items: ['Docker 地址', '端口 3000', '1 Core/1G', '环境变量'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: 'Sealos 自动编排',
			orientation: 'horizontal',
			items: ['域名分配', 'HTTPS 证书', '服务发现', '弹性伸缩'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: '公网应用运行中',
			items: [
				['Running', 'HTTPS', '3 Replicas', 'Auto Scale'],
				['Deployment', 'Service', 'Ingress', 'PVC', 'Secret', 'HPA'],
			],
		},
	],
};

export const aiproxyConfig: FeaturesConfig = {
	title: 'AI Proxy',
	href: '/products/aiproxy',
	description: (
		<>
			<p>
				<span>一个接口</span>，连接全球 200+ 顶尖 AI 模型
			</p>
		</>
	),
	features: [
		{
			icon: IntoIcon,
			title: '一个 Key 调全球模型',
			description: 'Kimi、GPT、Claude、Gemini、DeepSeek 等模型统一入口，按需切换。',
		},
		{
			icon: ApiIcon,
			title: '兼容 OpenAI 生态',
			description: '保持 OpenAI 接口规范，替换 Base URL 即可迁移现有应用、SDK 和 Agent 框架。',
		},
		{
			icon: LightningOverFrameIcon,
			title: '高可用智能网关',
			description: '自动分流、失败重试、流式转发和调用监控，保障高并发场景稳定可用。',
		},
	],
	engineFeatures: [
		{
			type: 'arrow',
			title: '用户请求',
		},
		{
			type: 'block',
			title: '一个 Key，一个 OpenAI 兼容接口',
			orientation: 'horizontal',
			items: ['OpenAI SDK', 'LangChain', 'FastGPT', 'Agent 应用'],
		},
		{
			type: 'arrow',
			direction: 'down',
		},
		{
			type: 'block',
			title: 'AI Proxy 智能网关',
			orientation: 'horizontal',
			items: [
				['统一鉴权', '智能分流', '故障切换', '流式响应'],
				['配额管理', '精细计费', '调用监控', '成本分析'],
			],
		},
		{
			type: 'arrow',
			direction: 'down',
		},
		{
			type: 'block',
			title: '全球 200+ 主流模型',
			orientation: 'horizontal',
			items: [
				['OpenAI', 'Claude', 'Gemini', 'DeepSeek'],
				['Kimi', 'Qwen', 'Glm', '更多模型'],
			],
		},
	],
};

export const devboxConfig: FeaturesConfig = {
	title: 'DevBox',
	href: '/products/devbox',
	description: (
		<>
			<p>集开发、测试、部署为一体的云开发平台</p>
		</>
	),
	features: [
		{
			icon: IsolateIcon,
			title: '本地 IDE 秒连云端环境',
			description: '用 Cursor、VS Code、JetBrains 直接连接 DevBox，代码在本地写，环境在云端跑。',
		},
		{
			icon: EditorIcon,
			title: '开发中就能公网预览',
			description: '自动分配 HTTPS 域名，服务启动后即可分享给同事、客户或测试环境验证。',
		},
		{
			icon: BoxIcon,
			title: '开发生产环境一致',
			description: '开发、测试、生产复用同一套容器化环境，减少“本地能跑、线上报错”。',
		},
	],
	engineFeatures: [
		{
			type: 'arrow',
			title: '用户开发',
		},
		{
			type: 'block',
			title: '本地 IDE / AI 编码工具',
			orientation: 'horizontal',
			items: ['VS Code', 'Cursor', 'JetBrains', 'Codex'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: 'DevBox 云端开发环境',
			items: [
				['Node.js', 'Python', 'Go', 'Java'],
				['依赖缓存', '端口转发', '环境变量', '数据库连接'],
			],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: '公网预览',
			orientation: 'horizontal',
			items: ['HTTPS', '实时预览', 'API 调试', '团队分享'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: '一键部署生产',
			orientation: 'horizontal',
			items: ['Build 镜像', '推送仓库', '容器部署', '回滚版本'],
		},
	],
};

export const ossConfig: FeaturesConfig = {
	title: '对象存储',
	href: '/products/oss',
	description: <p>完全兼容 S3 的高性能分布式对象存储</p>,
	features: [
		{
			icon: FramedPrivateIcon,
			title: '数据加密',
			description: '租户级网络隔离，支持 TLS 全链路传输加密。',
		},
		{
			icon: IntoIcon,
			title: '极致读写',
			description: '基于高性能分布式架构，提供接近裸机的 I/O 吞吐。',
		},
		{
			icon: SliderIcon,
			title: '按需弹性',
			description: '存储空间随数据增长自动伸缩，按实际用量计费。',
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
	href: '/products/database',
	description: (
		<>
			<p>MySQL、Redis、PostgreSQL 等一键托管</p>
		</>
	),
	features: [
		{
			icon: LightningOverFrameIcon,
			title: '一键创建常用数据库',
			description: 'MySQL、PostgreSQL、Redis、MongoDB、Kafka 等服务开箱即用，免安装、免配置。',
		},
		{
			icon: CheckOverFrameIcon,
			title: '备份、监控、恢复都内置',
			description: '自动备份、日志分析、监控告警和参数配置统一管理，少做重复运维。',
		},
		{
			icon: ArchitectureIcon,
			title: '高可用和扩容交给平台',
			description: '支持主备切换、资源扩容和数据迁移，业务增长时不用重搭数据库。',
		},
	],
	engineFeatures: [
		{
			type: 'arrow',
			title: '创建数据库',
		},
		{
			type: 'block',
			title: '选择数据库',
			orientation: 'horizontal',
			items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Clickhouse'],
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
