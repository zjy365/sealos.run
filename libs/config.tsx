import 'server-only';
import { Globe } from 'lucide-react';
import { siDiscord, siGithub, siRss, siX, siYoutube } from 'simple-icons';
import { SimpleIcon } from './components/ui/SimpleIcon';

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
				getStartedLink: 'https://usw.sealos.io/?openapp=system-brain',
				communityItems: [
					{
						name: 'discord',
						icon: <SimpleIcon d={siDiscord.path} />,
						titleI18nKey: t('components.navbar.community.discord.title'),
						descriptionI18nKey: t('components.navbar.community.discord.description'),
						link: 'https://discord.gg/kWqbpstw6M',
					},
					{
						name: 'twitter',
						icon: <SimpleIcon d={siX.path} />,
						titleI18nKey: t('components.navbar.community.twitter.title'),
						descriptionI18nKey: t('components.navbar.community.twitter.description'),
						link: 'https://x.com/Sealos_io',
					},
					{
						name: 'community',
						icon: <Globe className='size-full' />,
						titleI18nKey: t('components.navbar.community.community.title'),
						descriptionI18nKey: t('components.navbar.community.community.description'),
						link: 'https://github.com/labring/sealos',
					},
				],
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
		},
	};
})();
