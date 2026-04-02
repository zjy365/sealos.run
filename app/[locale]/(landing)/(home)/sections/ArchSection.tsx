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

			<div className='w-full max-w-full overflow-x-scroll'>
				<div className='flex w-full min-w-5xl flex-col'></div>
			</div>
		</div>
	);
}
