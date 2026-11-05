import { getTopicFacets } from '$lib/content/article-discovery';
import { getCatalogArticles } from '$lib/content/queries.server';
import { localeFromUrl } from '$lib/utils/localized-url';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const articles = getCatalogArticles(localeFromUrl(url));
	return { articles, topics: getTopicFacets(articles) };
};
