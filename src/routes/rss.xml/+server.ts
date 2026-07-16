import { loadPosts } from '$lib/data/server';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';
import { articleUrl } from '$lib/utils/site';
import { rssXml } from '$lib/utils/xml';

export const prerender = true;

export const GET = () => {
	const allPosts = loadPosts();
	const groups = groupPostsBySlug(allPosts);
	const displayPosts = groups.map((g) => g.defaultEntry);
	const sorted = getSortedPosts(displayPosts);

	const xml = rssXml(
		sorted.map((p) => ({
			title: p.metadata.title,
			description: p.metadata.description,
			url: articleUrl(p.slug),
			date: p.metadata.modDatetime ?? p.metadata.pubDatetime,
		})),
	);

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
