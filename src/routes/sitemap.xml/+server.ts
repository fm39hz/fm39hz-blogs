import { loadPosts } from '$lib/server';
import { sitemapXml } from '$lib/xml';
import cfg from '$lib/config';

export const prerender = true;

export const GET = async () => {
	const allPosts = loadPosts();
	const slugs = [...new Set(allPosts.map((p) => p.slug))];
	const urls = [
		cfg.site.url,
		`${cfg.site.url}/posts`,
		`${cfg.site.url}/about`,
		...slugs.map((s) => `${cfg.site.url}/posts/${s}`),
	];

	return new Response(sitemapXml(urls), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
