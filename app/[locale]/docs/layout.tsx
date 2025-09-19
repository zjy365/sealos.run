import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/libs/docs/layout.shared';
import { source } from '@/libs/docs/source';

export default async function Layout({ children, params }: LayoutProps<'/[locale]/docs'>) {
	const { locale } = await params;

	return (
		<DocsLayout
			{...baseOptions(locale)}
			tree={source.pageTree[locale]}
		>
			{children}
		</DocsLayout>
	);
}
