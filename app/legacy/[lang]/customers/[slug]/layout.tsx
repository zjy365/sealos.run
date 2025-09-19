import type { ReactNode } from 'react';
import Header from '@/libs/legacy/components/header';
import type { languagesType } from '@/libs/legacy/utils/i18n';

export default async function CaseStudyLayout(props: {
	params: Promise<{ lang: languagesType }>;
	children: ReactNode;
}) {
	const params = await props.params;

	const { children } = props;

	return (
		<div className='h-full'>
			<Header lang={params.lang} />
			<div className='custom-container min-h-screen'>{children}</div>
		</div>
	);
}
