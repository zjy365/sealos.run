'use client';

import { AnimatePresence, motion } from 'motion/react';
import { FeaturesScene } from '../components/FeaturesScene';
import { Features } from '../components/FeaturesScene/Features';
import { aiproxyConfig, databaseConfig, devboxConfig, launchpadConfig, ossConfig } from '../utils/features-config';

interface FeaturesSectionClientProps {
	activeBoxIndex: number | null;
}

export function FeaturesSectionClient({ activeBoxIndex }: FeaturesSectionClientProps) {
	const renderFeatures = () => {
		switch (activeBoxIndex) {
			case 0:
				return <Features config={launchpadConfig} />;
			case 1:
				return <Features config={devboxConfig} />;
			case 2:
				return <Features config={databaseConfig} />;
			case 3:
				return <Features config={aiproxyConfig} />;
			case 4:
				return <Features config={ossConfig} />;
			default:
				return <Features config={launchpadConfig} />;
		}
	};

	return (
		<div className='flex w-full flex-row items-start gap-16'>
			<div className='shrink-0'>
				<FeaturesScene activeBoxIndex={activeBoxIndex} />
			</div>
			<div className='relative flex-1'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeBoxIndex ?? 0}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						{renderFeatures()}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
