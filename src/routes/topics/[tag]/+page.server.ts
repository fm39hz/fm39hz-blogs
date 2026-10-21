import { error } from '@sveltejs/kit';
import { getArticlesForTopic } from '$lib/content/queries.server';
import { localeFromUrl } from '$lib/utils/localized-url';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params, url }) => {
	const tag = decodeURIComponent(params.tag);
	const locale = localeFromUrl(url);
	const articles = getArticlesForTopic(tag, locale);
	if (articles.length === 0) error(404, 'Topic not found');
	return { tag, articles };
};
