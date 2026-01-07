import NextBundleAnalyzer from '@next/bundle-analyzer';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const config: NextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
	compiler: {
		removeConsole:
			process.env.NODE_ENV === 'production'
				? {
						exclude: ['error', 'warn'],
					}
				: false,
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['turbopack-inline-svg-loader'],
				condition: {
					// 4KB or smaller
					content: /^[\s\S]{0,4000}$/,
				},
				as: '*.js',
			},
		},
	},
	reactCompiler: true,
	output: 'standalone',
};

const withNextIntl = createNextIntlPlugin('./libs/i18n/request.ts');

const withMDX = createMDX();

const withBundleAnalyzer = NextBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withNextIntl(withMDX(config)));
