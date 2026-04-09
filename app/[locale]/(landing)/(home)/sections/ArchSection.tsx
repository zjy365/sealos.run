import {
	ArchAccountingBoxImage,
	ArchAccountingIcon,
	ArchAiproxyBoxImage,
	ArchAiproxyIcon,
	ArchBrainBoxImage,
	ArchBrainIcon,
	ArchChatgptBoxImage,
	ArchChatgptIcon,
	ArchDatabaseBoxImage,
	ArchDatabaseIcon,
	ArchDevboxBoxImage,
	ArchDevboxIcon,
	ArchFastgptBoxImage,
	ArchFastgptIcon,
	ArchGrafanaBoxImage,
	ArchGrafanaIcon,
	ArchKiteBoxImage,
	ArchKiteIcon,
	ArchLaunchpadBoxImage,
	ArchLaunchpadIcon,
	ArchLogsBoxImage,
	ArchLogsIcon,
	ArchMonitoringBoxImage,
	ArchMonitoringIcon,
	ArchNacosBoxImage,
	ArchNacosIcon,
	ArchNewapiBoxImage,
	ArchNewapiIcon,
	ArchOpenclawBoxImage,
	ArchOpenclawIcon,
	ArchSealosBoxImage,
	ArchSealosIcon,
	ArchSupabaseBoxImage,
	ArchSupabaseIcon,
	ArchTenantsBoxImage,
	ArchTenantsIcon,
} from '../assets';
import type { ArchSceneBoxes } from '../components/ArchScene/ArchScene';
import { ArchSceneRow } from '../components/ArchScene/ArchSceneRow';

const archImages = [
	{
		tag: '运维层',
		alt: '运维层架构图',
		variant: 'left',
		boxes: {
			t: {
				label: '智能运维',
				image: ArchBrainBoxImage,
				icon: ArchBrainIcon,
				desc: ['交互式对话工作', '低门槛自动构建部署服务', '智能补全代码所需的依赖关系'],
			},
			l: {
				label: 'Grafana',
				image: ArchGrafanaBoxImage,
				icon: ArchGrafanaIcon,
				desc: ['统一监控集群状态', '观察资源与应用指标', '快速定位异常波动'],
			},
			b: {
				label: 'Kite',
				image: ArchKiteBoxImage,
				icon: ArchKiteIcon,
				desc: ['自动收敛告警流程', '关联任务与执行链路', '减少重复运维操作'],
			},
		} satisfies ArchSceneBoxes,
	},
	{
		tag: '应用商店',
		alt: '应用商店架构图',
		variant: 'right',
		boxes: {
			t: {
				label: 'New API',
				image: ArchNewapiBoxImage,
				icon: ArchNewapiIcon,
				desc: ['统一模型 API 出口', '做鉴权与限流治理', '简化上层服务接入'],
			},
			l: {
				label: 'OpenClaw',
				image: ArchOpenclawBoxImage,
				icon: ArchOpenclawIcon,
				desc: ['提供开源模型编排能力', '扩展企业内部工具链', '支持私有化部署'],
			},
			c: {
				label: 'Supabase',
				image: ArchSupabaseBoxImage,
				icon: ArchSupabaseIcon,
				desc: ['提供即开即用后端能力', '加速业务原型验证', '让团队专注产品迭代'],
			},
			r: {
				label: 'Nacos',
				image: ArchNacosBoxImage,
				icon: ArchNacosIcon,
				desc: ['管理服务注册发现', '统一配置下发与变更', '提升应用治理效率'],
			},
			b: {
				label: 'ChatGPT',
				image: ArchChatgptBoxImage,
				icon: ArchChatgptIcon,
				desc: ['接入通用对话能力', '支持多场景智能问答', '增强内容生成效率'],
			},
		} satisfies ArchSceneBoxes,
	},
	{
		tag: '应用层',
		alt: '应用层架构图',
		variant: 'left',
		boxes: {
			t: {
				label: 'Launchpad',
				image: ArchLaunchpadBoxImage,
				icon: ArchLaunchpadIcon,
				desc: ['统一管理 AI 应用入口', '快速发布内部智能体', '降低团队分发成本'],
			},
			l: {
				label: 'DevBox',
				image: ArchDevboxBoxImage,
				icon: ArchDevboxIcon,
				desc: ['支持多语言开发环境', '集成智能编码助手', '自动构建镜像并管理版本'],
			},
			c: {
				label: 'FastGPT',
				image: ArchFastgptBoxImage,
				icon: ArchFastgptIcon,
				desc: ['快速搭建工作流', '沉淀企业知识库', '组合多模型能力'],
			},
			r: {
				label: 'Database',
				image: ArchDatabaseBoxImage,
				icon: ArchDatabaseIcon,
				desc: ['托管常用数据库服务', '统一备份与恢复策略', '降低数据维护门槛'],
			},
			b: {
				label: 'AI Proxy',
				image: ArchAiproxyBoxImage,
				icon: ArchAiproxyIcon,
				desc: ['统一代理模型访问', '屏蔽底层差异配置', '提供稳定接入体验'],
			},
		} satisfies ArchSceneBoxes,
	},
	{
		tag: '云底座',
		alt: '云底座架构图',
		variant: 'right',
		boxes: {
			t: {
				label: 'Accounting',
				image: ArchAccountingBoxImage,
				icon: ArchAccountingIcon,
				desc: ['统一统计资源账单', '追踪成本变化趋势', '支持精细化运营'],
			},
			l: {
				label: 'Logs',
				image: ArchLogsBoxImage,
				icon: ArchLogsIcon,
				desc: ['集中采集运行日志', '支持全文检索追踪', '缩短故障排查路径'],
			},
			c: {
				label: 'Sealos',
				image: ArchSealosBoxImage,
				icon: ArchSealosIcon,
				desc: ['作为应用运行底座', '统一租户与资源调度', '承接云原生工作负载'],
			},
			r: {
				label: 'Tenants',
				image: ArchTenantsBoxImage,
				icon: ArchTenantsIcon,
				desc: ['多租户隔离资源', '细化权限与配额分配', '保障团队独立运行'],
			},
			b: {
				label: 'Monitoring',
				image: ArchMonitoringBoxImage,
				icon: ArchMonitoringIcon,
				desc: ['建立平台监控基线', '采集关键运行信号', '支撑稳定性建设'],
			},
		} satisfies ArchSceneBoxes,
	},
] as const;

export function ArchSection() {
	return (
		<div className='flex w-full flex-col items-start gap-14'>
			<div>
				<h2 className='text-xl font-semibold sm:text-3xl'>
					<span>系统架构</span>
				</h2>
				<p className='text-muted-foreground mt-4 text-xs sm:text-base'>
					从内核到应用，构建 AI 时代的新一代云基础设施。
				</p>
			</div>

			<div className='mx-auto flex w-full max-w-7xl flex-col gap-20'>
				{archImages.map((item) => (
					<ArchSceneRow
						key={item.alt}
						item={item}
					/>
				))}
			</div>
		</div>
	);
}
