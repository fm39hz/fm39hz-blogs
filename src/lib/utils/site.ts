import cfg from '$lib/config';
import { BASE_LANGUAGE, type Language } from '$lib/locale';
import { articlePath } from './localized-url';

/** Absolute public URL. Bare/relative path or already-absolute. Empty → site origin. */
export function siteUrl(pathOrUrl = ''): string {
	return pathOrUrl ? new URL(pathOrUrl, cfg.site.url).href : new URL(cfg.site.url).origin;
}

export function articleUrl(slug: string, lang: Language = BASE_LANGUAGE): string {
	return siteUrl(articlePath(slug, lang));
}
