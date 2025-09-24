import { getTranslations } from 'next-intl/server';
import {
	type BottomLink,
	createDefaultBottomLinks,
	createDefaultMenuItems,
	DEFAULT_SOCIAL_LINKS,
	type MenuItem,
	type SocialLink,
} from './defaults';

interface FooterProps {
	title?: string;
	tagline?: string;
	menuItems?: MenuItem[];
	copyright?: string;
	bottomLinks?: BottomLink[];
	socialLinks?: SocialLink[];
}

export async function Footer({
	title,
	tagline,
	menuItems,
	copyright,
	bottomLinks,
	socialLinks = DEFAULT_SOCIAL_LINKS,
}: FooterProps) {
	const t = await getTranslations('components.footer');

	const footerTitle = title || t('title');
	const footerTagline = tagline || t('tagline');
	const footerCopyright = copyright || t('copyright');

	const defaultMenuItems = await createDefaultMenuItems(t);
	const defaultBottomLinks = await createDefaultBottomLinks(t);

	const finalMenuItems = menuItems || defaultMenuItems;
	const finalBottomLinks = bottomLinks || defaultBottomLinks;
	return (
		<section className='container mt-36 mb-8'>
			<div className='grid grid-cols-2 gap-8 lg:grid-cols-7'>
				<div className='col-span-3 mb-8 lg:mb-0'>
					<div className='flex items-center gap-2 lg:justify-start'>
						<div className='text-xl font-semibold'>{footerTitle}</div>
					</div>
					<p className='mt-2 leading-relaxed text-gray-500'>{footerTagline}</p>
				</div>
				{finalMenuItems.map((section) => (
					<div key={section.title}>
						<h3 className='mb-4 leading-none font-medium uppercase'>{section.title}</h3>
						<ul className='space-y-4'>
							{section.links.map((link) => (
								<li
									key={link.text}
									className='text-sm leading-normal font-normal hover:underline'
								>
									<a href={link.url}>{link.text}</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<div className='mt-24 grid grid-cols-3 gap-4 border-t pt-8 text-sm font-medium text-gray-500'>
				<ul className='flex gap-4'>
					{finalBottomLinks.map((link) => (
						<li
							key={link.text}
							className='hover:text-primary underline'
						>
							<a href={link.url}>{link.text}</a>
						</li>
					))}
				</ul>

				<p className='text-center'>{footerCopyright}</p>

				<ul className='flex justify-end gap-12'>
					{socialLinks.map((link) => (
						<a
							key={link.icon.slug}
							href={link.url}
						>
							<li
								className='not-hover:text-foreground size-6 hover:text-[var(--brand-color)]'
								style={{ '--brand-color': `#${link.icon.hex}` }}
							>
								<svg
									className='h-full w-full'
									viewBox='0 0 24 24'
									stroke='none'
									fill='currentColor'
									xmlns='http://www.w3.org/2000/svg'
								>
									<title>{link.icon.title}</title>
									<path d={link.icon.path} />
								</svg>
							</li>
						</a>
					))}
				</ul>
			</div>
		</section>
	);
}
