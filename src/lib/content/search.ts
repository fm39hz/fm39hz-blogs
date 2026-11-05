import type { PostMeta } from '$lib/types';
import { filterArticles } from './article-discovery';

export function searchArticles<T extends { metadata: PostMeta }>(
	articles: T[],
	query: string,
): T[] {
	return filterArticles(articles, { query, tags: [] });
}
