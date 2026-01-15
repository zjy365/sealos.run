'use client';

import { AnimatePresence, motion, useInView } from 'motion/react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';
import {
	FramedCodeIcon,
	FramedSaveIcon,
	IsolateIcon,
	ObjectStorageIcon,
	PersonIcon,
	PreviewIcon,
	RocketIcon,
} from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { cn } from '@/libs/utils/styling';
import { FeatureCollabImage, FeatureIsolationImage, FeatureQuickImage } from '../assets';

interface FeaturePoint {
	icon: StaticImageData;
	title: string;
	description: string;
}

interface FeatureSectionData {
	title: string;
	description: string;
	features: FeaturePoint[];
	image: StaticImageData;
	imageAlt: string;
}

const featureSectionsData: FeatureSectionData[] = [
	{
		title: '统一环境,独立运行',
		description: '统一的环境标准,独立的运行空间',
		features: [
			{
				icon: FramedCodeIcon,
				title: '开发到生产的无缝体验',
				description: '部署时打包整个容器(代码+依赖+运行时),环境100%一致',
			},
			{
				icon: IsolateIcon,
				title: '项目间完全隔离',
				description: '独立的容器实例,开发、测试与生产环境不会互相影响',
			},
		],
		image: FeatureIsolationImage,
		imageAlt: '统一环境,独立运行',
	},
	{
		title: '云端协作开发',
		description: '云端开发环境,本地AI IDE/IDEA助力编程',
		features: [
			{
				icon: ObjectStorageIcon,
				title: '云端存储',
				description: '项目代码云端存储,随时随地协同编码',
			},
			{
				icon: PreviewIcon,
				title: '线上预览',
				description: '多设备实时预览,手机电脑平板边写边测',
			},
			{
				icon: PersonIcon,
				title: '团队空间',
				description: '所有项目集中展示,权限精细控制,项目完全隔离',
			},
		],
		image: FeatureCollabImage,
		imageAlt: '云端协作开发',
	},
	{
		title: '秒级发布上线',
		description: '容器化预构建+自动部署,实现真正的秒级上线',
		features: [
			{
				icon: FramedSaveIcon,
				title: '版本管理',
				description: 'Git 集成,OCI 标准镜像格式,系统自动化构建',
			},
			{
				icon: RocketIcon,
				title: '发布上线',
				description: '一键发布,自动化容器编排,环境一致并相互隔离',
			},
		],
		image: FeatureQuickImage,
		imageAlt: '秒级发布上线',
	},
];

function AnimatedImage({ src, alt }: { src: StaticImageData; alt: string }) {
	const imageContainerRef = React.useRef<HTMLDivElement>(null);
	const hasExpandedRef = React.useRef(false);
	const isInViewRaw = useInView(imageContainerRef, {
		margin: '-40% 0px 0px 0px',
		amount: 0,
	});
	const [isInView, setIsInView] = React.useState(false);

	React.useEffect(() => {
		if (!imageContainerRef.current) return;

		const checkInView = () => {
			if (!isInViewRaw) {
				return;
			}

			const rect = imageContainerRef.current?.getBoundingClientRect();
			if (!rect) {
				return;
			}

			const viewportHeight = window.innerHeight;
			const topThreshold = viewportHeight * 0.6;

			const isInTop60Percent = rect.top >= 0 && rect.top <= topThreshold && rect.bottom > 0;
			if (isInTop60Percent) {
				hasExpandedRef.current = true;
				setIsInView(true);
			} else if (!hasExpandedRef.current) {
				setIsInView(false);
			}
		};

		checkInView();
		window.addEventListener('scroll', checkInView, { passive: true });
		window.addEventListener('resize', checkInView, { passive: true });

		return () => {
			window.removeEventListener('scroll', checkInView);
			window.removeEventListener('resize', checkInView);
		};
	}, [isInViewRaw]);

	return (
		<div
			ref={imageContainerRef}
			className='min-h-px w-full'
		>
			<AnimatePresence initial={false}>
				{isInView && (
					<motion.div
						className='border-brand w-full border border-dashed p-3'
						initial={{
							height: 0,
							opacity: 0,
						}}
						animate={{
							height: 'auto',
							opacity: 1,
						}}
						exit={{
							height: 0,
							opacity: 0,
						}}
						transition={{
							duration: 0.3,
							ease: 'easeInOut',
						}}
					>
						<div className='relative w-full overflow-hidden'>
							<Image
								src={src}
								alt={alt}
								className='w-full object-contain'
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function FeaturePointItem({ icon, title, description }: FeaturePoint) {
	return (
		<div className='flex items-start gap-4'>
			<div className='text-brand flex size-8 shrink-0 items-center justify-center'>
				<Icon
					src={icon}
					className='size-8'
				/>
			</div>

			<div className='flex flex-1 flex-col items-start gap-1'>
				<h4 className='text-lg font-medium'>{title}</h4>
				<p className='text-muted-foreground text-right text-sm'>{description}</p>
			</div>
		</div>
	);
}

function FeatureSection({ data, className }: { data: FeatureSectionData; className?: string }) {
	return (
		<>
			<div className={cn('flex flex-col gap-4 pt-16', className)}>
				<h3 className='text-2xl font-semibold'>{data.title}</h3>
				<p className='text-muted-foreground text-base'>{data.description}</p>
			</div>
			<div className='mt-8 flex justify-end'>
				<div className='flex w-2xl flex-col items-start gap-6'>
					{/* Feature points */}
					<div className='flex flex-col gap-6'>
						{data.features.map((feature) => (
							<FeaturePointItem
								key={feature.title}
								{...feature}
							/>
						))}
					</div>

					{/* Demo image */}
					<AnimatedImage
						src={data.image}
						alt={data.imageAlt}
					/>
				</div>
			</div>
		</>
	);
}

export function UnifiedEnvironmentSection() {
	const data = featureSectionsData[0];
	if (!data) {
		return null;
	}
	return <FeatureSection data={data} />;
}

export function CloudCollaborationSection() {
	const data = featureSectionsData[1];
	if (!data) {
		return null;
	}
	return (
		<FeatureSection
			data={data}
			className='border-t'
		/>
	);
}

export function QuickReleaseSection() {
	const data = featureSectionsData[2];
	if (!data) {
		return null;
	}
	return (
		<FeatureSection
			data={data}
			className='border-t'
		/>
	);
}

interface FeatureItemProps {
	icon: StaticImageData;
	title: string;
	description: string;
	image: StaticImageData;
}

function FeatureItem({ icon, title, description, image }: FeatureItemProps) {
	return (
		<div className='flex flex-col items-end gap-6'>
			{/* Feature items on top */}
			<div className='flex flex-col items-end gap-6'>
				<div className='flex items-start gap-4'>
					<div className='flex flex-1 flex-col items-end gap-1'>
						<h4 className='text-lg font-medium'>{title}</h4>
						<p className='text-muted-foreground text-right text-sm'>{description}</p>
					</div>
					<div className='text-brand flex size-8 shrink-0 items-center justify-center'>
						<Icon
							src={icon}
							className='size-8'
						/>
					</div>
				</div>
			</div>

			{/* Demo image at bottom */}
			<AnimatedImage
				src={image}
				alt={title}
			/>
		</div>
	);
}

const features: FeatureItemProps[] = [
	{
		icon: IsolateIcon,
		title: '项目间完全隔离',
		description: '独立的容器实例,开发、测试与生产环境不会互相影响',
		image: FeatureIsolationImage,
	},
	{
		icon: ObjectStorageIcon,
		title: '云端协作开发',
		description: '项目代码云端存储,随时随地协同编码',
		image: FeatureCollabImage,
	},
	{
		icon: RocketIcon,
		title: '秒级发布上线',
		description: '一键发布,自动化容器编排,环境一致并相互隔离',
		image: FeatureQuickImage,
	},
];

export function FeaturesSection() {
	return (
		<div className='flex flex-col gap-12'>
			<div className='flex flex-col items-end gap-4'>
				<h2 className='text-right text-3xl font-semibold'>
					你需要的<span className='text-brand'>一切功能</span>
				</h2>
				<p className='text-muted-foreground text-right text-base'>告别多工具拼凑，从创建到分析一站搞定</p>
			</div>

			<div className='flex flex-col items-end gap-16'>
				{features.map((feature) => (
					<FeatureItem
						key={feature.title}
						{...feature}
					/>
				))}
			</div>
		</div>
	);
}
