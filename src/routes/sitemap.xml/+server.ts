import cfg from '$lib/config';
import { getAllPublicArticles } from '$lib/content/queries.server';
import { LANGUAGES } from '$lib/locale';
import { getUniqueTags } from '$lib/tags';
import { getLocalizedPath } from '$lib/utils/localized-url';
import { articleUrl, siteUrl } from '$lib/utils/site';
import { sitemapXml } from '$lib/utils/xml';

export const prerender = true;

export const GET = () => {
	const allPosts = getAllPublicArticles();
	const urls = LANGUAGES.flatMap((lang) => {
		const page = (path: string) => siteUrl(getLocalizedPath(path, lang));
		const posts = allPosts.filter((post) => post.lang === lang);
		return [
			page('/'),
			page('/articles'),
			page('/author'),
			page('/topics'),
			...(cfg.features.showArchives ? [page('/archives')] : []),
			...posts.map((post) => articleUrl(post.slug, lang)),
			...getUniqueTags(allPosts).map((tag) => page(`/topics/${tag.tag}`)),
		];
	});

	return new Response(sitemapXml(urls), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
