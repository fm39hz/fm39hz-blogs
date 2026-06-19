import cfg from '$lib/config';
import type { PostMeta } from '$lib/types';

export const prerender = true;

export const GET = () => {
	const modules = import.meta.glob<{ metadata: PostMeta }>('/src/content/posts/*.md', {
		eager: true,
	});
	const posts = Object.entries(modules)
		.map(([path, mod]) => ({
			slug: path.split('/').pop()!.replace('.md', ''),
			metadata: mod.metadata,
		}))
		.filter((p) => !p.metadata.draft)
		.sort(
			(a, b) =>
				new Date(b.metadata.pubDatetime).getTime() -
				new Date(a.metadata.pubDatetime).getTime(),
		);

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${cfg.site.title}</title>
  <description>${cfg.site.description}</description>
  <link>${cfg.site.url}</link>
  <atom:link href="${cfg.site.url}/rss.xml" rel="self" type="application/rss+xml"/>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${posts
		.map(
			(p) => `
  <item>
    <title>${escapeXml(p.metadata.title)}</title>
    <description>${escapeXml(p.metadata.description)}</description>
    <link>${cfg.site.url}/posts/${p.slug}</link>
    <guid>${cfg.site.url}/posts/${p.slug}</guid>
    <pubDate>${new Date(p.metadata.pubDatetime).toUTCString()}</pubDate>
  </item>`,
		)
		.join('')}
</channel>
</rss>`.trim();

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};

function escapeXml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
