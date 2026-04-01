'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { FramedCalendarIcon } from '@/assets/icons';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { Input } from '@/libs/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/components/ui/select';

const applicationScenarios = ['集群管理', '应用托管', '数据存储', 'AI 算力', '多租户管理', '私有化部署'] as const;

type SolutionsLeadDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

function Field({ htmlFor, label, children }: { htmlFor: string; label: string; children: React.ReactNode }) {
	return (
		<div className='flex w-full flex-col gap-2'>
			<label
				id={`${htmlFor}-label`}
				htmlFor={htmlFor}
				className='text-sm leading-none font-medium'
			>
				{label}
			</label>
			{children}
		</div>
	);
}

export function SolutionsLeadDialog({ open, onOpenChange }: SolutionsLeadDialogProps) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	React.useEffect(() => {
		if (!open) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onOpenChange(false);
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [open, onOpenChange]);

	if (!mounted || !open) return null;

	return createPortal(
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-3 backdrop-blur-sm sm:p-6'>
			<button
				type='button'
				aria-label='关闭弹窗'
				className='absolute inset-0 cursor-default'
				onClick={() => onOpenChange(false)}
			/>
			<div
				id='solutions-lead-dialog'
				role='dialog'
				aria-modal='true'
				aria-labelledby='solutions-lead-dialog-title'
				aria-describedby='solutions-lead-dialog-description'
				className='bg-background relative max-h-[calc(100svh-2rem)] w-full max-w-3xl overflow-y-auto rounded-lg border p-6 shadow-lg'
			>
				<form
					className='flex flex-col gap-6'
					onSubmit={(event) => {
						event.preventDefault();
						onOpenChange(false);
					}}
				>
					<div className='flex flex-col gap-3'>
						<h2
							id='solutions-lead-dialog-title'
							className='text-foreground text-3xl leading-none font-semibold tracking-tight'
						>
							获取 Sealos 私有化解决方案
						</h2>
						<div
							id='solutions-lead-dialog-description'
							className='text-muted-foreground space-y-5 text-sm leading-5'
						>
							<p>
								如果您的团队/企业有兴趣在私有云/公有云环境中完全拥有 Sealos cloud（
								<a
									href='https://cloud.sealos.run'
									target='_blank'
									rel='noreferrer'
									className='text-brand underline underline-offset-2'
								>
									https://cloud.sealos.run
								</a>
								）的能力，请填写如下表单联系我们，Sealos 商务会在 2小时内与您联系。
							</p>
							<p>
								Sealos历经9年研发，公有云运行5年，30W开发者验证，具备K8S集群管理、容器应用快速托管，高可用数据库，对象存储，多集群管理，多租户管理等能力，同时拥有了近百款应用能力，满足企业所有部门的用云诉求。
							</p>
							<p>
								极高的性能和资源利用率，可以帮助企业减少沟通协调成本、资源成本等，同时 Sealos
								支持全国产化集群、GPU，支持纯离线交付，是企业上云的不二之选。
							</p>
						</div>
					</div>

					<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
						<Field
							htmlFor='solutions-company-name'
							label='企业名称'
						>
							<Input
								id='solutions-company-name'
								name='companyName'
								placeholder='请输入您的企业名称'
								className='border-border h-10 rounded-md px-3 text-sm shadow-none'
							/>
						</Field>

						<Field
							htmlFor='solutions-server-count'
							label='服务器数量'
						>
							<Input
								id='solutions-server-count'
								name='serverCount'
								inputMode='numeric'
								placeholder='0'
								className='border-border h-10 rounded-md px-3 text-sm shadow-none'
							/>
						</Field>

						<Field
							htmlFor='solutions-scenario'
							label='应用场景'
						>
							<Select
								name='scenario'
								defaultValue={applicationScenarios[0]}
							>
								<SelectTrigger
									id='solutions-scenario'
									aria-labelledby='solutions-scenario-label'
									className='border-border h-10 w-full rounded-md px-3 text-sm font-normal shadow-none'
								>
									<SelectValue placeholder='请选择应用场景' />
								</SelectTrigger>
								<SelectContent align='start'>
									{applicationScenarios.map((scenario) => (
										<SelectItem
											key={scenario}
											value={scenario}
										>
											{scenario}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</Field>

						<Field
							htmlFor='solutions-contact-name'
							label='联系人姓名'
						>
							<Input
								id='solutions-contact-name'
								name='contactName'
								className='border-border h-10 rounded-md px-3 text-sm shadow-none'
							/>
						</Field>

						<Field
							htmlFor='solutions-phone'
							label='联系人电话'
						>
							<Input
								id='solutions-phone'
								name='phone'
								inputMode='tel'
								placeholder='(123) 456 789'
								className='border-border h-10 rounded-md px-3 text-sm shadow-none'
							/>
						</Field>

						<Field
							htmlFor='solutions-schedule'
							label='时间'
						>
							<div className='relative'>
								<div className='text-muted-foreground pointer-events-none absolute top-1/2 left-4 -translate-y-1/2'>
									<Icon
										src={FramedCalendarIcon}
										className='size-4'
									/>
								</div>
								<Input
									id='solutions-schedule'
									name='schedule'
									placeholder='MM / DD / YY'
									className='border-border h-10 rounded-md pr-3 pl-10 text-sm shadow-none'
								/>
							</div>
						</Field>
					</div>

					<div className='flex justify-end gap-3'>
						<Button
							type='button'
							variant='outline'
							className='border-border bg-background h-10 w-24 text-sm font-medium'
							onClick={() => onOpenChange(false)}
						>
							取消
						</Button>
						<Button
							type='submit'
							className='bg-brand hover:bg-brand/90 h-10 w-24 text-sm font-medium text-white'
						>
							提交
						</Button>
					</div>
				</form>
			</div>
		</div>,
		document.body,
	);
}
