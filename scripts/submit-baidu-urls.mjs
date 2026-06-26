#!/usr/bin/env node

const SITE_URL = 'https://sealos.run';
const BAIDU_PUSH_SITE = 'sealos.run';
const BAIDU_PUSH_TOKEN = 's0WDXgyIGeCTyBzC';
const BAIDU_PUSH_ENDPOINT = 'http://data.zz.baidu.com/urls';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

async function submitBaiduUrls() {
	const urls = limitUrls(await getSitemapUrls(SITEMAP_URL), getSubmitLimit());

	if (urls.length === 0) {
		throw new Error(`no urls found in sitemap: ${SITEMAP_URL}`);
	}

	const endpoint = new URL(BAIDU_PUSH_ENDPOINT);
	endpoint.searchParams.set('site', BAIDU_PUSH_SITE);
	endpoint.searchParams.set('token', BAIDU_PUSH_TOKEN);

	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain',
		},
		body: urls.join('\n'),
	});

	const responseText = await response.text();
	let result;
	try {
		result = JSON.parse(responseText);
	} catch {
		result = responseText;
	}

	if (!response.ok) {
		throw new Error(`baidu url submit failed with ${response.status}: ${responseText}`);
	}

	return {
		endpoint: `${BAIDU_PUSH_ENDPOINT}?site=${BAIDU_PUSH_SITE}&token=***`,
		submittedCount: urls.length,
		result,
	};
}

async function getSitemapUrls(sitemapUrl) {
	const response = await fetch(sitemapUrl, {
		headers: {
			Accept: 'application/xml,text/xml,text/plain,*/*',
		},
	});

	if (!response.ok) {
		throw new Error(`failed to fetch sitemap ${sitemapUrl}: ${response.status}`);
	}

	const sitemap = await response.text();
	const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
		.map((match) => decodeXmlEntity(match[1]?.trim() ?? ''))
		.filter((url) => url.startsWith(`${SITE_URL}/`) || url === SITE_URL);

	return [...new Set(urls)];
}

function decodeXmlEntity(value) {
	return value
		.replaceAll('&amp;', '&')
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&quot;', '"')
		.replaceAll('&apos;', "'");
}

function getSubmitLimit() {
	const limit = process.env.BAIDU_SUBMIT_LIMIT;
	if (!limit) {
		return null;
	}

	const parsedLimit = Number.parseInt(limit, 10);
	if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
		throw new Error(`BAIDU_SUBMIT_LIMIT must be a positive integer, received: ${limit}`);
	}

	return parsedLimit;
}

function limitUrls(urls, limit) {
	if (limit === null) {
		return urls;
	}

	return urls.slice(0, limit);
}

if (import.meta.url === `file://${process.argv[1]}`) {
	submitBaiduUrls()
		.then(({ endpoint, result, submittedCount }) => {
			console.log(`submitted ${submittedCount} urls to ${endpoint}`);
			console.log(JSON.stringify(result, null, 2));
		})
		.catch((error) => {
			console.error(error instanceof Error ? error.message : String(error));
			process.exit(1);
		});
}
