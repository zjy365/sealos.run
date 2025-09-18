import type { ReactNode } from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import type { languagesType } from '@/lib/i18n';
import styles from './blog.module.css';

export default function BlogLayout({ params, children }: { params: { lang: languagesType }; children: ReactNode }) {
	return (
		<div className={`h-full ${styles.blog_layout}`}>
			<Header lang={params.lang} />
			<div className='custom-container min-h-screen'>{children}</div>
			<Footer lang={params.lang} />
		</div>
	);
}
