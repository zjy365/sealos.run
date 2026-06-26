'use client';

import Script from 'next/script';
import React from 'react';
import { usePathname } from '@/libs/i18n/navigation';

const BAIDU_ANALYTICS_ID = 'd8e8ecf669c47dc2512d3f1417e761f9';

type BaiduAnalyticsCommand = [string, ...Array<string | number>];

declare global {
	interface Window {
		_hmt?: BaiduAnalyticsCommand[];
	}
}

function trackPageview(pathname: string) {
	window._hmt = window._hmt || [];
	window._hmt.push(['_trackPageview', `${pathname}${window.location.search}`]);
}

export function BaiduAnalytics() {
	const pathname = usePathname();
	const hasInitialPageviewRef = React.useRef(false);

	React.useEffect(() => {
		if (!hasInitialPageviewRef.current) {
			hasInitialPageviewRef.current = true;
			return;
		}

		trackPageview(pathname);
	}, [pathname]);

	return (
		<Script
			id='baidu-analytics'
			strategy='afterInteractive'
		>
			{`
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?${BAIDU_ANALYTICS_ID}";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
`}
		</Script>
	);
}
