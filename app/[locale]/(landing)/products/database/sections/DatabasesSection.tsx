import type React from 'react';
import { KafkaIcon, MilvusIcon, MongodbIcon, MysqlIcon, PostgresIcon, RedisIcon } from '@/assets/app-icons';
import { FlatArrowRightIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';

const databases: Array<{
	name: string;
	version: string;
	icon: React.ReactNode;
}> = [
	{
		name: 'PostgreSQL',
		version: 'v8.0.31',
		icon: (
			<Icon
				src={PostgresIcon}
				className='size-10'
				colorful
			/>
		),
	},
	{
		name: 'MongoDB',
		version: 'v16.1',
		icon: (
			<Icon
				src={MongodbIcon}
				className='size-10'
				colorful
			/>
		),
	},
	{
		name: 'MySQL',
		version: 'v7.0',
		icon: (
			<Icon
				src={MysqlIcon}
				className='size-10'
				colorful
			/>
		),
	},
	{
		name: 'Redis',
		version: 'v7.0.6',
		icon: (
			<Icon
				src={RedisIcon}
				className='size-10'
				colorful
			/>
		),
	},
	{
		name: 'Kafka',
		version: 'v3.3.2',
		icon: (
			<Icon
				src={KafkaIcon}
				className='size-10'
				colorful
			/>
		),
	},
	{
		name: 'Milvus',
		version: 'v2.4.5',
		icon: (
			<Icon
				src={MilvusIcon}
				className='size-10'
				colorful
			/>
		),
	},
];

export function DatabasesSection() {
	return (
		<div className='flex flex-col gap-8'>
			<div className='flex flex-col gap-3'>
				<h2 className='text-2xl font-medium'>支持的数据库</h2>
				<p className='text-muted-foreground text-base'>
					全面兼容主流数据库生态，分布式存储，支持快速扩展与无缝迁移。
				</p>
			</div>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
				{databases.map((db) => (
					<div
						key={db.name}
						className='relative flex flex-col overflow-hidden border border-dashed border-zinc-400 bg-zinc-50'
					>
						<div className='flex items-center gap-4 p-4'>
							<div className='flex flex-1 flex-col gap-0.5'>
								<p className='text-foreground text-base font-normal'>{db.name}</p>
								<p className='text-muted-foreground text-sm'>{db.version}</p>
							</div>
							<div className='flex size-10 items-center justify-center'>{db.icon}</div>
						</div>
						<div className='border-t border-dashed border-zinc-400 px-4 py-3'>
							<Link
								href='#'
								className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors'
							>
								<span>安装</span>
								<Icon
									src={FlatArrowRightIcon}
									className='size-4'
								/>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
