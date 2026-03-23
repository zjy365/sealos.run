import type { Node, Root } from 'fumadocs-core/page-tree';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type React from 'react';
import { Footer } from '@/libs/components/Footer';
import { Navbar } from '@/libs/components/Navbar';
import { Config } from '@/libs/config';
import { baseOptions } from '@/libs/docs/layout.shared';
import { source } from '@/libs/docs/source';
import { routing } from '@/libs/i18n/routing';

function normalizeNodeUrls(node: Node): Node {
	if (node.type === 'page') {
		return {
			...node,
			url: node.url,
		};
	}

	return {
		...node,
		index: node.index
			? {
					...node.index,
					url: node.index.url,
				}
			: node.index,
		children: node.children.map(normalizeNodeUrls),
	};
}

function normalizeTreeUrls(tree: Root): Root {
	return {
		...tree,
		children: tree.children.map(normalizeNodeUrls),
	};
}

export default async function Layout({ children }: { children: React.ReactNode }) {
	const publicTree = normalizeTreeUrls(source.pageTree);

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
					`}
				</style>
				<DocsLayout
					{...baseOptions(routing.defaultLocale)}
					tree={publicTree}
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
