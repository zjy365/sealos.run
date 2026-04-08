'use client';

import React from 'react';
import { z } from 'zod';
import { CheckOverFrameIcon, FramedCheckIcon, LightningOverFrameIcon, QuestionIcon } from '@/assets/icons';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { Input } from '@/libs/components/ui/input';

const TemplateRequestFormInputSchema = z.object({
	repoUrl: z
		.string()
		.trim()
		.min(1, '请输入 GitHub 仓库地址')
		.url('请输入有效的 GitHub 仓库地址')
		.refine((value) => {
			try {
				return new URL(value).hostname === 'github.com';
			} catch {
				return false;
			}
		}, '请输入有效的 GitHub 仓库地址'),
});

const TemplateRequestFormSchema = z.object({
	repoUrl: z.url(),
});

const SubmitTemplateRequestFormRequestSchema = z.object({
	meta: z.object({
		formVersion: z.string().min(1),
	}),
	formValues: TemplateRequestFormSchema,
});

type RequestSectionProps = {
	templateRequestFormConfig: {
		endpoint: string;
		version: string;
	};
};

type TemplateRequestFormValues = {
	repoUrl: string;
};

type FormErrors = Partial<Record<keyof TemplateRequestFormValues | 'form', string>>;

const initialValues: TemplateRequestFormValues = {
	repoUrl: '',
};

function FeaturePill({ icon, text }: { icon: Parameters<typeof Icon>[0]['src']; text: string }) {
	return (
		<div className='flex items-center gap-2'>
			<div className='text-brand size-6'>
				<Icon
					src={icon}
					className='size-full'
				/>
			</div>
			<p className='text-foreground text-base leading-normal font-normal'>{text}</p>
		</div>
	);
}

function buildRequestBody(values: TemplateRequestFormValues, formVersion: string) {
	return {
		meta: {
			formVersion,
		},
		formValues: {
			repoUrl: values.repoUrl.trim(),
		},
	};
}

export function RequestSection({ templateRequestFormConfig }: RequestSectionProps) {
	const [values, setValues] = React.useState(initialValues);
	const [errors, setErrors] = React.useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [isSubmitted, setIsSubmitted] = React.useState(false);

	const handleSubmit = React.useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			const parsedFormValues = TemplateRequestFormInputSchema.safeParse(values);

			if (!parsedFormValues.success) {
				setErrors({
					repoUrl: parsedFormValues.error.flatten().fieldErrors.repoUrl?.[0],
				});
				return;
			}

			if (!templateRequestFormConfig.endpoint) {
				setErrors({
					form: '表单提交地址未配置，请先在 site config 中补充 endpoint。',
				});
				return;
			}

			const requestBody = buildRequestBody(parsedFormValues.data, templateRequestFormConfig.version);
			const parsedRequest = SubmitTemplateRequestFormRequestSchema.safeParse(requestBody);

			if (!parsedRequest.success) {
				setErrors({ form: '表单配置异常，请稍后重试。' });
				return;
			}

			setIsSubmitting(true);
			setErrors({});

			try {
				const response = await fetch(templateRequestFormConfig.endpoint, {
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
				setValues(initialValues);
			} catch {
				setErrors({ form: '网络异常，提交失败，请稍后重试。' });
			} finally {
				setIsSubmitting(false);
			}
		},
		[templateRequestFormConfig.endpoint, templateRequestFormConfig.version, values],
	);

	return (
		<div
			id='request'
			className='text-foreground flex w-full flex-col items-center gap-9'
		>
			<div className='flex w-full flex-col items-center gap-4 text-center'>
				<div className='flex items-center gap-2'>
					<p className='text-foreground text-3xl leading-none font-medium'>找不到你想要的应用</p>
					<div className='text-foreground size-6'>
						<Icon
							src={QuestionIcon}
							className='text-brand size-full'
							strokeWidth={1.5}
						/>
					</div>
				</div>
				<p className='text-muted-foreground text-base leading-normal font-normal'>
					我们支持所有 <span className='text-brand'>Docker</span> 化的{' '}
					<span className='text-brand'>GitHub</span> 项目！
				</p>
			</div>

			{isSubmitted ? (
				<div className='bg-muted flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-10 text-center'>
					<div className='bg-brand/10 text-brand flex size-16 items-center justify-center rounded-full'>
						<Icon
							src={FramedCheckIcon}
							className='size-8'
						/>
					</div>
					<div className='flex max-w-md flex-col gap-3'>
						<p className='text-foreground text-3xl leading-none font-semibold'>提交成功</p>
						<p className='text-muted-foreground text-sm leading-6'>
							我们已收到您的 GitHub 仓库地址，会尽快为您生成部署模板并与您联系。
						</p>
					</div>
					<Button
						type='button'
						variant='outline'
						onClick={() => {
							setIsSubmitted(false);
							setErrors({});
						}}
					>
						继续提交
					</Button>
				</div>
			) : (
				<form
					className='w-full max-w-4xl'
					onSubmit={handleSubmit}
				>
					<div className='bg-muted flex w-full flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pr-2 sm:pl-5'>
						<Input
							className='min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:border-transparent focus-visible:ring-0'
							placeholder='输入 GitHub 仓库地址'
							name='repoUrl'
							aria-label='输入 GitHub 仓库地址'
							aria-invalid={Boolean(errors.repoUrl)}
							value={values.repoUrl}
							onChange={(event) => {
								setValues({ repoUrl: event.target.value });
								setErrors({});
							}}
						/>
						<Button
							type='submit'
							variant='outline'
							disabled={isSubmitting}
						>
							{isSubmitting ? '提交中...' : '提交'}
						</Button>
					</div>
					{errors.repoUrl ? (
						<p className='text-destructive mt-3 text-sm leading-5'>{errors.repoUrl}</p>
					) : null}
					{errors.form ? <p className='text-destructive mt-3 text-sm leading-5'>{errors.form}</p> : null}
				</form>
			)}

			<div className='flex flex-wrap items-center justify-center gap-8'>
				<FeaturePill
					icon={CheckOverFrameIcon}
					text='自动生成部署模版'
				/>
				<FeaturePill
					icon={LightningOverFrameIcon}
					text='24 小时内上线'
				/>
			</div>
		</div>
	);
}
