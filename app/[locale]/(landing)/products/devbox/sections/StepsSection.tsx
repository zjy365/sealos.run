import { Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { StepCreateImage, StepDeployImage, StepDevImage, StepIdeImage } from '../assets';
import { StepItem } from '../components/StepItem';

const steps = [
	{
		number: 1,
		icon: Number01Icon,
		title: '配置开发环境',
		description: '统一的环境标准,独立的运行空间',
		tags: ['自定义云资源', '内置框架'],
		image: StepCreateImage,
		side: 'left' as const,
	},
	{
		number: 2,
		icon: Number02Icon,
		title: '开发调试',
		description: '独立测试域名,实时线上测试',
		tags: ['二级域名', '实时更新'],
		image: StepDevImage,
		side: 'left' as const,
	},
	{
		number: 3,
		icon: Number03Icon,
		title: '选择开发工具',
		description: '支持所有 IDE/IDEA 通过 SSH 连接',
		tags: ['云端存储', '代码导入'],
		image: StepIdeImage,
		side: 'right' as const,
	},
	{
		number: 4,
		icon: Number04Icon,
		title: '发布上线',
		description: '一键打包 OCL 镜像, 自动创建正式环境',
		tags: ['版本管理', '环境隔离'],
		image: StepDeployImage,
		side: 'right' as const,
	},
];

export function StepsSection() {
	const leftSteps = steps.filter((step) => step.side === 'left');
	const rightSteps = steps.filter((step) => step.side === 'right');

	return (
		<div className='flex flex-col gap-8 pl-12 lg:pl-0'>
			<div className='flex flex-col items-center gap-4'>
				<h2 className='text-center text-xl font-semibold sm:text-3xl'>
					从想法到上线,只需
					<span className='text-brand'>几分钟</span>
				</h2>
				<div className='text-muted-foreground flex items-center gap-2 text-xs sm:text-lg'>
					<span>内置环境</span>
					<span>|</span>
					<span>本地开发</span>
					<span>|</span>
					<span>线上测试</span>
					<span>|</span>
					<span>一键部署</span>
					<span>|</span>
					<span>环境隔离</span>
				</div>
				<p className='text-muted-foreground text-center text-xs sm:text-base'>零配置零维护,让你专注写代码</p>
			</div>

			<div className='flex w-full flex-col gap-8 lg:flex-row'>
				{/* Left side: two steps */}
				<div className='flex flex-1 flex-col gap-20'>
					{/* Desktop: show left steps with original variant */}
					<div className='hidden lg:flex lg:flex-col lg:gap-20'>
						{leftSteps.map((step) => (
							<StepItem
								key={step.number}
								icon={step.icon}
								title={step.title}
								description={step.description}
								tags={step.tags}
								image={step.image}
								variant={step.side}
							/>
						))}
					</div>
					{/* Mobile: show all steps with right variant and hide decoration */}
					<div className='flex flex-col gap-20 lg:hidden'>
						{leftSteps.map((step) => (
							<StepItem
								key={step.number}
								icon={step.icon}
								title={step.title}
								description={step.description}
								tags={step.tags}
								image={step.image}
								variant='right'
								hideDecoration
							/>
						))}
						{rightSteps.map((step) => (
							<StepItem
								key={step.number}
								icon={step.icon}
								title={step.title}
								description={step.description}
								tags={step.tags}
								image={step.image}
								variant='right'
								hideDecoration
							/>
						))}
					</div>
				</div>

				{/* Right side: two steps - hidden on md and below */}
				<div className='hidden flex-1 flex-col gap-20 lg:mt-64 lg:flex'>
					{rightSteps.map((step) => (
						<StepItem
							key={step.number}
							icon={step.icon}
							title={step.title}
							description={step.description}
							tags={step.tags}
							image={step.image}
							variant={step.side}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
