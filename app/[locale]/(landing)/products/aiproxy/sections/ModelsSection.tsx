'use client';

import type { StaticImageData } from 'next/image';
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, SearchIcon, ToolIcon, XIcon } from '@/assets/icons';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/components/ui/select';
import { cn } from '@/libs/utils/styling';

type TagData = {
	label: string;
	icon?: StaticImageData;
};

const models = [
	{
		name: 'Doubao-pro-32k',
		type: '聊天补全',
		rpm: '240',
		inputPrice: '0.23',
		outputPrice: '0.24',
		tags: [
			{ label: '视觉', icon: EyeIcon },
			{ label: '工具调用', icon: ToolIcon },
			{ label: '128K' },
			{ label: '4K 输出' },
		] satisfies TagData[],
	},
	{
		name: 'deepseek-reasoner',
		type: '聊天补全',
		rpm: '240',
		inputPrice: '0.23',
		outputPrice: '0.24',
		tags: [{ label: '深度思考' }, { label: '128K' }] satisfies TagData[],
	},
	{
		name: 'Doubao-pro-32k',
		type: '聊天补全',
		rpm: '240',
		inputPrice: '0.23',
		outputPrice: '0.24',
		tags: [
			{ label: '视觉', icon: EyeIcon },
			{ label: '工具调用', icon: ToolIcon },
			{ label: '128K' },
			{ label: '4K 输出' },
		] satisfies TagData[],
	},
	{
		name: 'deepseek-reasoner',
		type: '聊天补全',
		rpm: '240',
		inputPrice: '0.23',
		outputPrice: '0.24',
		tags: [{ label: '深度思考' }, { label: '128K' }] satisfies TagData[],
	},
];

function SearchBox({
	isOpen,
	query,
	onOpen,
	onClose,
	onQueryChange,
}: {
	isOpen: boolean;
	query: string;
	onOpen: () => void;
	onClose: () => void;
	onQueryChange: (query: string) => void;
}) {
	return (
		<>
			{/* 小屏幕：始终显示搜索框 */}
			<div className='flex h-10 w-full items-center gap-2 rounded-full border border-zinc-300 bg-white pr-2 pl-4 sm:hidden'>
				<input
					type='text'
					placeholder='根据模型名称搜索'
					value={query}
					onChange={(e) => onQueryChange(e.target.value)}
					className='flex-1 outline-none'
				/>
				<Icon
					src={SearchIcon}
					className='text-brand size-5 shrink-0'
				/>
			</div>

			{/* 大屏幕：按钮或搜索框 */}
			{!isOpen ? (
				<button
					onClick={onOpen}
					className='hidden size-10 items-center justify-center rounded-full border border-zinc-300 bg-white sm:flex'
					type='button'
				>
					<Icon
						src={SearchIcon}
						className='text-brand size-5'
					/>
				</button>
			) : (
				<div className='hidden h-10 items-center gap-2 rounded-full border border-zinc-300 bg-white pr-2 pl-4 sm:flex'>
					<input
						type='text'
						placeholder='根据模型名称搜索'
						value={query}
						onChange={(e) => onQueryChange(e.target.value)}
						className='w-64 outline-none'
					/>
					<button
						onClick={onClose}
						className='flex size-10 items-center justify-center rounded-full'
						type='button'
					>
						<Icon
							src={XIcon}
							className='text-brand size-5'
						/>
					</button>
				</div>
			)}
		</>
	);
}

export function ModelsSection() {
	const [isSearchOpen, setIsSearchOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState('');
	const [sortInput, setSortInput] = React.useState<'asc' | 'desc' | null>(null);
	const [sortOutput, setSortOutput] = React.useState<'asc' | 'desc' | null>(null);

	return (
		<div className='flex flex-col gap-8'>
			<div className='flex flex-col gap-3'>
				<div className='flex items-center gap-3'>
					<h2 className='text-4xl font-semibold'>模型广场</h2>
					<Badge variant='outline'>
						<div className='bg-brand mr-1.5 size-1.5 rounded-full' />
						示例数据
					</Badge>
				</div>
				<p className='text-muted-foreground text-sm'>价格较官方低 5%-10% (以平台标价为准)</p>
			</div>

			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
				<div className='flex w-full items-center gap-3 sm:w-auto'>
					<span className='w-20 shrink-0 text-base font-semibold'>系列/厂商</span>
					<Select defaultValue='all'>
						<SelectTrigger className='min-w-0 flex-1 bg-white'>
							<SelectValue placeholder='全部' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>全部</SelectItem>
							<SelectItem value='vendor'>系列/厂商</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='flex w-full items-center gap-3 sm:w-auto'>
					<span className='w-20 shrink-0 text-base font-semibold'>类型</span>
					<Select defaultValue='all'>
						<SelectTrigger className='min-w-0 flex-1 bg-white'>
							<SelectValue placeholder='全部' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>全部</SelectItem>
							<SelectItem value='type'>类型</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='w-full sm:ml-auto sm:w-auto'>
					<SearchBox
						isOpen={isSearchOpen}
						query={searchQuery}
						onOpen={() => setIsSearchOpen(true)}
						onClose={() => {
							setIsSearchOpen(false);
							setSearchQuery('');
						}}
						onQueryChange={setSearchQuery}
					/>
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='border-b border-zinc-200'>
							<th className='px-4 py-3 text-left text-sm font-medium'>模型名称</th>
							<th className='px-4 py-3 text-left text-sm font-medium'>模型类型</th>
							<th className='px-4 py-3 text-left text-sm font-medium'>RPM</th>
							<th className='px-4 py-3 text-left text-sm font-medium'>
								<div className='flex items-center gap-2'>
									<span>输入单价/1k tokens</span>
									<button
										type='button'
										onClick={() => {
											if (sortInput === 'asc') {
												setSortInput('desc');
											} else if (sortInput === 'desc') {
												setSortInput(null);
											} else {
												setSortInput('asc');
											}
										}}
										className='flex items-center'
									>
										<Icon
											src={sortInput === 'desc' ? ChevronDownIcon : ChevronUpIcon}
											className={cn('size-4', sortInput ? 'text-brand' : 'text-muted-foreground')}
										/>
									</button>
								</div>
							</th>
							<th className='px-4 py-3 text-left text-sm font-medium'>
								<div className='flex items-center gap-2'>
									<span>输出单价/1k tokens</span>
									<button
										type='button'
										onClick={() => {
											if (sortOutput === 'asc') {
												setSortOutput('desc');
											} else if (sortOutput === 'desc') {
												setSortOutput(null);
											} else {
												setSortOutput('asc');
											}
										}}
										className='flex items-center'
									>
										<Icon
											src={sortOutput === 'desc' ? ChevronDownIcon : ChevronUpIcon}
											className={cn(
												'size-4',
												sortOutput ? 'text-brand' : 'text-muted-foreground',
											)}
										/>
									</button>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{models.map((model, index) => (
							<tr
								key={`${model.name}-${index}`}
								className='border-b border-zinc-100'
							>
								<td className='px-4 py-4'>
									<div className='flex flex-col gap-2'>
										<span className='font-medium'>{model.name}</span>
										<div className='flex flex-wrap gap-2'>
											{model.tags.map((tag, tagIndex) => (
												<Badge
													key={`${tag.label}-${tagIndex}`}
													variant='outline'
													size='sm'
													className='border-dashed'
												>
													{tag.icon && (
														<Icon
															src={tag.icon}
															className='text-brand size-3'
														/>
													)}
													{tag.label}
												</Badge>
											))}
										</div>
									</div>
								</td>
								<td className='px-4 py-4'>
									<Badge variant='outline'>
										<div className='bg-brand mr-1.5 size-1.5 rounded-full' />
										{model.type}
									</Badge>
								</td>
								<td className='px-4 py-4 text-sm'>{model.rpm}</td>
								<td className='px-4 py-4 text-sm'>{model.inputPrice}</td>
								<td className='px-4 py-4 text-sm'>{model.outputPrice}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
