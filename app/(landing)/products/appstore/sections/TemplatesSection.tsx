import { getAppStoreTemplates } from '@/libs/appstore/utils';
import { TemplatesSectionClient } from './TemplatesSectionClient';

export function TemplatesSection({ locale }: { locale: string }) {
	const templates = getAppStoreTemplates(locale);

	return (
		<div
			id='templates'
			className='flex w-full flex-col items-center gap-12'
		>
			<div className='flex flex-col items-center gap-6 text-center'>
				<div className='text-foreground flex flex-col gap-3 text-xl leading-none font-semibold sm:text-3xl lg:flex-row'>
					<p>
						<span>已部署</span>
						<span className='text-brand'> 100,000+</span>
						<span> 应用实例</span>
					</p>
					<span className='hidden lg:inline'>|</span>
					<p>
						<span className='text-brand'>1000+</span>
						<span> GitHub项目模板</span>
					</p>
				</div>
			</div>

			<TemplatesSectionClient templates={templates} />
		</div>
	);
}
