import type { ReactNode } from 'react';
import Footer from '@/libs/legacy/components/footer';
import Header from '@/libs/legacy/components/header';
import type { languagesType } from '@/libs/legacy/utils/i18n';
import styles from './blog.module.css';

export default async function BlogLayout(props: { params: Promise<{ lang: languagesType }>; children: ReactNode }) {
	const params = await props.params;

	const { children } = props;

	return (
		<div className={`h-full ${styles.blog_layout}`}>
			<Header lang={params.lang} />
			<div className='custom-container min-h-screen'>{children}</div>
			<Footer lang={params.lang} />
		</div>
	);
}
