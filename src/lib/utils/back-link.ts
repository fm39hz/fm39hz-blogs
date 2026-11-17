/**
 * Where an article's "Go back" link points: the in-app page outside the
 * article route that the reader came from. Article-to-article navigation is
 * internal traversal, so series links and browser history keep that meaning.
 */

/** The parts of SvelteKit's `NavigationTarget` this policy reads. */
export type NavigationOrigin = {
	url: URL;
	route: { id: string | null };
};

const ARTICLE_ROUTE = '/articles/[slug]';

/** Path to return to, or `null` when `from` is not an in-app entry surface. */
export function arrivalPath(from: NavigationOrigin | null): string | null {
	if (!from?.route.id || from.route.id === ARTICLE_ROUTE) return null;
	return `${from.url.pathname}${from.url.search}`;
}
