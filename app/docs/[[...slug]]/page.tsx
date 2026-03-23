import type { Folder, Node, Root } from 'fumadocs-core/page-tree';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { source } from '@/libs/docs/source';
import { redirect } from '@/libs/i18n/navigation';
import { routing } from '@/libs/i18n/routing';
import { getMDXComponents } from '@/mdx-components';

export const dynamic = 'force-dynamic';

const siteUrl = 'https://sealos.run';
const docsTitleSuffix = 'Sealos 使用指南';

function normalizeKeywords(value: string | string[] | undefined): string[] | undefined {
	if (!value) return undefined;
	if (Array.isArray(value)) return value.filter(Boolean);
	return value
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean);
}

interface DocsParams {
	params: Promise<{ slug?: string[] }>;
}

interface ResolvedDocsPage {
	page: NonNullable<ReturnType<typeof source.getPage>>;
	redirectUrl?: string;
}

function getFolderMetaPath(folder: Folder): string | undefined {
	const metaFile = folder.$ref?.metaFile;
	if (!metaFile) {
		return undefined;
	}

	return metaFile.replace(/\/meta\.json$/, '').replace(/^meta\.json$/, '');
}

function findFolderByIndexUrl(nodes: Node[], url: string): Folder | undefined {
	for (const node of nodes) {
		if (node.type !== 'folder') {
			continue;
		}

		if (node.index?.url === url) {
			return node;
		}

		const childMatch = findFolderByIndexUrl(node.children, url);
		if (childMatch) {
			return childMatch;
		}
	}
}

function findFolderByMetaPath(nodes: Node[], targetPath: string): Folder | undefined {
	for (const node of nodes) {
		if (node.type !== 'folder') {
			continue;
		}

		if (getFolderMetaPath(node) === targetPath) {
			return node;
		}

		const childMatch = findFolderByMetaPath(node.children, targetPath);
		if (childMatch) {
			return childMatch;
		}
	}
}

function getFirstDocumentUrl(node: Root | Folder): string | undefined {
	if ('index' in node && node.index?.url) {
		return node.index.url;
	}

	for (const child of node.children) {
		if (child.type === 'page') {
			return child.url;
		}

		if (child.type === 'folder') {
			if (child.index?.url) {
				return child.index.url;
			}

			const nestedUrl = getFirstDocumentUrl(child);
			if (nestedUrl) {
				return nestedUrl;
			}
		}
	}
}

function resolveDocsPage(slug: string[] | undefined): ResolvedDocsPage | undefined {
	const slugPath = slug?.join('/') ?? '';
	const tree = source.pageTree;
	const folderFromMetaPath = slugPath ? findFolderByMetaPath(tree.children, slugPath) : undefined;

	if (folderFromMetaPath) {
		const currentPage = source.getPage(slug);
		const firstDocumentUrl = getFirstDocumentUrl(folderFromMetaPath);
		const redirectPage = firstDocumentUrl ? source.getPageByHref(firstDocumentUrl)?.page : undefined;

		if (currentPage && (!firstDocumentUrl || firstDocumentUrl === currentPage.url)) {
			return {
				page: currentPage,
			};
		}

		if (firstDocumentUrl && redirectPage) {
			return {
				page: redirectPage,
				redirectUrl: firstDocumentUrl,
			};
		}
	}

	const page = source.getPage(slug);
	if (!page) {
		return undefined;
	}

	if ((slug?.length ?? 0) === 0) {
		return { page };
	}

	const currentFolder = findFolderByIndexUrl(tree.children, page.url);
	const firstDocumentUrl = currentFolder ? getFirstDocumentUrl(currentFolder) : undefined;

	if (!firstDocumentUrl || firstDocumentUrl === page.url) {
		return { page };
	}

	const redirectPage = source.getPageByHref(firstDocumentUrl)?.page;
	if (!redirectPage) {
		return { page, redirectUrl: firstDocumentUrl };
	}

	return {
		page: redirectPage,
		redirectUrl: firstDocumentUrl,
	};
}

export default async function Page(props: DocsParams) {
	const params = await props.params;
	const resolved = resolveDocsPage(params.slug);
	if (!resolved) notFound();

	if (resolved.redirectUrl) {
		redirect(resolved.redirectUrl);
	}

	const { page } = resolved;
	const MDX = page.data.body;

	return (
		<DocsPage
			toc={page.data.toc}
			full={page.data.full}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDX components={getMDXComponents()} />
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: DocsParams): Promise<Metadata> {
	const params = await props.params;
	const resolved = resolveDocsPage(params.slug);
	if (!resolved) notFound();

	const { page, redirectUrl } = resolved;
	const title = page.data.title;
	const description = page.data.description;
	const seoTitle = page.data.seoTitle ?? title;
	const seoDescription = page.data.seoDescription ?? description;
	const keywords = normalizeKeywords(page.data.keywords);
	const canonicalPath = redirectUrl ?? page.url;
	const canonicalUrl = new URL(canonicalPath, siteUrl);
	const metadataTitle = seoTitle === '文档中心' ? docsTitleSuffix : `${seoTitle} | ${docsTitleSuffix}`;

	return {
		title: {
			absolute: metadataTitle,
		},
		description: seoDescription,
		keywords,
		alternates: {
			canonical: canonicalPath,
		},
		openGraph: {
			title: metadataTitle,
			description: seoDescription,
			type: 'article',
			url: canonicalUrl,
			siteName: 'Sealos',
			locale: routing.defaultLocale,
		},
		twitter: {
			card: 'summary',
			title: metadataTitle,
			description: seoDescription,
		},
	};
}
