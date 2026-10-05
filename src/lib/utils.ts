import { selectLocalizedPosts, selectTranslation } from '$lib/content-language';
import { loadPosts, type PostEntry } from '$lib/data/server';
import type { PostMeta } from '$lib/types';
import { postFilter } from '$lib/utils/post';

export { postFilter } from '$lib/utils/post';

export function getSortedPosts<T extends { slug: string; metadata: PostMeta }>(posts: T[]): T[] {
	return posts.filter(postFilter).sort((a, b) => {
		const aDate = a.metadata.modDatetime ?? a.metadata.pubDatetime;
		const bDate = b.metadata.modDatetime ?? b.metadata.pubDatetime;
		return new Date(bDate).getTime() - new Date(aDate).getTime();
	});
}

export interface PostGroup {
	slug: string;
	defaultEntry: PostEntry;
	entries: PostEntry[];
	hasMultiLang: boolean;
}

export function groupPostsBySlug(posts: PostEntry[]): PostGroup[] {
	const map = new Map<string, PostEntry[]>();
	for (const post of posts) {
		const slug = post.slug;
		if (!map.has(slug)) map.set(slug, []);
		map.get(slug)!.push(post);
	}
	return Array.from(map.entries()).map(([slug, entries]) => {
		const hasMultiLang = entries.length > 1;
		const defaultEntry = selectTranslation(entries, 'en')!;
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

export function getDisplaySortedPosts(lang = 'en', strict = false): PostEntry[] {
	const posts = loadPosts().filter(postFilter);
	return getSortedPosts(selectLocalizedPosts(posts, lang, strict));
}
