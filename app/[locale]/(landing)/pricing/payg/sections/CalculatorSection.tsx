'use client';

import React from 'react';
import {
	AppIcon,
	CalculatorIcon,
	ClockCounterIcon,
	CpuIcon,
	DiskIcon,
	MemoryIcon,
	PortIcon,
	PricetagIcon,
} from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';
import { NumberInput } from '@/libs/components/ui/number-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/components/ui/select';
import { Slider } from '@/libs/components/ui/slider';
import { cn } from '@/libs/utils/styling';
import {
	type AppTypeId,
	appTypes,
	calculatorDefaults,
	GiB_BYTES,
	newUserCredit,
	type RegionId,
	regions,
	unitPricesByRegion,
	unitPriceTable,
} from '../utils/config';

function clampInt(value: number, min: number, max: number) {
	if (!Number.isFinite(value)) return min;
	return Math.min(max, Math.max(min, Math.trunc(value)));
}

function toGiB(bytes: number) {
	return Math.round(bytes / GiB_BYTES);
}

function fromGiB(gib: number) {
	return gib * GiB_BYTES;
}

function useCnyFormatter() {
	return React.useMemo(
		() =>
			new Intl.NumberFormat('zh-CN', {
				style: 'currency',
				currency: 'CNY',
				currencyDisplay: 'narrowSymbol',
				minimumFractionDigits: 0,
				maximumFractionDigits: 2,
			}),
		[],
	);
}

function SliderWithLabels({
	value,
	onChange,
	min,
	max,
	step,
	labels,
	unit,
	inputAriaLabel,
}: {
	value: number;
	onChange: (next: number) => void;
	min: number;
	max: number;
	step: number;
	labels: number[];
	unit: string;
	inputAriaLabel: string;
}) {
	return (
		<div className='flex w-full flex-col gap-1'>
			<Slider
				value={[value]}
				onValueChange={(v) => onChange(clampInt(v[0] ?? min, min, max))}
				min={min}
				max={max}
				step={step}
				aria-label={inputAriaLabel}
				className={cn(
					'w-full',
					'**:data-[slot=slider-track]:bg-secondary',
					'**:data-[slot=slider-range]:bg-zinc-900',
					'**:data-[slot=slider-thumb]:border-zinc-900',
				)}
			/>
			<div className='text-muted-foreground flex w-full items-center gap-2 text-xs'>
				<div className='flex flex-1 items-center justify-between'>
					{labels.map((n) => (
						<span key={n}>{n}</span>
					))}
				</div>
				<span className='shrink-0'>{unit}</span>
			</div>
		</div>
	);
}

function FieldLabel({ icon, label }: { icon: Parameters<typeof Icon>[0]['src']; label: string }) {
	return (
		<div className='flex w-32 items-center gap-2'>
			<div className='size-6'>
				<Icon
					src={icon}
					className='size-full'
				/>
			</div>
			<span className='text-sm text-zinc-900'>{label}</span>
		</div>
	);
}

export function CalculatorSection() {
	const cny = useCnyFormatter();

	const [regionId, setRegionId] = React.useState<RegionId>(calculatorDefaults.regionId);
	const [appTypeId, setAppTypeId] = React.useState<AppTypeId>(calculatorDefaults.appTypeId);

	// CRITICAL: store memory/storage in base units (bytes).
	const [cpuCores, setCpuCores] = React.useState<number>(calculatorDefaults.cpuCores);
	const [memoryBytes, setMemoryBytes] = React.useState<number>(calculatorDefaults.memoryBytes);
	const [storageBytes, setStorageBytes] = React.useState<number>(calculatorDefaults.storageBytes);
	const [ports, setPorts] = React.useState<number>(calculatorDefaults.ports);
	const [runtimeHoursPerDay, setRuntimeHoursPerDay] = React.useState<number>(calculatorDefaults.runtimeHoursPerDay);

	const unitPrices = unitPricesByRegion[regionId];

	const memoryGiB = toGiB(memoryBytes);
	const storageGiB = toGiB(storageBytes);

	const costs = React.useMemo(() => {
		const cpuPerHour = cpuCores * unitPrices.cpuCoreHour;
		const memoryPerHour = memoryGiB * unitPrices.memoryGiBHour;
		const storagePerHour = storageGiB * unitPrices.storageGiBHour;
		const portPerHour = ports * unitPrices.portHour;

		const perHour = cpuPerHour + memoryPerHour + storagePerHour + portPerHour;
		const perDay = perHour * runtimeHoursPerDay;
		const perMonth = perDay * 30;

		return {
			perDayBreakdown: {
				cpu: cpuPerHour * runtimeHoursPerDay,
				memory: memoryPerHour * runtimeHoursPerDay,
				storage: storagePerHour * runtimeHoursPerDay,
				port: portPerHour * runtimeHoursPerDay,
			},
			perDay,
			perMonth,
		};
	}, [cpuCores, memoryGiB, ports, runtimeHoursPerDay, storageGiB, unitPrices]);

	return (
		<div className='bg-zinc-50'>
			<div className='border-brand container mx-auto flex flex-col border-y border-dashed lg:flex-row'>
				{/* Left: region + unit price table */}
				<div className='border-brand flex w-full flex-col gap-12 border-b border-dashed px-6 py-10 lg:w-120 lg:border-r lg:border-b-0 lg:px-20 lg:pr-10'>
					<div className='flex flex-col gap-4'>
						{regions.map((r) => {
							const active = r.id === regionId;
							return (
								<button
									key={r.id}
									type='button'
									onClick={() => setRegionId(r.id)}
									aria-pressed={active}
									className={cn(
										'flex w-full items-center justify-between rounded-full border px-4 py-3 text-left transition-colors',
										active
											? 'border-foreground bg-white text-zinc-900'
											: 'border-border text-muted-foreground bg-transparent hover:bg-white/60',
									)}
								>
									<span className={cn('text-xl', active ? 'font-semibold' : 'font-normal')}>
										{r.label}
									</span>
									<span className='text-lg'>{r.vendor}</span>
								</button>
							);
						})}
					</div>

					<div className='flex flex-col gap-3'>
						<div className='flex items-center gap-3'>
							<div className='text-brand size-6'>
								<Icon
									src={PricetagIcon}
									className='size-full'
								/>
							</div>
							<h3 className='text-2xl font-semibold text-zinc-900'>
								资源<span className='text-brand'>单价</span>
							</h3>
						</div>

						<div className='overflow-hidden rounded-lg'>
							<div className='grid grid-cols-[1fr_7rem_6rem] items-center border-b border-zinc-200 px-4 py-2 text-sm text-zinc-600'>
								<span>资源名</span>
								<span className='text-zinc-500'>单位</span>
								<span className='text-right text-zinc-500'>价格</span>
							</div>
							{unitPriceTable.map((row) => (
								<div
									key={row.key}
									className='grid grid-cols-[1fr_7rem_6rem] items-center border-b border-zinc-100 px-4 py-2 text-sm last:border-b-0'
								>
									<span className='text-zinc-900'>{row.name}</span>
									<span className='text-zinc-900'>{row.unit}</span>
									<span className='text-right text-zinc-900'>{cny.format(row.get(unitPrices))}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right: config + estimate */}
				<div className='flex min-w-0 flex-1 flex-col'>
					<div className='border-brand flex w-full flex-col gap-6 border-b border-dashed bg-zinc-50 px-6 py-10 lg:px-10 lg:pr-20'>
						<div className='flex items-center gap-3'>
							<div className='text-brand size-6'>
								<Icon
									src={CalculatorIcon}
									className='size-full'
								/>
							</div>
							<h3 className='text-2xl font-semibold text-zinc-900'>
								<span className='text-brand'>成本</span>计算
							</h3>
						</div>
						<p className='text-base font-medium text-zinc-900'>在下方配置你的应用:</p>

						<div className='flex flex-col gap-6'>
							{/* App type */}
							<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-10'>
								<FieldLabel
									icon={AppIcon}
									label='应用类型'
								/>
								<Select
									value={appTypeId}
									onValueChange={(v) => setAppTypeId(v as AppTypeId)}
								>
									<SelectTrigger className='h-10 w-48 rounded-lg'>
										<SelectValue placeholder='选择应用类型' />
									</SelectTrigger>
									<SelectContent>
										{appTypes.map((t) => (
											<SelectItem
												key={t.id}
												value={t.id}
											>
												{t.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* CPU */}
							<div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-10'>
								<FieldLabel
									icon={CpuIcon}
									label='CPU'
								/>
								<div className='flex min-w-0 flex-1 flex-col gap-2'>
									<SliderWithLabels
										value={cpuCores}
										onChange={(n) => setCpuCores(clampInt(n, 1, 32))}
										min={1}
										max={32}
										step={1}
										labels={[1, 8, 16, 24, 32]}
										unit='C'
										inputAriaLabel='CPU 核数'
									/>
								</div>
								<div className='flex items-center gap-3'>
									<NumberInput
										value={cpuCores}
										onValueChange={(v) => setCpuCores(clampInt(v ?? 1, 1, 32))}
										min={1}
										max={32}
										stepper={1}
										decimalScale={0}
										className='h-10 w-20 text-center'
									/>
									<span className='text-muted-foreground w-[3ch] text-sm'>C</span>
								</div>
							</div>

							{/* Memory */}
							<div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-10'>
								<FieldLabel
									icon={MemoryIcon}
									label='内存'
								/>
								<div className='flex min-w-0 flex-1 flex-col gap-2'>
									<SliderWithLabels
										value={memoryGiB}
										onChange={(n) => setMemoryBytes(fromGiB(clampInt(n, 1, 32)))}
										min={1}
										max={32}
										step={1}
										labels={[1, 8, 16, 24, 32]}
										unit='GiB'
										inputAriaLabel='内存容量（GiB）'
									/>
								</div>
								<div className='flex items-center gap-3'>
									<NumberInput
										value={memoryGiB}
										onValueChange={(v) => setMemoryBytes(fromGiB(clampInt(v ?? 1, 1, 32)))}
										min={1}
										max={32}
										stepper={1}
										decimalScale={0}
										className='h-10 w-20 text-center'
									/>
									<span className='text-muted-foreground w-[3ch] text-sm'>GiB</span>
								</div>
							</div>

							{/* Storage */}
							<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-10'>
								<FieldLabel
									icon={DiskIcon}
									label='存储卷'
								/>
								<div className='flex items-center gap-3'>
									<NumberInput
										value={storageGiB}
										onValueChange={(v) => setStorageBytes(fromGiB(clampInt(v ?? 1, 1, 10_000)))}
										min={1}
										max={10_000}
										stepper={1}
										decimalScale={0}
										className='h-10 w-24 text-center'
									/>
									<span className='text-muted-foreground w-[3ch] text-sm'>GiB</span>
								</div>
							</div>

							{/* Port */}
							<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-10'>
								<FieldLabel
									icon={PortIcon}
									label='端口'
								/>
								<div className='flex items-center gap-3'>
									<NumberInput
										value={ports}
										onValueChange={(v) => setPorts(clampInt(v ?? 1, 1, 999))}
										min={1}
										max={999}
										stepper={1}
										decimalScale={0}
										className='h-10 w-24 text-center'
									/>
									<span className='text-muted-foreground w-[3ch] text-sm'>个</span>
								</div>
							</div>

							{/* Runtime */}
							<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-10'>
								<FieldLabel
									icon={ClockCounterIcon}
									label='运行时间'
								/>
								<div className='flex flex-wrap items-center gap-4'>
									<NumberInput
										value={runtimeHoursPerDay}
										onValueChange={(v) => setRuntimeHoursPerDay(clampInt(v ?? 1, 1, 24))}
										min={1}
										max={24}
										stepper={1}
										decimalScale={0}
										className='h-10 w-24 text-center'
									/>
									<Select
										value='hour'
										onValueChange={() => {}}
									>
										<SelectTrigger className='h-10 w-28 rounded-lg'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='hour'>小时</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
					</div>

					<div className='bg-white px-6 py-10 lg:px-10 lg:pr-20'>
						<h3 className='text-brand text-2xl font-semibold'>预估费用</h3>

						<div className='mt-6 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between'>
							<div className='flex w-full max-w-lg flex-col'>
								{[
									{
										key: 'cpu',
										label: 'CPU',
										icon: CpuIcon,
										value: costs.perDayBreakdown.cpu,
									},
									{
										key: 'memory',
										label: '内存',
										icon: MemoryIcon,
										value: costs.perDayBreakdown.memory,
									},
									{
										key: 'storage',
										label: '存储卷',
										icon: DiskIcon,
										value: costs.perDayBreakdown.storage,
									},
									{
										key: 'port',
										label: '端口',
										icon: PortIcon,
										value: costs.perDayBreakdown.port,
									},
								].map((row) => (
									<div
										key={row.key}
										className='flex items-center justify-between border-b border-zinc-100 py-2 text-sm'
									>
										<div className='flex items-center gap-2'>
											<div className='size-6'>
												<Icon
													src={row.icon}
													className='size-full'
												/>
											</div>
											<span className='text-zinc-900'>{row.label}</span>
										</div>
										<span className='text-zinc-600'>{cny.format(row.value)}/天</span>
									</div>
								))}
							</div>

							<div className='border-brand h-48 w-px border-r border-dashed' />

							<div className='flex w-full max-w-md flex-col gap-4'>
								<p className='text-base whitespace-pre-wrap text-zinc-900'>
									新用户 {cny.format(newUserCredit.creditCny)} 免费额度可用{' '}
									<span className='text-brand'>{newUserCredit.validDays}</span> 天
								</p>

								<div className='flex flex-wrap items-center gap-x-10 gap-y-2 text-xl font-semibold'>
									<div className='flex items-center gap-2'>
										<span className='text-zinc-900'>每天总计:</span>
										<span className='text-brand'>{cny.format(costs.perDay)}</span>
									</div>
									<div className='flex items-center gap-2'>
										<span className='text-zinc-900'>月预估:</span>
										<span className='text-brand'>{cny.format(costs.perMonth)}</span>
									</div>
								</div>
							</div>

							<div className='flex w-full justify-start lg:w-auto lg:justify-end'>
								<LandingOutlineButton
									href='#'
									size='lg'
								>
									开始部署
								</LandingOutlineButton>
							</div>
						</div>

						{/* Expose base-unit state for integration */}
						<input
							type='hidden'
							name='paygCpuCores'
							value={cpuCores}
						/>
						<input
							type='hidden'
							name='paygMemoryBytes'
							value={memoryBytes}
						/>
						<input
							type='hidden'
							name='paygStorageBytes'
							value={storageBytes}
						/>
						<input
							type='hidden'
							name='paygPorts'
							value={ports}
						/>
						<input
							type='hidden'
							name='paygRuntimeHoursPerDay'
							value={runtimeHoursPerDay}
						/>
						<input
							type='hidden'
							name='paygRegionId'
							value={regionId}
						/>
						<input
							type='hidden'
							name='paygAppTypeId'
							value={appTypeId}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
