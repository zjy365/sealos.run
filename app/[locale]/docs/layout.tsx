import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type React from 'react';
import { baseOptions } from '@/libs/docs/layout.shared';
import { source } from '@/libs/docs/source';

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
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
