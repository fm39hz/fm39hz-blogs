import dayjs from 'dayjs';
import cfg from '$lib/config';
import type { PostMeta } from '$lib/types';

export function formatDate(date: string, lang = 'en'): string {
	return dayjs(date).locale(lang).format('MMM D, YYYY');
}

export function postFilter({ metadata }: { metadata: PostMeta }): boolean {
	const isPublishTimePassed =
		Date.now() > new Date(metadata.pubDatetime).getTime() - cfg.posts.scheduledPostMargin;
	return !metadata.draft && (import.meta.env.DEV || isPublishTimePassed);
}

export function getSortedPosts(posts: { slug: string; metadata: PostMeta }[]) {
	return posts.filter(postFilter).sort((a, b) => {
		const aDate = a.metadata.modDatetime ?? a.metadata.pubDatetime;
		const bDate = b.metadata.modDatetime ?? b.metadata.pubDatetime;
		return new Date(bDate).getTime() - new Date(aDate).getTime();
	});
}

export interface PostEntry {
	slug: string;
	metadata: PostMeta;
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
		const defaultEntry =
			entries.find((e) => !e.metadata.lang || e.metadata.lang === 'en') ?? entries[0];
		return { slug, defaultEntry, entries, hasMultiLang };
	});
}

export function primaryPosts(posts: PostEntry[]): PostEntry[] {
	return groupPostsBySlug(posts).map((g) => g.defaultEntry);
}
