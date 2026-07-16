import cfg from '$lib/config';
import { loadPosts } from '$lib/data/server';
import { getUniqueTags } from '$lib/tags';
import { postFilter } from '$lib/utils';
import { articleUrl, siteUrl } from '$lib/utils/site';
import { sitemapXml } from '$lib/utils/xml';

export const prerender = true;

export const GET = () => {
	const allPosts = loadPosts().filter(postFilter);
	const slugs = [...new Set(allPosts.map((p) => p.slug))];
	const tags = getUniqueTags(allPosts);

	const urls = [
		siteUrl(),
		siteUrl('/articles'),
		siteUrl('/author'),
		siteUrl('/topics'),
		...(cfg.features.showArchives ? [siteUrl('/archives')] : []),
		...slugs.map((s) => articleUrl(s)),
		...tags.map((t) => siteUrl(`/topics/${t.tag}`)),
	];

	return new Response(sitemapXml(urls), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
