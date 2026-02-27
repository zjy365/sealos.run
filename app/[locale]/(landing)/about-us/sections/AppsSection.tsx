import React from 'react';
import { cn } from '@/libs/utils/styling';

const PLACEHOLDER_HEX_KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] as const;

const APPS_CONTENT = {
	title: {
		prefix: '丰富的',
		highlight: '应用池',
	},
	subtitle: 'Sealos 强大的生态体系和多样化的服务支持，助您无忧上云',
	orbitItems: [
		{ key: 'devbox', label: 'DevBox', position: { x: '50%', y: '8%' } },
		{ key: 'app', label: '应用管理', position: { x: '12%', y: '42%' } },
		{ key: 'jotlin', label: 'Jotlin', position: { x: '84%', y: '42%' } },
		{ key: 'database', label: '数据库', position: { x: '28%', y: '78%' } },
		{ key: 'object', label: '对象存储', position: { x: '72%', y: '78%' } },
	],
} as const;

const OrbitItem = React.memo(function OrbitItem({
	label,
	className,
	style,
}: {
	label: string;
	className?: string;
	style: React.CSSProperties;
}) {
	return (
		<div
			className={cn('absolute -translate-x-1/2 -translate-y-1/2 text-center', className)}
			style={style}
		>
			<div className='border-brand bg-background mx-auto flex size-12 items-center justify-center rounded-full border'>
				<span className='text-brand text-sm font-semibold'>{label.slice(0, 1)}</span>
			</div>
			<p className='text-foreground mt-2 text-sm leading-none font-medium'>{label}</p>
		</div>
	);
});

export function AppsSection() {
	const apps = APPS_CONTENT;

	return (
		<div className='flex w-full flex-col items-center gap-16'>
			<div className='flex max-w-2xl flex-col items-center gap-4 text-center'>
				<h2 className='text-3xl leading-none font-semibold'>
					{apps.title.prefix}
					<span className='text-brand'>{apps.title.highlight}</span>
				</h2>
				<p className='text-muted-foreground text-base leading-normal'>{apps.subtitle}</p>
			</div>

			<div className='w-full'>
				<div className='relative mx-auto aspect-1282/485 w-full max-w-5xl'>
					<div className='absolute inset-0'>
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='relative flex size-44 items-center justify-center rounded-full border border-dashed border-zinc-300'>
								<div className='absolute inset-10 rounded-full border border-dashed border-zinc-300' />
								<div className='bg-background flex size-24 items-center justify-center rounded-full border border-zinc-200'>
									<span className='text-brand text-4xl leading-none font-semibold'>+</span>
								</div>
							</div>
						</div>

						{apps.orbitItems.map((item) => (
							<OrbitItem
								key={item.key}
								label={item.label}
								style={{ left: item.position.x, top: item.position.y }}
							/>
						))}

						<div className='pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 items-center justify-start md:flex'>
							<div className='grid grid-cols-3 gap-4 opacity-40'>
								{PLACEHOLDER_HEX_KEYS.map((key) => (
									<div
										key={`left-${key}`}
										className='size-14 rounded-xl border border-dashed border-zinc-300'
									/>
								))}
							</div>
						</div>

						<div className='pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 items-center justify-end md:flex'>
							<div className='grid grid-cols-3 gap-4 opacity-40'>
								{PLACEHOLDER_HEX_KEYS.map((key) => (
									<div
										key={`right-${key}`}
										className='size-14 rounded-xl border border-dashed border-zinc-300'
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
