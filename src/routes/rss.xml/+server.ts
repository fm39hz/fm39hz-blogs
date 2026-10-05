import { getCatalogArticles } from '$lib/content/queries.server';
import { articleUrl } from '$lib/utils/site';
import { rssXml } from '$lib/utils/xml';

export const prerender = true;

export const GET = () => {
	const articles = getCatalogArticles('en');

	const xml = rssXml(
		articles.map((p) => ({
			title: p.metadata.title,
			description: p.metadata.description,
			url: articleUrl(p.slug, p.lang),
			date: p.metadata.modDatetime ?? p.metadata.pubDatetime,
		})),
	);

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
