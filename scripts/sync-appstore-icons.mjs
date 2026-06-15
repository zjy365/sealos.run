#!/usr/bin/env node

import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), '..');

export async function syncAppstoreIcons({
	contentRoot = path.join(repoRoot, 'content'),
	publicRoot = path.join(repoRoot, 'public'),
} = {}) {
	const sourceDir = path.join(contentRoot, 'content/appstore/icons');
	const targetDir = path.join(publicRoot, 'appstore/icons');

	try {
		const sourceStats = await stat(sourceDir);
		if (!sourceStats.isDirectory()) {
			throw new Error(`appstore icons source is not a directory: ${sourceDir}`);
		}
	} catch (error) {
		if (error?.code === 'ENOENT') {
			const hasLocalReferences = await hasLocalAppstoreIconReferences(path.join(contentRoot, 'content/appstore'));
			if (!hasLocalReferences) {
				return {
					sourceDir,
					targetDir,
					copiedCount: 0,
					skipped: true,
					reason: 'no local appstore icon references found',
				};
			}

			throw new Error(`appstore icons source does not exist: ${sourceDir}`, {
				cause: error,
			});
		}

		throw error;
	}

	await rm(targetDir, { force: true, recursive: true });
	await mkdir(path.dirname(targetDir), { recursive: true });
	await cp(sourceDir, targetDir, { recursive: true });
	await writeFile(path.join(targetDir, '.gitignore'), '*\n!.gitignore\n', {
		encoding: 'utf8',
	});

	return {
		sourceDir,
		targetDir,
		copiedCount: await countFiles(targetDir),
	};
}

async function countFiles(targetDir) {
	let count = 0;
	const entries = await readdir(targetDir, { withFileTypes: true });

	for (const entry of entries) {
		const entryPath = path.join(targetDir, entry.name);
		if (entry.isDirectory()) {
			count += await countFiles(entryPath);
			continue;
		}

		if (entry.isFile() && entry.name !== '.gitignore') {
			count += 1;
		}
	}

	return count;
}

async function hasLocalAppstoreIconReferences(targetDir) {
	let entries;
	try {
		entries = await readdir(targetDir, { withFileTypes: true });
	} catch (error) {
		if (error?.code === 'ENOENT') {
			return false;
		}

		throw error;
	}

	for (const entry of entries) {
		const entryPath = path.join(targetDir, entry.name);
		if (entry.isDirectory()) {
			if (await hasLocalAppstoreIconReferences(entryPath)) {
				return true;
			}
			continue;
		}

		if (!entry.isFile() || !entry.name.endsWith('.mdx')) {
			continue;
		}

		const content = await readFile(entryPath, { encoding: 'utf8' });
		if (content.includes('/appstore/icons/')) {
			return true;
		}
	}

	return false;
}

if (process.argv[1] === scriptPath) {
	syncAppstoreIcons()
		.then(({ copiedCount, reason, skipped, sourceDir, targetDir }) => {
			if (skipped) {
				console.log(`skipped appstore icon sync: ${reason}`);
				return;
			}

			console.log(`synced ${copiedCount} appstore icon files from ${sourceDir} to ${targetDir}`);
		})
		.catch((error) => {
			console.error(error instanceof Error ? error.message : String(error));
			process.exit(1);
		});
}
