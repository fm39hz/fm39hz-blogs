import { error } from '@sveltejs/kit';
import { getTopicFacets } from '$lib/content/article-discovery';
import { getCatalogArticles } from '$lib/content/queries.server';
import { localeFromUrl } from '$lib/utils/localized-url';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = ({ params, url }) => {
	const tag = params.tag;
	const articles = getCatalogArticles(localeFromUrl(url));
	const topics = getTopicFacets(articles);
	const topic = topics.find((item) => item.tag === tag);
	if (!topic) error(404, 'Topic not found');
	return { tag, tagName: topic.name, articles, topics };
};
