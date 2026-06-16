import { AppLaunchpadIcon, CpuIcon, CubesIcon, DatabaseStackedIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';

const scenarios = [
	{
		title: '容器化改造',
		description: '将原有以虚拟机为中心的资源使用方式，升级为统一的容器化应用平台，提升资源利用率和交付效率。',
		icon: CubesIcon,
	},
	{
		title: '应用组件统一管理',
		description: '在同一平台上管理业务应用、数据库、对象存储、镜像仓库、日志、监控和告警，减少多套系统割裂。',
		icon: DatabaseStackedIcon,
	},
	{
		title: '信创与国产化适配',
		description: '适配 C86、ARM 等计算架构，以及麒麟 V10、统信 UOS、CentOS 7+、Ubuntu 20.04+ 等系统环境。',
		icon: CpuIcon,
	},
	{
		title: '标准化交付',
		description: '统一 X86、C86、ARM 等不同环境的部署模板、组件供给和运维入口，支撑批量交付与快速复制。',
		icon: AppLaunchpadIcon,
	},
];

export function ScenarioSection() {
	return (
		<div className='grid w-full gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start'>
			<div className='flex flex-col gap-4'>
				<h2 className='text-3xl font-semibold'>
					适用于企业
					<span className='text-brand'>基础设施改造</span>
				</h2>
				<p className='text-muted-foreground text-base leading-7'>
					从虚拟机资源池到容器化平台，统一承载应用、中间件、数据库和运维组件，帮助企业完成云原生与信创国产化升级。
				</p>
			</div>

			<div className='grid border-t border-l border-zinc-200 sm:grid-cols-2'>
				{scenarios.map((scenario) => (
					<div
						key={scenario.title}
						className='flex min-h-40 flex-col gap-4 border-r border-b border-zinc-200 p-5'
					>
						<div className='flex items-center gap-3'>
							<div className='border-brand/30 flex size-9 items-center justify-center border'>
								<Icon
									src={scenario.icon}
									className='text-brand size-5'
								/>
							</div>
							<h3 className='text-base font-medium'>{scenario.title}</h3>
						</div>
						<p className='text-muted-foreground text-sm leading-6'>{scenario.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}
