import type { Component } from 'svelte';
import { Lang, MD_EXT_REGEX, SLUG_REGEX } from '$lib/constants';
import type { PostMeta } from '$lib/types';

function parseSlug(fileName: string): string {
	return fileName.replace(SLUG_REGEX, '').replace(MD_EXT_REGEX, '');
}

function parseLang(fileName: string, fallback = Lang.EN): string {
	return (fileName.match(SLUG_REGEX)?.[1] ?? fallback) as string;
}

export interface PostEntry {
	slug: string;
	metadata: PostMeta;
}

export function loadPosts(): PostEntry[] {
	const modules = import.meta.glob<{ metadata: PostMeta }>('/src/content/articles/*.md', {
		eager: true,
	});
	return Object.entries(modules).map(([path, mod]) => {
		const fileName = path.split('/').pop()!;
		return { slug: parseSlug(fileName), metadata: mod.metadata };
	});
}

export interface PageEntry {
	slug: string;
	lang: string;
	component: Component;
	metadata: PostMeta;
}

export function loadPageEntries(slug: string): PageEntry[] {
	const modules = import.meta.glob<{ default: Component; metadata: PostMeta }>(
		'/src/content/articles/*.md',
		{ eager: true },
	);
	return Object.entries(modules)
		.filter(([path]) => {
			const fileName = path.split('/').pop()!;
			return parseSlug(fileName) === slug;
		})
		.map(([path, mod]) => {
			const fileName = path.split('/').pop()!;
			return {
				slug,
				lang: parseLang(fileName),
				component: mod.default,
				metadata: mod.metadata,
			};
		});
}

export function loadContentPages(): PageEntry[] {
	const modules = import.meta.glob<{ default: Component; metadata: PostMeta }>(
		'/src/content/pages/*.md',
		{ eager: true },
	);
	return Object.entries(modules).map(([path, mod]) => {
		const fileName = path.split('/').pop()!;
		const slug = parseSlug(fileName);
		return { slug, lang: parseLang(fileName), component: mod.default, metadata: mod.metadata };
	});
}
