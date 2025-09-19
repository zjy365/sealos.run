import type { I18nConfig } from 'fumadocs-core/i18n';

export type languagesType = 'en' | 'zh-cn';

export const LANGUAGES: Array<languagesType> = ['en', 'zh-cn'];

export const i18n = {
	defaultLanguage: (process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en') as languagesType,
	languages: LANGUAGES,
	hideLocale: 'default-locale',
} as const satisfies I18nConfig;

export const locales: Array<{ name: string; locale: languagesType }> = [
	{ name: 'English', locale: 'en' },
	{ name: '简体中文', locale: 'zh-cn' },
];

export function getLanguageSlug(lang: string) {
	return lang === i18n.defaultLanguage ? '' : `/${lang}`;
}
