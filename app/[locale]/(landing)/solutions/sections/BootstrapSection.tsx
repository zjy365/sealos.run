'use client';

import React from 'react';
import { BigRightArrowImage as BigRightArrow } from '@/assets';
import { FlatArrowRightIcon, Number01Icon, Number02Icon, Number03Icon, Number04Icon } from '@/assets/icons';
import { Button } from '@/libs/components/ui/button';
import { Icon } from '@/libs/components/ui/icon';
import { SolutionsLeadDialog } from '../components/SolutionsLeadDialog';

type BootstrapItemData = {
	key: string;
	icon: typeof Number01Icon;
	actionText: string;
	actionType: 'link' | 'dialog';
	title: string;
	bullets: string[];
};

type BootstrapSectionProps = {
	githubHref: string;
	contactFormConfig: {
		endpoint: string;
		version: string;
	};
};

const items: BootstrapItemData[] = [
	{
		key: 'trial',
		icon: Number01Icon,
		actionText: '跳转 GitHub',
		actionType: 'link',
		title: '开源社区版',
		bullets: ['针对极客/个人开发者', '单机/集群一键部署', '全球开发者社区技术支持'],
	},
	{
		key: 'consulting',
		icon: Number02Icon,
		actionText: '弹出表单',
		actionType: 'dialog',
		title: '企业版 POC 体验',
		bullets: ['全功能私有化环境体验', '30 天免费授权', '零成本验证业务适配性'],
	},
	{
		key: 'community',
		icon: Number03Icon,
		actionText: '弹出表单',
		actionType: 'dialog',
		title: '架构设计咨询',
		bullets: ['复杂需求的用户', '社区技术支持', '丰富学习资源'],
	},
	{
		key: 'enterprise',
		icon: Number04Icon,
		actionText: '弹出表单',
		actionType: 'dialog',
		title: '企业级私有云交付',
		bullets: ['根据业务场景定制开发插件', '企业级 SLA 运维保障', '信创国产化适配与安全合规'],
	},
];

function ActionPillInner({ children }: { children: string }) {
	return (
		<>
			<span className='flex items-center justify-center gap-2 opacity-100 transition-opacity group-hover:opacity-0'>
				<span>{children}</span>
				<span className='size-4'>
					<Icon
						src={FlatArrowRightIcon}
						className='size-full'
					/>
				</span>
			</span>

			<span className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100'>
				<Icon
					src={BigRightArrow}
					className='h-3 w-full'
				/>
			</span>
		</>
	);
}

function LinkActionPill({ href, children }: { href: string; children: string }) {
	return (
		<Button
			asChild
			variant='outline'
			size='sm'
			className='group text-foreground hover:border-brand hover:text-brand w-[16ch] shrink-0 bg-white px-0 hover:bg-white'
		>
			<a
				href={href}
				target='_blank'
				rel='noreferrer'
				className='relative inline-flex items-center justify-center'
			>
				<ActionPillInner>{children}</ActionPillInner>
			</a>
		</Button>
	);
}

function DialogActionPill({ children, onClick }: { children: string; onClick: () => void }) {
	return (
		<Button
			type='button'
			variant='outline'
			size='sm'
			onClick={onClick}
			className='group text-foreground hover:border-brand hover:text-brand w-[16ch] shrink-0 bg-white px-0 hover:bg-white'
		>
			<span className='relative inline-flex items-center justify-center'>
				<ActionPillInner>{children}</ActionPillInner>
			</span>
		</Button>
	);
}

function BootstrapItem({
	data,
	githubHref,
	onOpenDialog,
}: {
	data: BootstrapItemData;
	githubHref: string;
	onOpenDialog: () => void;
}) {
	return (
		<div className='flex w-full max-w-md flex-col items-center gap-6'>
			<div className='w-full'>
				<div className='flex w-full items-center justify-between'>
					<div className='text-brand size-6'>
						<Icon
							src={data.icon}
							className='size-full'
						/>
					</div>
					{data.actionType === 'link' ? (
						<LinkActionPill href={githubHref}>{data.actionText}</LinkActionPill>
					) : (
						<DialogActionPill onClick={onOpenDialog}>{data.actionText}</DialogActionPill>
					)}
				</div>
				<div className='border-brand/40 mt-3 h-px w-full border-t border-dashed' />
			</div>

			<div className='flex flex-col items-center gap-3 text-center'>
				<p className='text-foreground text-xl leading-normal font-medium'>{data.title}</p>
				<div className='text-muted-foreground flex flex-col items-center gap-1 text-base leading-normal'>
					{data.bullets.map((bullet) => (
						<p key={bullet}>{bullet}</p>
					))}
				</div>
			</div>
		</div>
	);
}

export function BootstrapSection({ githubHref, contactFormConfig }: BootstrapSectionProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<div className='flex w-full flex-col items-center gap-20'>
				<h2 className='text-foreground text-center text-3xl leading-normal font-semibold'>
					开始你的<span className='text-brand'>云原生之旅</span>
				</h2>

				<div className='grid w-full grid-cols-1 place-items-center gap-y-16 md:grid-cols-2 md:gap-x-24'>
					{items.map((item) => (
						<BootstrapItem
							key={item.key}
							data={item}
							githubHref={githubHref}
							onOpenDialog={() => setOpen(true)}
						/>
					))}
				</div>
			</div>

			<SolutionsLeadDialog
				endpoint={contactFormConfig.endpoint}
				formVersion={contactFormConfig.version}
				open={open}
				onOpenChange={setOpen}
			/>
		</>
	);
}
