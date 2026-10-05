import type { Component } from 'svelte';
import { contentLocale } from '$lib/content-language';
import type { PostMeta } from '$lib/types';
import { postFilter } from '$lib/utils/post';
import { parseSlug } from '$lib/utils/slug';

export interface PostEntry {
	slug: string;
	lang: string;
	metadata: PostMeta;
}

const metaModules = import.meta.glob<PostMeta>('/src/content/articles/*.md', {
	eager: true,
	import: 'metadata',
	query: '?metadata',
});

const pageModules = import.meta.glob<{ default: Component; metadata: PostMeta }>(
	'/src/content/articles/*.md',
);

const rawModules = import.meta.glob<string>('/src/content/articles/*.md', {
	query: '?raw',
	import: 'default',
});

function fileNameOf(path: string): string {
	return path.split('/').pop()!;
}

/** Unique article slugs (prerender entries). */
export function listArticleSlugs(lang?: string): string[] {
	return [
		...new Set(
			Object.entries(metaModules)
				.filter(([_, metadata]) => postFilter({ metadata }))
				.filter(
					([path, metadata]) =>
						!lang || contentLocale(fileNameOf(path), metadata.lang) === lang,
				)
				.map(([path]) => parseSlug(fileNameOf(path))),
		),
	];
}

/**
 * Loads metadata-only for all articles (lightweight list pages).
 */
export function loadPosts(): PostEntry[] {
	return Object.entries(metaModules).map(([path, metadata]) => ({
		slug: parseSlug(fileNameOf(path)),
		lang: contentLocale(fileNameOf(path), metadata.lang),
		metadata,
	}));
}

export interface PageEntry {
	slug: string;
	lang: string;
	component: Component;
	metadata: PostMeta;
	/** Source markdown with frontmatter (copy/export). */
	raw: string;
}

/**
 * Lazy load compiled markdown + raw source for one slug (code-split).
 */
export async function loadPageEntriesAsync(slug: string): Promise<PageEntry[]> {
	const matches = Object.entries(pageModules).filter(
		([path]) => parseSlug(fileNameOf(path)) === slug,
	);
	const results = await Promise.all(
		matches.map(async ([path, importFn]) => {
			const [mod, raw] = await Promise.all([
				importFn(),
				rawModules[path]?.() ?? Promise.resolve(''),
			]);
			const fileName = fileNameOf(path);
			return {
				slug,
				lang: contentLocale(fileName, mod.metadata.lang),
				component: mod.default,
				metadata: mod.metadata,
				raw: typeof raw === 'string' ? raw : '',
			};
		}),
	);
	return results.filter(postFilter);
}
