import { AnimateElement } from '@/libs/legacy/components/ui/animated-wrapper';
import { CallToActionSection } from '@/libs/legacy/components/ui/call-to-action-section';
import { appDomain } from '@/libs/legacy/config/site';
import type { languagesType } from '@/libs/legacy/utils/i18n';

export default function Example({ lang = 'en' }: { lang?: languagesType }) {
	const buttonText = lang === 'zh-cn' ? '免费开始（无需信用卡）' : 'Start Free – No Credit Card';
	const buttonHref = `${appDomain}/?openapp=system-devbox`;
	return (
		<div className='mt-[140px]'>
			<AnimateElement type='slideUp'>
				<CallToActionSection
					title='Develop faster and deploy smarter with DevBox'
					buttonText={buttonText}
					buttonHref={buttonHref}
					newWindow={false}
					className=''
				/>
			</AnimateElement>
		</div>
	);
}
