import { i18n } from '@/libs/legacy/utils/i18n';
import { redirect } from 'next/navigation';

export default function RootPage() {
	redirect(`/${i18n.defaultLanguage}`);
}
