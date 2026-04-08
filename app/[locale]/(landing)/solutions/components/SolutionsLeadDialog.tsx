'use client';

import React from 'react';
import { z } from 'zod';
import { FramedCalendarIcon, FramedCheckIcon } from '@/assets/icons';
import { Button } from '@/libs/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/libs/components/ui/dialog';
import { Icon } from '@/libs/components/ui/icon';
import { Input } from '@/libs/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/components/ui/select';
import { cn } from '@/libs/utils/styling';

const scenarioOptions = [
	{ label: '集群管理', value: 'cluster_management' },
	{ label: '应用管理', value: 'app_management' },
	{ label: 'GPU调度', value: 'gpu_scheduling' },
] as const;

const scenarioValues = scenarioOptions.map((option) => option.value) as [
	(typeof scenarioOptions)[number]['value'],
	...(typeof scenarioOptions)[number]['value'][],
];

const ContactFormInputSchema = z.object({
	companyName: z.string().trim().min(1, '请输入企业名称').max(127, '企业名称不能超过 127 个字符'),
	serverCount: z
		.string()
		.trim()
		.min(1, '请输入服务器数量')
		.refine((value) => /^\d+$/.test(value), '服务器数量必须是整数')
		.refine((value) => Number(value) >= 1, '服务器数量至少为 1')
		.refine((value) => Number(value) <= 65535, '服务器数量不能超过 65535'),
	scenario: z.enum(scenarioValues, { message: '请选择应用场景' }),
	contactName: z.string().trim().min(1, '请输入联系人姓名').max(127, '联系人姓名不能超过 127 个字符'),
	contactTel: z.string().trim().min(1, '请输入联系人电话').max(127, '联系人电话不能超过 127 个字符'),
	contactDate: z
		.string()
		.trim()
		.min(1, '请选择时间')
		.refine((value) => !Number.isNaN(Date.parse(value)), '请输入有效时间'),
});

const ContactFormSchema = z.object({
	companyName: z.string().min(1).max(127),
	serverCount: z.number().min(1).max(65535),
	scenario: z.enum(scenarioValues),
	contactName: z.string().min(1).max(127),
	contactTel: z.string().min(1).max(127),
	contactDate: z.date(),
});

const SubmitContactFormRequestSchema = z.object({
	meta: z.object({
		formVersion: z.string().min(1),
	}),
	formValues: ContactFormSchema,
});

type ContactFormValues = {
	companyName: string;
	serverCount: string;
	scenario: (typeof scenarioOptions)[number]['value'];
	contactName: string;
	contactTel: string;
	contactDate: string;
};

type SolutionsLeadDialogProps = {
	endpoint: string;
	formVersion: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

type FormFieldName = keyof ContactFormValues;
type FormErrors = Partial<Record<FormFieldName | 'form', string>>;

const initialValues: ContactFormValues = {
	companyName: '',
	serverCount: '',
	scenario: scenarioOptions[0].value,
	contactName: '',
	contactTel: '',
	contactDate: '',
};

function Field({
	htmlFor,
	label,
	error,
	children,
}: {
	htmlFor: string;
	label: string;
	error?: string;
	children: React.ReactNode;
}) {
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
			{error ? <p className='text-destructive text-sm leading-5'>{error}</p> : null}
		</div>
	);
}

function parseFieldErrors(error: z.ZodError<ContactFormValues>) {
	const fieldErrors = error.flatten().fieldErrors;

	return {
		companyName: fieldErrors.companyName?.[0],
		serverCount: fieldErrors.serverCount?.[0],
		scenario: fieldErrors.scenario?.[0],
		contactName: fieldErrors.contactName?.[0],
		contactTel: fieldErrors.contactTel?.[0],
		contactDate: fieldErrors.contactDate?.[0],
	} satisfies Partial<Record<FormFieldName, string | undefined>>;
}

function buildRequestBody(values: ContactFormValues, formVersion: string) {
	return {
		meta: {
			formVersion,
		},
		formValues: {
			companyName: values.companyName.trim(),
			serverCount: Number(values.serverCount),
			scenario: values.scenario,
			contactName: values.contactName.trim(),
			contactTel: values.contactTel.trim(),
			contactDate: new Date(values.contactDate),
		},
	};
}

export function SolutionsLeadDialog({ endpoint, formVersion, open, onOpenChange }: SolutionsLeadDialogProps) {
	const [values, setValues] = React.useState<ContactFormValues>(initialValues);
	const [errors, setErrors] = React.useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [isSubmitted, setIsSubmitted] = React.useState(false);

	const updateField = React.useCallback(<K extends FormFieldName>(field: K, value: ContactFormValues[K]) => {
		setValues((current) => ({
			...current,
			[field]: value,
		}));
		setErrors((current) => ({
			...current,
			[field]: undefined,
			form: undefined,
		}));
	}, []);

	const resetForm = React.useCallback(() => {
		setValues(initialValues);
		setErrors({});
		setIsSubmitting(false);
		setIsSubmitted(false);
	}, []);

	const handleOpenChange = React.useCallback(
		(nextOpen: boolean) => {
			onOpenChange(nextOpen);

			if (!nextOpen) {
				resetForm();
			}
		},
		[onOpenChange, resetForm],
	);

	const handleSubmit = React.useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			const parsedFormValues = ContactFormInputSchema.safeParse(values);

			if (!parsedFormValues.success) {
				setErrors(parseFieldErrors(parsedFormValues.error));
				return;
			}

			if (!endpoint) {
				setErrors({
					form: '表单提交地址未配置，请先在 site config 中补充 endpoint。',
				});
				return;
			}

			const requestBody = buildRequestBody(parsedFormValues.data, formVersion);

			const parsedRequest = SubmitContactFormRequestSchema.safeParse(requestBody);

			if (!parsedRequest.success) {
				setErrors({ form: '表单配置异常，请稍后重试。' });
				return;
			}

			setIsSubmitting(true);
			setErrors({});

			try {
				const response = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(parsedRequest.data),
				});

				const responseData = (await response.json().catch(() => null)) as {
					error?: {
						code?: string;
						message?: string;
					};
				} | null;

				if (!response.ok) {
					setErrors({
						form: responseData?.error?.message ?? '提交失败，请检查表单内容后重试。',
					});
					return;
				}

				setIsSubmitted(true);
			} catch {
				setErrors({ form: '网络异常，提交失败，请稍后重试。' });
			} finally {
				setIsSubmitting(false);
			}
		},
		[endpoint, formVersion, values],
	);

	return (
		<Dialog
			open={open}
			onOpenChange={handleOpenChange}
		>
			<DialogContent
				id='solutions-lead-dialog'
				className='max-h-[calc(100svh-2rem)] w-6xl overflow-y-auto p-6 shadow-lg lg:min-w-4xl'
			>
				{isSubmitted ? (
					<div className='flex flex-col items-center gap-6 py-8 text-center sm:py-12'>
						<div className='bg-brand/10 text-brand flex size-16 items-center justify-center rounded-full'>
							<Icon
								src={FramedCheckIcon}
								className='size-8'
							/>
						</div>
						<DialogHeader className='items-center gap-3'>
							<DialogTitle className='text-foreground text-3xl leading-none font-semibold tracking-tight'>
								提交成功
							</DialogTitle>
							<DialogDescription className='text-muted-foreground max-w-md text-sm leading-6'>
								Sealos 商务会在 2小时内与您联系
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type='button'
									variant='outline'
									className='h-10 min-w-24 text-sm font-medium'
								>
									返回
								</Button>
							</DialogClose>
						</DialogFooter>
					</div>
				) : (
					<form
						className='flex flex-col gap-6'
						onSubmit={handleSubmit}
					>
						<DialogHeader className='gap-3'>
							<DialogTitle className='text-foreground text-3xl leading-none font-semibold tracking-tight'>
								获取 Sealos 私有化解决方案
							</DialogTitle>
							<DialogDescription asChild>
								<div className='text-muted-foreground space-y-5 text-sm leading-5'>
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
							</DialogDescription>
						</DialogHeader>

						{errors.form ? <p className='text-destructive text-sm leading-5'>{errors.form}</p> : null}

						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<Field
								htmlFor='solutions-company-name'
								label='企业名称'
								error={errors.companyName}
							>
								<Input
									id='solutions-company-name'
									name='companyName'
									value={values.companyName}
									onChange={(event) => updateField('companyName', event.target.value)}
									placeholder='请输入您的企业名称'
									aria-invalid={Boolean(errors.companyName)}
									className='border-border h-10 rounded-md px-3 text-sm shadow-none'
								/>
							</Field>

							<Field
								htmlFor='solutions-server-count'
								label='服务器数量'
								error={errors.serverCount}
							>
								<Input
									id='solutions-server-count'
									name='serverCount'
									type='number'
									min='1'
									max='65535'
									inputMode='numeric'
									value={values.serverCount}
									onChange={(event) => updateField('serverCount', event.target.value)}
									placeholder='0'
									aria-invalid={Boolean(errors.serverCount)}
									className='border-border h-10 rounded-md px-3 text-sm shadow-none'
								/>
							</Field>

							<Field
								htmlFor='solutions-scenario'
								label='应用场景'
								error={errors.scenario}
							>
								<Select
									value={values.scenario}
									onValueChange={(value) =>
										updateField('scenario', value as ContactFormValues['scenario'])
									}
								>
									<SelectTrigger
										id='solutions-scenario'
										aria-labelledby='solutions-scenario-label'
										aria-invalid={Boolean(errors.scenario)}
										className='border-border h-10 w-full rounded-md px-3 text-sm font-normal shadow-none'
									>
										<SelectValue placeholder='请选择应用场景' />
									</SelectTrigger>
									<SelectContent align='start'>
										{scenarioOptions.map((scenario) => (
											<SelectItem
												key={scenario.value}
												value={scenario.value}
											>
												{scenario.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>

							<Field
								htmlFor='solutions-contact-name'
								label='联系人姓名'
								error={errors.contactName}
							>
								<Input
									id='solutions-contact-name'
									name='contactName'
									value={values.contactName}
									onChange={(event) => updateField('contactName', event.target.value)}
									aria-invalid={Boolean(errors.contactName)}
									className='border-border h-10 rounded-md px-3 text-sm shadow-none'
								/>
							</Field>

							<Field
								htmlFor='solutions-contact-tel'
								label='联系人电话'
								error={errors.contactTel}
							>
								<Input
									id='solutions-contact-tel'
									name='contactTel'
									inputMode='tel'
									value={values.contactTel}
									onChange={(event) => updateField('contactTel', event.target.value)}
									placeholder='请输入联系人电话'
									aria-invalid={Boolean(errors.contactTel)}
									className='border-border h-10 rounded-md px-3 text-sm shadow-none'
								/>
							</Field>

							<Field
								htmlFor='solutions-contact-date'
								label='时间'
								error={errors.contactDate}
							>
								<div className='relative'>
									<div className='text-muted-foreground pointer-events-none absolute top-1/2 left-4 -translate-y-1/2'>
										<Icon
											src={FramedCalendarIcon}
											className='size-4'
										/>
									</div>
									<Input
										id='solutions-contact-date'
										name='contactDate'
										type='date'
										value={values.contactDate}
										onChange={(event) => updateField('contactDate', event.target.value)}
										aria-invalid={Boolean(errors.contactDate)}
										className={cn(
											'border-border h-10 rounded-md pr-3 pl-10 text-sm shadow-none',
											'[color-scheme:light]',
										)}
									/>
								</div>
							</Field>
						</div>

						<DialogFooter className='gap-3'>
							<DialogClose asChild>
								<Button
									type='button'
									variant='outline'
									disabled={isSubmitting}
									className='border-border bg-background h-10 w-24 text-sm font-medium'
								>
									取消
								</Button>
							</DialogClose>
							<Button
								type='submit'
								disabled={isSubmitting}
								className='bg-brand hover:bg-brand/90 h-10 w-24 text-sm font-medium text-white'
							>
								{isSubmitting ? '提交中...' : '提交'}
							</Button>
						</DialogFooter>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
