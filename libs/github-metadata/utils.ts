import 'server-only';

import React from 'react';
import type { AppStoreTemplate } from '@/libs/appstore/types';
import { githubMetadata } from './source';

export type GitHubMetadataEntry = (typeof githubMetadata)[number];

export type GitHubRepositoryStats = {
	forksCount: number;
	forksText: string;
	htmlUrl: string;
	repo: string;
	starsCount: number;
	starsText: string;
	watchersCount: number;
	watchersText: string;
};

export function normalizeGithubRepo(input: string) {
	const trimmed = input.trim();
	if (!trimmed) {
		return null;
	}

	const scpLikeMatch = trimmed.match(/^git@github\.com:(.+)$/u);
	const candidate = scpLikeMatch ? `https://github.com/${scpLikeMatch[1]}` : trimmed;
	const directRepoMatch = candidate.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?$/u);
	if (directRepoMatch) {
		const [, owner, name] = directRepoMatch;
		if (!owner || !name) {
			return null;
		}

		return `${owner.toLowerCase()}/${name.toLowerCase()}`;
	}

	let parsedUrl: URL;
	try {
		parsedUrl = new URL(candidate);
	} catch {
		return null;
	}

	const hostname = parsedUrl.hostname.toLowerCase();
	if (hostname !== 'github.com' && hostname !== 'www.github.com') {
		return null;
	}

	const [owner, repoWithOptionalSuffix] = parsedUrl.pathname.split('/').filter(Boolean);
	const repo = repoWithOptionalSuffix?.replace(/\.git$/u, '');
	if (!owner || !repo) {
		return null;
	}

	return `${owner.toLowerCase()}/${repo.toLowerCase()}`;
}

function formatGitHubCount(value?: number) {
	if (value == null) {
		return '-';
	}

	const formatted = new Intl.NumberFormat('en-US', {
		compactDisplay: 'short',
		maximumFractionDigits: value >= 10000 ? 1 : 0,
		notation: 'compact',
	}).format(value);

	return formatted.replace(/([KMBT])$/u, ' $1');
}

function formatGitHubStarsText(value?: number) {
	const countText = formatGitHubCount(value);
	if (countText === '-') {
		return countText;
	}

	return `${countText} Stars`;
}

function getNormalizedFullName(entry: GitHubMetadataEntry) {
	return entry.full_name.toLowerCase();
}

function normalizeGitHubMetadataEntry(entry: GitHubMetadataEntry): GitHubRepositoryStats {
	const starsCount = entry.stargazers_count ?? 0;
	const forksCount = entry.forks_count ?? 0;
	const watchersCount = entry.watchers_count ?? 0;

	return {
		forksCount,
		forksText: formatGitHubCount(forksCount),
		htmlUrl: entry.html_url,
		repo: getNormalizedFullName(entry),
		starsCount,
		starsText: formatGitHubStarsText(starsCount),
		watchersCount,
		watchersText: formatGitHubCount(watchersCount),
	};
}

export function getGitHubMetadataList() {
	return getGitHubMetadataListCached();
}

const getGitHubMetadataListCached = React.cache((): GitHubMetadataEntry[] => {
	return [...githubMetadata].sort((left, right) => left.full_name.localeCompare(right.full_name, 'en'));
});

const getGitHubMetadataByRepoCached = React.cache((repo: string): GitHubMetadataEntry | undefined => {
	const normalizedRepo = normalizeGithubRepo(repo);
	if (!normalizedRepo) {
		return undefined;
	}

	return getGitHubMetadataListCached().find((entry) => getNormalizedFullName(entry) === normalizedRepo);
});

export function getGitHubMetadataByRepo(repo: string) {
	return getGitHubMetadataByRepoCached(repo);
}

export function getGitHubRepositoryStats(repo: string) {
	return getGitHubRepositoryStatsCached(repo);
}

const getGitHubRepositoryStatsCached = React.cache((repo: string): GitHubRepositoryStats | undefined => {
	const entry = getGitHubMetadataByRepoCached(repo);
	if (!entry) {
		return undefined;
	}

	return normalizeGitHubMetadataEntry(entry);
});

export function getGitHubMetadataForTemplate(template: Pick<AppStoreTemplate, 'github'>) {
	if (!template.github) {
		return undefined;
	}

	return getGitHubMetadataByRepoCached(template.github);
}

export function getGitHubRepositoryStatsForTemplate(template: Pick<AppStoreTemplate, 'github'>) {
	if (!template.github) {
		return undefined;
	}

	return getGitHubRepositoryStatsCached(template.github);
}
