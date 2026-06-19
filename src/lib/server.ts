import type { PostMeta } from '$lib/types';

export function loadPosts() {
	const modules = import.meta.glob<{ metadata: PostMeta }>('/src/content/posts/*.md', {
		eager: true,
	});
	return Object.entries(modules).map(([path, mod]) => {
		const file = path.split('/').pop()!;
		const slug = file.replace(/\.(en|vi)\.md$/, '').replace(/\.md$/, '');
		return { slug, metadata: mod.metadata };
	});
}

export interface PageEntry {
	slug: string;
	lang: string;
	component: any;
	metadata: PostMeta;
}

export function loadPageEntries(slug: string): PageEntry[] {
	const modules = import.meta.glob<{ default: any; metadata: PostMeta }>(
		'/src/content/posts/*.md',
		{ eager: true },
	);
	return Object.entries(modules)
		.filter(([path]) => {
			const file = path.split('/').pop()!;
			const base = file.replace(/\.(en|vi)\.md$/, '').replace(/\.md$/, '');
			return base === slug;
		})
		.map(([path, mod]) => {
			const file = path.split('/').pop()!;
			const lang = (file.match(/\.(en|vi)\.md$/) ?? [])[1] ?? 'en';
			return { slug, lang, component: mod.default, metadata: mod.metadata };
		});
}

export function loadContentPages() {
	const modules = import.meta.glob<{ default: any; metadata: PostMeta }>(
		'/src/content/pages/*.md',
		{ eager: true },
	);
	return Object.entries(modules).map(([path, mod]) => {
		const file = path.split('/').pop()!;
		const slug = file.replace(/\.(en|vi)\.md$/, '').replace(/\.md$/, '');
		const lang = file.match(/\.(en|vi)\.md$/)?.[1] ?? 'en';
		return { slug, lang, component: mod.default, metadata: mod.metadata };
	});
}
