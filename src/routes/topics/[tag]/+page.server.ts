import { error } from '@sveltejs/kit';
import { getArticlesForTopic } from '$lib/content/queries.server';
import { extractLocaleFromUrl } from '$lib/paraglide/runtime';
import type { Language } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params, url }) => {
	const tag = decodeURIComponent(params.tag);
	const locale = (extractLocaleFromUrl(url) === 'vi' ? 'vi' : 'en') as Language;
	const articles = getArticlesForTopic(tag, locale);
	if (articles.length === 0) error(404, 'Topic not found');
	return { tag, articles };
};
