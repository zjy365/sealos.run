'use client';

import type { StaticImageData } from 'next/image';
import Image from 'next/image';
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
		title: '标准环境，秒级部署',
		description: '告别繁琐配置。 一键拉起标准开发环境，确保开发与生产 100% 同构，彻底终结“环境不一致”隐患。',
		features: [
			{
				icon: FramedCodeIcon,
				title: '生产级同构',
				description: '开发环境即容器本身，代码上线 0 差异，杜绝“在我电脑上能跑”的 Bug。',
			},
			{
				icon: IsolateIcon,
				title: '项目间完全隔离',
				description: '独立的容器实例，开发、测试与生产环境不会互相影响',
			},
		],
		image: FeatureIsolationImage,
		imageAlt: '统一环境,独立运行',
	},
	{
		title: '云端澎湃算力，本地丝滑体验',
		description: '将编译交给云端， 通过 VS Code Remote 无缝连接，轻薄本也能跑微服务/大模型。',
		features: [
			{
				icon: ObjectStorageIcon,
				title: '原生 IDE 支持',
				description: '完美兼容 VS Code / JetBrains等，保留所有插件、主题与快捷键习惯，手感如初',
			},
			{
				icon: PreviewIcon,
				title: '线上预览',
				description: '多设备实时预览提示，手机电脑平板边写边测',
			},
			{
				icon: PersonIcon,
				title: '弹性伸缩',
				description: '编译/训练时一键扩容 CPU 内存，任务结束自动释放，用最低成本换最高效率',
			},
		],
		image: FeatureCollabImage,
		imageAlt: '云端协作开发',
	},
	{
		title: '开发即上线，构建发布一气呵成',
		description: '打破运维边界，在 Devbox 内直接完成镜像构建与服务更新，自动配置域名证书，秒级对外发布。',
		features: [
			{
				icon: FramedSaveIcon,
				title: '构建与发版',
				description: '内置镜像构建，无需复杂流水线，源码一键打包镜像并更新至生产服务。',
			},
			{
				icon: RocketIcon,
				title: '自动域名 SSL',
				description: '自动签发 HTTPS 证书与公网域名，让您的创意瞬间可被全球安全访问。',
			},
		],
		image: FeatureQuickImage,
		imageAlt: '秒级发布上线',
	},
];

function AnimatedImage({ src, alt }: { src: StaticImageData; alt: string }) {
	return (
		<div className='border-brand w-full border border-dashed p-3'>
			<div className='relative w-full overflow-hidden'>
				<Image
					src={src}
					alt={alt}
					className='w-full object-contain'
				/>
			</div>
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
				<p className='text-muted-foreground text-sm'>{description}</p>
			</div>
		</div>
	);
}

function FeatureSection({ data, className }: { data: FeatureSectionData; className?: string }) {
	return (
		<div className='block w-full gap-8 not-first:border-t xl:flex'>
			<div className={cn('flex w-80 max-w-full flex-col gap-4 pt-16', className)}>
				<h3 className='text-xl font-semibold sm:text-2xl'>{data.title}</h3>
				<p className='text-muted-foreground text-xs sm:text-base'>{data.description}</p>
			</div>
			<div className='mt-8 flex w-full justify-end'>
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
		</div>
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
	return <FeatureSection data={data} />;
}

export function QuickReleaseSection() {
	const data = featureSectionsData[2];
	if (!data) {
		return null;
	}
	return <FeatureSection data={data} />;
}
