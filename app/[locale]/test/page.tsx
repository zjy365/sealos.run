import { getTranslations } from 'next-intl/server';
export default async function Page() {
	const t = await getTranslations();

	return <span>{t('test')}</span>;
}
