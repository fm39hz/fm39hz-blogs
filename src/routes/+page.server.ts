import { getHomepageArticles } from '$lib/content/queries.server';
import { extractLocaleFromUrl } from '$lib/paraglide/runtime';
import type { Language } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const locale = (extractLocaleFromUrl(url) === 'vi' ? 'vi' : 'en') as Language;
	const articles = getHomepageArticles(locale);
	return {
		featured: articles.filter((article) => article.metadata.featured),
		recent: articles.filter((article) => !article.metadata.featured),
	};
};
