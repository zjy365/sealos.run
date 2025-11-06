import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Callout, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/libs/components/prose';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		Callout,
		table: Table,
		thead: TableHead,
		tbody: TableBody,
		tr: TableRow,
		th: TableHeaderCell,
		td: TableCell,
		...components,
	};
}
