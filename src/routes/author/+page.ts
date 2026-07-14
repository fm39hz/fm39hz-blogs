import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PostMeta } from '$lib/types';
import { parseLang } from '$lib/utils/slug';
import type { PageLoad } from './$types';

export interface AuthorPageEntry {
	lang: string;
	component: Component;
	metadata: PostMeta;
}

export const load: PageLoad = async () => {
	const modules = import.meta.glob<{ default: Component; metadata: PostMeta }>(
		'/src/content/pages/author.*.md',
	);

	const entries = await Promise.all(
		Object.entries(modules).map(async ([path, importFn]) => {
			const mod = await importFn();
			const fileName = path.split('/').pop()!;
			return {
				lang: parseLang(fileName),
				component: mod.default,
				metadata: mod.metadata,
			};
		}),
	);

	if (entries.length === 0) {
		error(404, 'Author biography page not found');
	}

	return {
		entries,
	};
};
