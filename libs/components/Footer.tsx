import { getTranslations } from 'next-intl/server';
import type React from 'react';

export interface MenuLink {
	textI18nKey: string;
	url: string;
}

export interface MenuItem {
	titleI18nKey: string;
	links: MenuLink[];
}

export interface BottomLink {
	textI18nKey: string;
	url: string;
}

export interface SocialLink {
	name: string;
	brandColor: string;
	icon: React.ReactNode;
	url: string;
}

interface FooterConfig {
	titleI18nKey: string;
	taglineI18nKey: string;
	copyrightI18nKey: string;
	menuItems: MenuItem[];
	bottomLinks: BottomLink[];
	socialLinks: SocialLink[];
}

export async function Footer({ config }: { config: FooterConfig }) {
	const t = await getTranslations();
	const { titleI18nKey, taglineI18nKey, copyrightI18nKey, menuItems, bottomLinks, socialLinks } = config;

	const footerTitle = t(titleI18nKey);
	const footerTagline = t(taglineI18nKey);
	const footerCopyright = t(copyrightI18nKey);
	return (
		<section className='container mt-16 mb-8 sm:mt-24 md:mt-36'>
			<div className='grid grid-cols-4 gap-6 lg:grid-cols-7'>
				<div className='col-span-4 lg:col-span-3 lg:mb-0'>
					<div className='flex items-center gap-2 lg:justify-start'>
						<div className='text-xl font-semibold'>{footerTitle}</div>
					</div>
					<p className='mt-2 leading-relaxed text-gray-500'>{footerTagline}</p>
				</div>
				{menuItems.map((section) => (
					<div
						key={section.titleI18nKey}
						className='col-span-2 sm:col-span-1'
					>
						<h3 className='mb-4 leading-none font-medium uppercase'>{t(section.titleI18nKey)}</h3>
						<ul className='space-y-4'>
							{section.links.map((link) => (
								<li
									key={link.textI18nKey}
									className='text-sm leading-normal font-normal hover:underline'
								>
									<a
										href={link.url}
										target='_blank'
									>
										{t(link.textI18nKey)}
									</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<div className='mt-24 grid grid-cols-1 gap-4 border-t pt-8 text-sm font-medium text-gray-500 md:grid-cols-2 lg:grid-cols-3'>
				<ul className='flex gap-4'>
					{bottomLinks.map((link) => (
						<li
							key={link.textI18nKey}
							className='hover:text-primary underline'
						>
							<a
								href={link.url}
								target='_blank'
							>
								{t(link.textI18nKey)}
							</a>
						</li>
					))}
				</ul>

				<p className='text-start md:text-end lg:text-center'>{footerCopyright}</p>

				<ul className='col-span-1 flex justify-start gap-12 md:col-span-2 md:justify-end lg:col-span-1'>
					{socialLinks.map((link) => (
						<a
							key={link.name}
							href={link.url}
							target='_blank'
						>
							<li
								className='not-hover:text-foreground size-6 hover:text-[var(--brand-color)]'
								style={{ '--brand-color': link.brandColor }}
							>
								<div className='h-full w-full'>{link.icon}</div>
							</li>
						</a>
					))}
				</ul>
			</div>
		</section>
	);
}
