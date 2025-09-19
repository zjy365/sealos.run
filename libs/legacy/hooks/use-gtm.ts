'use client';

import { analyticsConfig } from '@/libs/legacy/config/analytics';
import {
	type ButtonActionType,
	type GTMEvent,
	gtmPush,
	trackButtonClick,
	trackCustomEvent,
	trackFormSubmission,
	trackPageView,
	trackVideoEvent,
} from '@/libs/legacy/utils/gtm';
import { useCallback } from 'react';

const defaultContext = 'website';

/**
 * Hook for GTM tracking functionality
 * Only tracks if GTM is enabled and available
 */
export function useGTM() {
	const isGTMEnabled = analyticsConfig.gtm?.enabled && analyticsConfig.gtm?.containerId;

	const trackEvent = useCallback(
		(event: GTMEvent) => {
			if (isGTMEnabled) {
				gtmPush(event);
			}
		},
		[isGTMEnabled],
	);

	const trackButton = useCallback(
		(
			buttonText: string,
			location: string,
			actionType: ButtonActionType,
			actionTarget: string = '',
			additionalData?: Record<string, any>,
		) => {
			if (isGTMEnabled) {
				trackButtonClick(
					additionalData?.context || defaultContext,
					buttonText,
					location,
					actionType,
					actionTarget,
					additionalData,
				);
			}
		},
		[isGTMEnabled],
	);

	const trackVideo = useCallback(
		(
			action: 'play' | 'pause' | 'complete' | 'seek',
			title: string,
			url: string,
			additionalData?: Record<string, any>,
		) => {
			if (isGTMEnabled) {
				trackVideoEvent(
					additionalData?.context || defaultContext,
					action,
					title,
					url,
					additionalData?.videoPosition,
				);
			}
		},
		[isGTMEnabled],
	);

	const trackForm = useCallback(
		(formName: string, location: string, success: boolean = true, additionalData?: Record<string, any>) => {
			if (isGTMEnabled) {
				trackFormSubmission(additionalData?.context || defaultContext, formName, location, success);
			}
		},
		[isGTMEnabled],
	);

	const trackPage = useCallback(
		(path: string, additionalData?: Record<string, any>) => {
			if (isGTMEnabled) {
				trackPageView(additionalData?.context || defaultContext, path, additionalData?.pageTitle);
			}
		},
		[isGTMEnabled],
	);

	const trackCustom = useCallback(
		(eventName: string, data: Record<string, any>, additionalData?: Record<string, any>) => {
			if (isGTMEnabled) {
				trackCustomEvent(additionalData?.context || defaultContext, eventName, data);
			}
		},
		[isGTMEnabled],
	);

	return {
		isEnabled: isGTMEnabled,
		trackEvent,
		trackButton,
		trackVideo,
		trackForm,
		trackPage,
		trackCustom,
	};
}
