import 'server-only';
import type React from 'react';
import { siDiscord, siGithub, siQq, siRss, siSinaweibo, siWechat, siX, siYoutube } from 'simple-icons';
import { LinkIcon } from '@/assets/icons';
import { ProductsPanel } from './components/Navbar/ProductsPanel';
import { Icon } from './components/ui/icon';
import { SimpleIcon } from './components/ui/simple-icon';

/**
 * Server only config file for the site.
 *
 * ? You should render all components on the server side and then pass them to the client components.
 *
 * @example
 * // Importing this file
 * import { Config } from '@/libs/config';
 */
export const Config = (() => {
	// For the editor plugin to recognize i18n keys
	const t = <T,>(key: T) => key;

	return {
		pages: {},
		components: {
			navbar: {
				contactLink: 'https://sealos.io/contact',
				signinLink: 'https://usw.sealos.io/?openapp=system-brain',
				links: [
					{
						textI18nKey: t('components.navbar.links.products'),
						href: '/products',
						panel: <ProductsPanel />,
					},
					{
						textI18nKey: t('components.navbar.links.solutions'),
						href: '/solutions',
					},
					{
						textI18nKey: t('components.navbar.links.pricing'),
						href: '/pricing',
					},
					{
						textI18nKey: t('components.navbar.links.docs'),
						href: '/docs',
					},
					{
						textI18nKey: t('components.navbar.links.appstore'),
						href: '/appstore',
					},
					{
						textI18nKey: t('components.navbar.links.about-us'),
						href: '/about-us',
					},
				] as Array<{
					textI18nKey: string;
					href: string;
					panel?: React.ReactNode;
				}>,
			},
			footer: {
				titleI18nKey: t('components.footer.title'),
				taglineI18nKey: t('components.footer.tagline'),
				copyrightI18nKey: t('components.footer.copyright'),
				menuItems: [
					{
						titleI18nKey: t('components.footer.menuItems.resources.title'),
						links: [
							{
								textI18nKey: t('components.footer.menuItems.resources.links.docs'),
								url: 'https://sealos.io/docs/quick-start',
							},
							{
								textI18nKey: t('components.footer.menuItems.resources.links.education'),
								url: 'https://sealos.io/education',
							},
							{
								textI18nKey: t('components.footer.menuItems.resources.links.blog'),
								url: 'https://sealos.io/blog',
							},
						],
					},
					{
						titleI18nKey: t('components.footer.menuItems.products.title'),
						links: [
							{
								textI18nKey: t('components.footer.menuItems.products.links.devbox'),
								url: 'https://sealos.io/products/devbox',
							},
							{
								textI18nKey: t('components.footer.menuItems.products.links.databases'),
								url: 'https://sealos.io/products/databases',
							},
							{
								textI18nKey: t('components.footer.menuItems.products.links.appstore'),
								url: 'https://sealos.io/products/app-store',
							},
						],
					},
					{
						titleI18nKey: t('components.footer.menuItems.services.title'),
						links: [
							{
								textI18nKey: t('components.footer.menuItems.services.links.pricing'),
								url: 'https://sealos.io/pricing',
							},
							{
								textI18nKey: t('components.footer.menuItems.services.links.fastgpt'),
								url: 'https://tryfastgpt.ai/',
							},
						],
					},
					{
						titleI18nKey: t('components.footer.menuItems.support.title'),
						links: [
							{
								textI18nKey: t('components.footer.menuItems.support.links.contactUs'),
								url: 'https://sealos.io/contact',
							},
							{
								textI18nKey: t('components.footer.menuItems.support.links.customers'),
								url: 'https://sealos.io/',
							},
						],
					},
				],
				bottomLinks: [
					{
						textI18nKey: t('components.footer.bottomLinks.termsOfService'),
						url: 'https://sealos.io/docs/msa/terms-of-service',
					},
					{
						textI18nKey: t('components.footer.bottomLinks.privacyPolicy'),
						url: 'https://sealos.io/docs/msa/privacy-policy',
					},
					{
						textI18nKey: t('components.footer.bottomLinks.cookiePolicy'),
						url: 'https://sealos.io/legal/cookie-policy',
					},
				],
				socialLinks: [
					{
						name: 'Github',
						brandColor: `#${siGithub.hex}`,
						icon: <SimpleIcon d={siGithub.path} />,
						url: 'https://github.com/labring/sealos',
					},
					{
						name: 'Discord',
						brandColor: `#${siDiscord.hex}`,
						icon: <SimpleIcon d={siDiscord.path} />,
						url: 'https://discord.gg/wdUn538zVP',
					},
					{
						name: 'X',
						brandColor: `#${siX.hex}`,
						icon: <SimpleIcon d={siX.path} />,
						url: 'https://x.com/Sealos_io',
					},
					{
						name: 'Youtube',
						brandColor: `#${siYoutube.hex}`,
						icon: <SimpleIcon d={siYoutube.path} />,
						url: 'https://www.youtube.com/@sealos_io',
					},
					{
						name: 'RSS',
						brandColor: `#${siRss.hex}`,
						icon: <SimpleIcon d={siRss.path} />,
						url: 'https://sealos.io/rss.xml',
					},
				],
			},
			blog: {
				categories: {
					zh: [
						'Kubernetes 教程',
						'Docker 容器技术',
						'DevOps 实践',
						'微服务架构',
						'数据库管理',
						'监控告警',
						'安全加固',
						'性能优化',
						'故障排查',
					],
					en: [
						'Kubernetes',
						'Docker',
						'DevOps',
						'Microservices',
						'Databases',
						'Monitoring',
						'Security',
						'Performance',
						'Troubleshooting',
					],
				} satisfies Record<string, string[]>,
				shareButtons: [
					{
						icon: <SimpleIcon d={siSinaweibo.path} />,
						textI18nKey: t('pages.blog.sharePosts.weibo'),
						linkTemplate: 'http://service.weibo.com/share/share.php?url={link}&title={title}',
					},
					{
						icon: <SimpleIcon d={siWechat.path} />,
						textI18nKey: t('pages.blog.sharePosts.wechat'),
						linkTemplate: '#',
						onClick: 'copy' as const,
					},
					{
						icon: <SimpleIcon d={siQq.path} />,
						textI18nKey: t('pages.blog.sharePosts.qq'),
						linkTemplate: 'http://connect.qq.com/widget/shareqq/index.html?url={link}&title={title}',
					},
					{
						icon: (
							<Icon
								src={LinkIcon}
								className='size-full'
							/>
						),
						textI18nKey: t('pages.blog.sharePosts.copyLink'),
						linkTemplate: '#',
						onClick: 'copy' as const,
					},
				],
			},
		},
	};
})();
