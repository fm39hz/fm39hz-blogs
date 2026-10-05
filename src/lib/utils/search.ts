import type { PostMeta } from '../types';

function normalize(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[đĐ]/g, 'd')
		.toLowerCase();
}

export function searchPosts<T extends { metadata: PostMeta }>(posts: T[], query: string): T[] {
	const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
	return posts.filter(({ metadata }) => {
		const text = normalize([metadata.title, metadata.description, ...metadata.tags].join(' '));
		return terms.every((term) => text.includes(term));
	});
}
