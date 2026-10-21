import { getHomepageArticles } from '$lib/content/queries.server';
import { localeFromUrl } from '$lib/utils/localized-url';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const locale = localeFromUrl(url);
	const articles = getHomepageArticles(locale);
	return {
		featured: articles.filter((article) => article.metadata.featured),
		recent: articles.filter((article) => !article.metadata.featured),
	};
};
