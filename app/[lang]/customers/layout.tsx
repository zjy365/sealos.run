import type { ReactNode } from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import type { languagesType } from '@/lib/i18n';

export default async function CaseLayout(props: { params: Promise<{ lang: languagesType }>; children: ReactNode }) {
	const params = await props.params;

	const { children } = props;

	return (
		<div className='h-full bg-gradient-to-b from-[#EBF2FF] via-[#F0F7FF] to-[#FFF8F0]'>
			{/* Warm gradient background */}
			<div className="absolute inset-0 bg-[url('/images/customers/bg-pattern.png')] opacity-5 z-0"></div>
			<Header lang={params.lang} />
			<div className='custom-container relative z-10 min-h-screen'>{children}</div>
			<Footer lang={params.lang} />
		</div>
	);
}
