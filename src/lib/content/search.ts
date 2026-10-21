import type { PostMeta } from '$lib/types';
import { asciiFold } from '$lib/utils/text';

function normalize(text: string): string {
	return asciiFold(text).toLowerCase();
}

export function searchArticles<T extends { metadata: PostMeta }>(
	articles: T[],
	query: string,
): T[] {
	const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
	return articles.filter(({ metadata }) => {
		const text = normalize([metadata.title, metadata.description, ...metadata.tags].join(' '));
		return terms.every((term) => text.includes(term));
	});
}
