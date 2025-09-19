import clsx from 'clsx';
import type { ReactNode } from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import type { languagesType } from '@/lib/i18n';
import styles from './index.module.css';

export default async function BlogLayout(props: { params: Promise<{ lang: languagesType }>; children: ReactNode }) {
	const params = await props.params;

	const { children } = props;

	return (
		<div className={`h-full ${styles.blog_layout}`}>
			<Header lang={params.lang} />
			<div className='custom-container md:px-[15%] min-h-screen dark:prose-invert prose px-8 pt-36'>
				{children}
			</div>
			<Footer lang={params.lang} />
		</div>
	);
}
