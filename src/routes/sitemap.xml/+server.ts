import cfg from '$lib/config';
import { loadPosts } from '$lib/data/server';
import { getUniqueTags } from '$lib/tags';
import { postFilter } from '$lib/utils';
import { articleUrl, siteUrl } from '$lib/utils/site';
import { sitemapXml } from '$lib/utils/xml';

export const prerender = true;

export const GET = () => {
	const allPosts = loadPosts().filter(postFilter);
	const urls = ['en', 'vi'].flatMap((lang) => {
		const prefix = lang === 'vi' ? '/vi' : '';
		const posts = allPosts.filter((post) => post.lang === lang);
		return [
			siteUrl(prefix || '/'),
			siteUrl(`${prefix}/articles`),
			siteUrl(`${prefix}/author`),
			siteUrl(`${prefix}/topics`),
			...(cfg.features.showArchives ? [siteUrl(`${prefix}/archives`)] : []),
			...posts.map((post) => articleUrl(post.slug, lang)),
			...getUniqueTags(allPosts).map((tag) => siteUrl(`${prefix}/topics/${tag.tag}`)),
		];
	});

	return new Response(sitemapXml(urls), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
