/**
 * Where an article's "Go back" link points: the in-app page the reader came
 * from (home, a topic, search results with their query, another article),
 * else the article list. Moves inside the same article (TOC anchor jumps,
 * language switches) are not an origin, so the earlier origin is kept.
 */

/** The parts of SvelteKit's `NavigationTarget` this policy reads. */
export type NavigationOrigin = {
	url: URL;
	route: { id: string | null };
	params: Partial<Record<string, string>> | null;
};

const ARTICLE_ROUTE = '/articles/[slug]';

/** Path to return to, or `null` when `from` is not an in-app origin for `slug`. */
export function arrivalPath(
	from: NavigationOrigin | null,
	slug: string | undefined,
): string | null {
	if (!from?.route.id) return null;
	if (from.route.id === ARTICLE_ROUTE && from.params?.slug === slug) return null;
	return `${from.url.pathname}${from.url.search}`;
}
