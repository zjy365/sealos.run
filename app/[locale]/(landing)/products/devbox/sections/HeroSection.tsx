import Image from 'next/image';
import {
	ClaudeCodeIcon,
	EchoIcon,
	GolangIcon,
	JavaIcon,
	McpIcon,
	NextjsIcon,
	NodejsIcon,
	PythonIcon,
	SpringbootIcon,
	UbuntuIcon,
} from '@/assets/app-icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';
import { HeroBgImage } from '../assets';

export function HeroSection() {
	const languages = [
		{ name: 'Claude Code', icon: ClaudeCodeIcon },
		{ name: 'Python', icon: PythonIcon },
		{ name: 'Java', icon: JavaIcon },
		{ name: 'Go', icon: GolangIcon },
		{ name: 'Echo', icon: EchoIcon },
		{ name: 'Node.js', icon: NodejsIcon },
		{ name: 'Next.js', icon: NextjsIcon },
		{ name: 'MCP', icon: McpIcon },
		{ name: 'Spring Boot', icon: SpringbootIcon },
		{ name: 'Ubuntu', icon: UbuntuIcon },
	];

	return (
		<div className='relative flex flex-col gap-16 py-12'>
			<div className='pointer-events-none absolute -z-10 h-full w-full'>
				<Image
					alt=''
					src={HeroBgImage}
					className='overflow-visible object-cover'
					fill
				/>
			</div>

			<div className='relative flex min-h-192 flex-col gap-12 lg:flex-row'>
				{/* Text Content */}
				<div className='flex flex-1 flex-col gap-6'>
					<h1 className='text-4xl font-semibold lg:text-5xl'>
						集开发、测试、上线于一体的
						<span className='text-brand'>云开发平台</span>
					</h1>
					<div className='text-muted-foreground gap-2 text-lg'>
						「开箱即用，开发框架预装」 「云端环境，本地远程开发」 「一键构建镜像，秒级发布上线」
					</div>
					<div className='flex items-center gap-8'>
						<LandingOutlineButton
							href='#'
							size='lg'
							className='w-fit'
						>
							创建环境
						</LandingOutlineButton>
						<p className='text-muted-foreground text-sm'>
							<span>注册即领，</span>
							<span className='text-foreground'>免费使用14天</span>
						</p>
					</div>
				</div>
			</div>

			{/* Bottom: Supported Languages */}
			<div className='flex w-full flex-col items-center gap-6 md:flex-row md:gap-12'>
				<p className='text-muted-foreground w-fit text-center text-base text-nowrap'>支持所有编程语言</p>
				<div className='flex w-full flex-wrap items-center justify-center gap-6 lg:gap-8'>
					{languages.map((lang) => (
						<div
							key={lang.name}
							className='flex flex-col items-center gap-2'
						>
							<div className='flex size-12 items-center justify-center saturate-0'>
								<Icon
									src={lang.icon}
									className='size-12'
								/>
							</div>
							<p className='text-muted-foreground text-xs'>{lang.name}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
