import cfg from '$lib/config';
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
