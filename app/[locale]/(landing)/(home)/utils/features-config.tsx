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
import { Icon } from '@/libs/components/ui/icon';
import type { FeaturesConfig } from './features-config.types';

export const launchpadConfig: FeaturesConfig = {
	title: '应用管理',
	description: (
		<>
			<p>基于 Kubernetes 的可视化服务，</p>
			<p>支持所有 Docker 镜像的一键部署能力</p>
		</>
	),
	features: [
		{
			icon: (
				<Icon
					src={MonitorIcon}
					className='text-brand size-4'
				/>
			),
			title: '公网测试',
			description: '系统分配二级域名，支持HTTPS访问',
		},
		{
			icon: (
				<Icon
					src={ScaleIcon}
					className='text-brand size-4'
				/>
			),
			title: '弹性伸缩',
			description: '高峰自动扩容，低峰期自动释放资源',
		},
		{
			icon: (
				<Icon
					src={IsolateIcon}
					className='text-brand size-4'
				/>
			),
			title: '资源隔离',
			description: '应用和租户级网络隔离能力',
		},
	],
	engineFeatures: [
		{
			type: 'arrow',
			title: '用户请求',
		},
		{
			type: 'block',
			title: '编排引擎',
			items: ['用户界面', 'YAML 编辑', '模板部署', '批量管理'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: '编排引擎',
			items: ['配置解析', '资源计算', '生命周期管理', '弹性伸缩'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: 'Kubernetes 集群',
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
				<span>全球 </span>
				<span className='text-brand'>200+ </span>模型集成，涵盖
			</p>
			<p>语言、语音、图片和视频等多模态场景。</p>
		</>
	),
	features: [
		{
			icon: (
				<Icon
					src={IntoIcon}
					className='text-brand size-4'
				/>
			),
			title: '一键接入',
			description: '一个 API Key 调用所有模型',
		},
		{
			icon: (
				<Icon
					src={ApiIcon}
					className='text-brand size-4'
				/>
			),
			title: '统一接口',
			description: '标准化的 API 接口，兼容 Open AI 格式',
		},
		{
			icon: (
				<Icon
					src={LightningOverFrameIcon}
					className='text-brand size-4'
				/>
			),
			title: '高性能',
			description: '分布式架构，支持横向扩展，智能缓存机制，响应速度提升 50%',
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
					items: [['公共 MCP 服务器'], ['MCP 配置管理'], ['OpenAPI 转 MCP']],
				},
				{
					type: 'arrow',
					direction: 'left',
				},
				{
					type: 'block',
					title: '网关层',
					orientation: 'vertical',
					items: ['AI Proxy 网关', { type: 'arrow', direction: 'down' }, '超时/重试'],
				},
				{
					type: 'arrow',
					direction: 'right',
				},
				{
					type: 'block',
					title: '配额监控',
					items: [['计费系统'], ['监控与分析'], ['配额管理']],
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
				'思考模式插件',
				{ type: 'arrow', direction: 'right' },
				'流式伪装插件',
			],
		},
		{
			type: 'arrow',
			direction: 'down',
		},
		{
			type: 'block',
			title: 'AI 提供商',
			items: ['OpenAI', 'Anthropic/Claude', 'Azure OpenAI', '其他提供商'],
		},
	],
};

export const devboxConfig: FeaturesConfig = {
	title: 'DevBox',
	description: (
		<>
			<p>集开发、测试、上线于一体的</p>
			<p>
				<span className='text-brand'>云开发</span>平台
			</p>
		</>
	),
	features: [
		{
			icon: (
				<Icon
					src={EditorIcon}
					className='text-brand size-4'
				/>
			),
			title: '公网测试',
			description: '系统分配二级域名，支持HTTPS访问',
		},
		{
			icon: (
				<Icon
					src={BoxIcon}
					className='text-brand size-4'
				/>
			),
			title: '容器化上线',
			description: '集成 Docker 技术，一键打包镜像，自动化容器编排发布',
		},
		{
			icon: (
				<Icon
					src={IsolateIcon}
					className='text-brand size-4'
				/>
			),
			title: '环境隔离',
			description: '提供与线上完全一致的测试环境',
		},
	],
	engineFeatures: [
		{
			type: 'block',
			title: '用户',
			items: ['Web 页面', 'IDE 远程开发', 'API 调用', 'MCP 扩展'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: 'DevBox 控制器',
			items: [
				['创建/删除', '实例状态', '代码更新', '版本控制'],
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
				['API 服务器', '容器接口', '镜像仓库'],
				['容器运行中', '对象存储'],
			],
		},
	],
};

export const ossConfig: FeaturesConfig = {
	title: '对象存储',
	description: <p>分布式架构存储，S3 接口连接，支持故障自愈</p>,
	features: [
		{
			icon: (
				<Icon
					src={FramedPrivateIcon}
					className='text-brand size-4'
				/>
			),
			title: '数据加密',
			description: '基于 K8S 存储/网络隔离，TLS加密传输',
		},
		{
			icon: (
				<Icon
					src={IntoIcon}
					className='text-brand size-4'
				/>
			),
			title: '平滑接入',
			description: '近乎裸机的速度体验，提供各语言 SDK',
		},
		{
			icon: (
				<Icon
					src={SliderIcon}
					className='text-brand size-4'
				/>
			),
			title: '弹性扩展',
			description: '按使用量计费，存储容量按需无限扩展',
		},
	],
	engineFeatures: [
		{
			type: 'arrow',
			title: '用户请求',
		},
		{
			type: 'block',
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
			<p>全面兼容所有数据库生态，</p>
			<p>
				<span className='text-black'>Chat2DB</span>
				{` 驱动的 `}
				<span className='text-brand'>AI 数据管理</span>平台
			</p>
		</>
	),
	features: [
		{
			icon: (
				<Icon
					src={LightningOverFrameIcon}
					className='text-brand size-4'
				/>
			),
			title: '高性能',
			description: '分布式存储，支持快速扩展与无缝迁移',
		},
		{
			icon: (
				<Icon
					src={CheckOverFrameIcon}
					className='text-brand size-4'
				/>
			),
			title: '高可用',
			description: '内置监控告警，主备双机，故障无感自动切换',
		},
		{
			icon: (
				<Icon
					src={ArchitectureIcon}
					className='text-brand size-4'
				/>
			),
			title: '高并发',
			description: '30% 的成本，提供超百万级 QPS 的高吞吐',
		},
	],
	engineFeatures: [
		{
			type: 'block',
			title: '用户接入层',
			itemsPerRow: 5,
			items: ['Web 控制台', 'Chat2DB', 'CLI 工具', '外网访问', 'API 调用'],
		},
		{
			type: 'arrow',
		},
		{
			type: 'block',
			title: '服务管理层',
			itemsPerRow: 5,
			items: ['日志分析', '数据导入/导出', '监控告警', '备份恢复', '参数配置'],
		},
		{
			type: 'arrow',
			title: 'KubeBlocks 控制器',
		},
		{
			type: 'block',
			title: '数据库实例层',
			itemsPerRow: 5,
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
			itemsPerRow: 5,
			items: [
				['计算资源', '存储资源', '网络组件', '监控组件'],
				['CPU/内存', 'Minio/SSD', 'Minio/负载均衡', 'Prometheus/Grafana'],
			],
		},
	],
};
