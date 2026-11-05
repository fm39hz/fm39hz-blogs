import { slugifyStr } from '$lib/tags';
import { asciiFold } from '$lib/utils/text';

export interface ArticleDiscoveryState {
	query: string;
	tags: string[];
}

export interface TopicFacet {
	tag: string;
	name: string;
	count: number;
}

interface SearchableArticle {
	metadata: {
		title: string;
		description: string;
		tags: string[];
	};
}

function uniqueTags(tags: string[]): string[] {
	return [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
}

function normalize(text: string): string {
	return asciiFold(text).toLowerCase();
}

export function parseDiscoveryState(
	params: URLSearchParams,
	fallbackTags: string[] = [],
): ArticleDiscoveryState {
	const tags = params.has('tag') ? params.getAll('tag') : fallbackTags;
	return {
		query: params.get('q')?.trim() ?? '',
		tags: uniqueTags(tags),
	};
}

export function serializeDiscoveryState(
	state: ArticleDiscoveryState,
	base = new URLSearchParams(),
): URLSearchParams {
	const params = new URLSearchParams(base);
	params.delete('q');
	params.delete('tag');

	const query = state.query.trim();
	if (query) params.set('q', query);
	for (const tag of uniqueTags(state.tags)) params.append('tag', tag);

	return params;
}

export function filterArticles<T extends SearchableArticle>(
	articles: T[],
	state: ArticleDiscoveryState,
): T[] {
	const terms = normalize(state.query).trim().split(/\s+/).filter(Boolean);
	const selectedTags = new Set(uniqueTags(state.tags));

	return articles.filter(({ metadata }) => {
		const text = normalize([metadata.title, metadata.description, ...metadata.tags].join(' '));
		const matchesQuery = terms.every((term) => text.includes(term));
		const matchesTopic =
			selectedTags.size === 0 ||
			metadata.tags.some((tag) => selectedTags.has(slugifyStr(tag)));

		return matchesQuery && matchesTopic;
	});
}

export function getTopicFacets<T extends SearchableArticle>(articles: T[]): TopicFacet[] {
	const facets = new Map<string, TopicFacet>();

	for (const { metadata } of articles) {
		const articleTags = new Map(metadata.tags.map((name) => [slugifyStr(name), name]));
		for (const [tag, name] of articleTags) {
			const current = facets.get(tag);
			facets.set(tag, { tag, name: current?.name ?? name, count: (current?.count ?? 0) + 1 });
		}
	}

	return [...facets.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
