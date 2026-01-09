'use client';

import { Badge } from '@/libs/components/ui/badge';

const params = [
	{
		parameter: 'model',
		type: 'String',
		description: '要使用的模型名称',
		example: 'Doubao-lite-4k',
	},
	{
		parameter: 'messages',
		type: 'Array',
		description: '消息数组，包含对话历史',
		example: "[{ role: 'user', content: 'Hello' }]",
	},
	{
		parameter: 'max_tokens',
		type: 'Number',
		description: '生成的最大 token 数',
		example: '2048',
	},
	{
		parameter: 'temperature',
		type: 'Number',
		description: '控制输出的随机性，范围 0-2',
		example: '0.7',
	},
];

export function ParamsScene() {
	return (
		<div className='w-full'>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='border-b border-zinc-200 bg-zinc-50'>
						<th className='px-4 py-3 text-left text-sm font-medium text-zinc-900'>参数</th>
						<th className='px-4 py-3 text-left text-sm font-medium text-zinc-900'>类型</th>
						<th className='px-4 py-3 text-left text-sm font-medium text-zinc-900'>说明</th>
						<th className='px-4 py-3 text-left text-sm font-medium text-zinc-900'>示例值</th>
					</tr>
				</thead>
				<tbody>
					{params.map((param) => (
						<tr
							key={param.parameter}
							className='border-b border-zinc-100'
						>
							<td className='px-4 py-3 text-sm text-zinc-900'>{param.parameter}</td>
							<td className='px-4 py-3'>
								<Badge
									variant='outline'
									size='sm'
									className='border-brand text-brand border-dashed'
								>
									{param.type}
								</Badge>
							</td>
							<td className='px-4 py-3 text-sm text-zinc-600'>{param.description}</td>
							<td className='px-4 py-3 text-sm text-zinc-900'>{param.example}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
