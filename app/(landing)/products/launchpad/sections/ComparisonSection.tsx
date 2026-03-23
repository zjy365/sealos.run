export function ComparisonSection() {
	const comparisonData = [
		{
			category: '对比项',
			sealos: 'Sealos 部署',
			traditional: '传统 Docker 部署',
			isHeader: true,
		},
		{
			category: '部署',
			sealos: '10 秒全栈交付',
			traditional: '小时级',
		},
		{
			category: '迭代',
			sealos: '滚动更新',
			traditional: '停机更新',
		},
		{
			category: '运维',
			sealos: '全托管',
			traditional: '人力运维',
		},
		{
			category: '资源',
			sealos: '极致利用',
			traditional: '低效闲置',
		},
	];

	const headerRow = comparisonData.find((item) => item.isHeader);
	const dataRows = comparisonData.filter((item) => !item.isHeader);

	return (
		<div className='flex flex-col gap-16'>
			<div className='flex flex-col items-center gap-4 text-center'>
				<h2 className='text-xl font-semibold sm:text-3xl'>
					为什么选择 <span className='text-brand'>Sealos</span> 部署
				</h2>
				<p className='text-muted-foreground text-base'>传统 Docker 部署的痛点，我们都帮您解决了</p>
			</div>
			<div className='relative overflow-x-auto'>
				<table className='w-full border-collapse'>
					<colgroup>
						<col className='w-1/3' />
						<col className='w-1/3' />
						<col className='w-1/3' />
					</colgroup>
					<thead>
						<tr className='text-xs sm:text-base md:text-lg'>
							<th className='border-border text-foreground h-20 border-r border-b px-4 text-left font-bold md:px-8'>
								{headerRow?.category}
							</th>
							<th className='border-border text-brand relative h-20 border-r border-b border-l bg-white/80 px-4 text-left font-bold md:px-8'>
								{headerRow?.sealos}
							</th>
							<th className='border-border text-foreground h-20 border-b border-l px-4 text-left font-bold md:px-8'>
								{headerRow?.traditional}
							</th>
						</tr>
					</thead>
					<tbody>
						{dataRows.map((item) => (
							<tr
								key={item.category}
								className='border-b text-xs last:border-b-0 sm:text-base'
							>
								<td className='border-border text-muted-foreground h-14 border-r px-4 md:px-8'>
									{item.category}
								</td>
								<td className='border-border text-foreground relative h-14 border-r border-l bg-white/80 px-4 md:px-8'>
									{item.sealos}
								</td>
								<td className='border-border text-muted-foreground h-14 border-l px-4 md:px-8'>
									{item.traditional}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div
					className='pointer-events-none absolute top-0 left-1/3 h-full w-1/3 rounded-none'
					style={{
						border: '1.5px solid transparent',
						borderImage: 'linear-gradient(to bottom, var(--color-brand), rgb(191, 219, 254)) 1',
					}}
				/>
			</div>
		</div>
	);
}
