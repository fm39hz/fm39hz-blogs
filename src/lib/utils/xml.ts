import cfg from '$lib/config';

export function rssXml(
	items: { title: string; description: string; url: string; date: string }[],
): string {
	return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(cfg.site.title)}</title>
  <description>${esc(cfg.site.description)}</description>
  <link>${cfg.site.url}</link>
  <atom:link href="${cfg.site.url}/rss.xml" rel="self" type="application/rss+xml"/>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${items
		.map(
			(i) => `  <item>
    <title>${esc(i.title)}</title>
    <description>${esc(i.description)}</description>
    <link>${i.url}</link>
    <guid>${i.url}</guid>
    <pubDate>${new Date(i.date).toUTCString()}</pubDate>
  </item>`,
		)
		.join('\n')}
</channel>
</rss>`.trim();
}

export function sitemapXml(urls: string[]): string {
	return `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`.trim();
}

export function esc(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
