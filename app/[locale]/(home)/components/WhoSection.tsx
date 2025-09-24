import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { QuestionMarkIcon } from '@/libs/components/ui/sealos-icons';
import BackendDevImage from '../images/backend-dev.svg';
import FullStackTeamImage from '../images/full-stack-team.svg';
import MorePossibilitiesImage from '../images/more-possibilities.svg';

export async function WhoSection() {
	const t = await getTranslations('pages.home.who');

	return (
		<section className='container mt-36 mb-24'>
			<h2 className='flex items-baseline text-4xl font-medium'>
				<span>
					<span className='text-blue-600'>{t('title.who')}</span>
					<span> {t('title.isThisFor')}</span>
				</span>
				<QuestionMarkIcon className='ml-4 h-6 w-6 text-blue-600' />
			</h2>
			<div className='mt-2 text-gray-500'>{t('description')}</div>

			<div className='mt-10 flex items-stretch gap-6'>
				<div className='relative w-full flex-1'>
					<div className='absolute z-10 -mb-24 px-4'>
						<Image
							src={BackendDevImage}
							alt={t('targets.backendDeveloper.imageAlt')}
						/>
					</div>

					<div className='relative top-24 h-full bg-gray-100 px-12 py-8 pt-24 shadow-md'>
						<h3 className='text-xl font-semibold'>
							<span>{t('targets.backendDeveloper.title')}</span>
						</h3>
						<p className='mt-2'>{t('targets.backendDeveloper.description')}</p>
					</div>
				</div>

				<div className='relative w-full flex-1'>
					<div className='absolute right-0 z-10 -mb-24 px-4'>
						<Image
							src={FullStackTeamImage}
							alt={t('targets.fullStackTeam.imageAlt')}
						/>
					</div>

					<div className='relative top-24 h-full bg-gray-100 px-12 py-8 pt-24 shadow-md'>
						<h3 className='text-xl font-semibold'>
							<span>{t('targets.fullStackTeam.title')}</span>
						</h3>
						<p className='mt-2'>{t('targets.fullStackTeam.description')}</p>
					</div>
				</div>

				<div className='relative -bottom-24 h-full w-full flex-1'>
					<div className='flex h-full flex-col items-center justify-center gap-3 bg-gray-100 px-12 py-8 shadow-md'>
						<Image
							src={MorePossibilitiesImage}
							alt={t('targets.morePossibilities.imageAlt')}
						/>

						<h3 className='text-xl font-semibold text-gray-500'>{t('targets.morePossibilities.title')}</h3>
					</div>
				</div>
			</div>
		</section>
	);
}
