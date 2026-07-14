import cfg from '$lib/config';
import { loadPosts, type PostEntry } from '$lib/data/server';
import type { PostMeta } from '$lib/types';

export function postFilter({ metadata }: { metadata: PostMeta }): boolean {
	const margin = cfg.posts.scheduledPostMargin;
	const isPublished = Date.now() > new Date(metadata.pubDatetime).getTime() - margin;
	return !metadata.draft && (import.meta.env.DEV || isPublished);
}

export function getSortedPosts(posts: { slug: string; metadata: PostMeta }[]) {
	return posts.filter(postFilter).sort((a, b) => {
		const aDate = a.metadata.modDatetime ?? a.metadata.pubDatetime;
		const bDate = b.metadata.modDatetime ?? b.metadata.pubDatetime;
		return new Date(bDate).getTime() - new Date(aDate).getTime();
	});
}

export interface PostGroup {
	slug: string;
	defaultEntry: { slug: string; metadata: PostMeta };
	entries: { slug: string; metadata: PostMeta }[];
	hasMultiLang: boolean;
}

export function groupPostsBySlug(posts: { slug: string; metadata: PostMeta }[]): PostGroup[] {
	const map = new Map<string, { slug: string; metadata: PostMeta }[]>();
	for (const post of posts) {
		const slug = post.slug;
		if (!map.has(slug)) map.set(slug, []);
		map.get(slug)!.push(post);
	}
	return Array.from(map.entries()).map(([slug, entries]) => {
		const hasMultiLang = entries.length > 1;
		const defaultEntry =
			entries.find((e) => !e.metadata.lang || e.metadata.lang === 'en') ?? entries[0];
		return { slug, defaultEntry, entries, hasMultiLang };
	});
}

export interface ArchiveYearGroup {
	year: string;
	monthGroups: {
		month: number;
		posts: { slug: string; metadata: PostMeta }[];
	}[];
}

export function groupPostsByYearAndMonth(
	posts: { slug: string; metadata: PostMeta }[],
): ArchiveYearGroup[] {
	const years: Record<string, { month: number; posts: typeof posts }[]> = {};
	for (const post of posts) {
		const d = new Date(post.metadata.pubDatetime);
		const y = String(d.getFullYear());
		const m = d.getMonth() + 1;
		if (!years[y]) years[y] = [];
		let mg = years[y].find((g) => g.month === m);
		if (!mg) {
			mg = { month: m, posts: [] };
			years[y].push(mg);
		}
		mg.posts.push(post);
	}
	for (const y of Object.keys(years)) {
		years[y].sort((a, b) => b.month - a.month);
	}
	return Object.entries(years)
		.sort(([a], [b]) => Number(b) - Number(a))
		.map(([year, monthGroups]) => ({ year, monthGroups }));
}

export function getDisplaySortedPosts(): PostEntry[] {
	const allPosts = loadPosts();
	const groups = groupPostsBySlug(allPosts);
	const displayPosts = groups.map((g) => g.defaultEntry);
	return getSortedPosts(displayPosts);
}
