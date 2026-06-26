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

					#nd-sidebar {
						background-color: var(--color-background)
					}

					#nd-sidebar-mobile {
						top: var(--fd-docs-row-1);
					}

					#nd-docs-layout {
						min-width: 0;
					}

					#nd-docs-layout :is(h1, h2, h3, h4, h5, h6, p, li, a),
					#nd-docs-layout #nd-toc a {
						overflow-wrap: anywhere;
						word-break: break-word;
					}

					#nd-docs-layout :is(h1, h2, h3, h4, h5, h6) > a {
						min-width: 0;
						max-width: 100%;
						white-space: normal;
					}
					`}
				</style>
				<DocsLayout
					{...baseOptions(locale)}
					tree={tree}
					themeSwitch={{ enabled: false }}
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
