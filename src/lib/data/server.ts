import type { Component } from 'svelte';
import type { PostMeta } from '$lib/types';
import { parseLang, parseSlug } from '$lib/utils/slug';

export interface PostEntry {
	slug: string;
	metadata: PostMeta;
}

/**
 * Loads metadata-only for all articles (highly token-efficient and lightweight for list pages)
 */
export function loadPosts(): PostEntry[] {
	const modules = import.meta.glob<PostMeta>('/src/content/articles/*.md', {
		eager: true,
		import: 'metadata',
		query: '?metadata',
	});
	return Object.entries(modules).map(([path, metadata]) => {
		const fileName = path.split('/').pop()!;
		return { slug: parseSlug(fileName), metadata };
	});
}

export interface PageEntry {
	slug: string;
	lang: string;
	component: Component;
	metadata: PostMeta;
	/** Source markdown body with frontmatter (for copy/export). */
	raw: string;
}

/**
 * Lazily loads compiled Svelte markdown components for the matching slug asynchronously (enables true code-splitting)
 */
export async function loadPageEntriesAsync(slug: string): Promise<PageEntry[]> {
	const modules = import.meta.glob<{ default: Component; metadata: PostMeta }>(
		'/src/content/articles/*.md',
	);
	const rawModules = import.meta.glob<string>('/src/content/articles/*.md', {
		query: '?raw',
		import: 'default',
	});
	const matches = Object.entries(modules).filter(([path]) => {
		const fileName = path.split('/').pop()!;
		return parseSlug(fileName) === slug;
	});
	return await Promise.all(
		matches.map(async ([path, importFn]) => {
			const [mod, raw] = await Promise.all([
				importFn(),
				rawModules[path]?.() ?? Promise.resolve(''),
			]);
			const fileName = path.split('/').pop()!;
			return {
				slug,
				lang: parseLang(fileName),
				component: mod.default,
				metadata: mod.metadata,
				raw: typeof raw === 'string' ? raw : '',
			};
		}),
	);
}
