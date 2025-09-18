import type { ReactNode } from 'react';
import Header from '@/components/header';
import type { languagesType } from '@/lib/i18n';

export default function CaseStudyLayout({
	params,
	children,
}: {
	params: { lang: languagesType };
	children: ReactNode;
}) {
	return (
		<div className='h-full'>
			<Header lang={params.lang} />
			<div className='custom-container min-h-screen'>{children}</div>
		</div>
	);
}
