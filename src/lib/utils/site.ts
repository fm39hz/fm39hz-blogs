import cfg from '$lib/config';
import { articlePath } from './localized-url';

/** Absolute public URL. Bare/relative path or already-absolute. Empty → site root. */
export function siteUrl(pathOrUrl = ''): string {
	if (!pathOrUrl) return cfg.site.url.replace(/\/$/, '');
	if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
	const base = cfg.site.url.replace(/\/$/, '');
	const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
	return `${base}${path}`;
}

export function articleUrl(slug: string, lang = 'en'): string {
	return siteUrl(articlePath(slug, lang));
}
