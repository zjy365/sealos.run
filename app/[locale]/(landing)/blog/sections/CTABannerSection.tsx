import React from 'react';
import LandingOutlineButton from '@/libs/components/LandingOutlineButton';

export default function CTABannerSection() {
	return (
		<section className='bg-muted py-18'>
			<div className='container px-20'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='mb-3 text-2xl font-medium'>Sealos</h2>
						<p className='text-3xl font-semibold'>轻松实现复杂开发流程，让创意触手可及</p>
					</div>

					<LandingOutlineButton href='/'>立即体验</LandingOutlineButton>
				</div>
			</div>
		</section>
	);
}
