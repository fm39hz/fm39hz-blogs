import cfg from '$lib/config';

export const prerender = true;

export const GET = () => {
	const modules = import.meta.glob('/src/content/posts/*.md', { eager: true });
	const slugs = Object.keys(modules).map((p) => p.split('/').pop()!.replace('.md', ''));

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${cfg.site.url}</loc></url>
  <url><loc>${cfg.site.url}/posts</loc></url>
  <url><loc>${cfg.site.url}/about</loc></url>
  ${slugs.map((s) => `  <url><loc>${cfg.site.url}/posts/${s}</loc></url>`).join('\n')}
</urlset>`.trim();

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
