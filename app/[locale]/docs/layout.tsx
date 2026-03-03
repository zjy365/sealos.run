import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type React from 'react';
import { Footer } from '@/libs/components/Footer';
import { Navbar } from '@/libs/components/Navbar';
import { Config } from '@/libs/config';
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

	const tree = source.pageTree[locale];
	if (!tree) {
		return null;
	}

	return (
		<>
			<header className='sticky top-0 z-50'>
				<Navbar />
			</header>

			<main className='relative min-h-screen'>
				<style>
					{`
					#nd-docs-layout {
						--fd-banner-height: calc(var(--sealos-navbar-height) + var(--sealos-banner-height));
						border-bottom: 1px solid var(--color-border);
					}

					#nd-sidebar-mobile {
						top: var(--fd-docs-row-1);
					}
					`}
				</style>
				<DocsLayout
					{...baseOptions(locale)}
					tree={tree}
				>
					{children}
				</DocsLayout>
			</main>

			<footer className='pt-16 sm:pt-24 md:pt-36'>
				<Footer config={Config.components.footer} />
			</footer>
		</>
	);
}
