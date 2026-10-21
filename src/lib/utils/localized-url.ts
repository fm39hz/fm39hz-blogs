import { translatedFragment } from '../content/policy';
import type { ArticleTranslation } from '../content/types';
import { type Language, resolveLanguage } from '../locale';
import { extractLocaleFromUrl, localizeUrl } from '../paraglide/runtime';

/** Locale of a request/page URL (paraglide URL strategy), narrowed to `Language`. */
export function localeFromUrl(url: URL): Language {
	return resolveLanguage(extractLocaleFromUrl(url));
}

/**
 * Localized path in SvelteKit's canonical form (trailingSlash: 'never'):
 * paraglide maps `/` to `/vi/`, but the prerendered page is `/vi`.
 */
export function getLocalizedPath(path: string, targetLocale: Language): string {
	const url = localizeUrl(new URL(path, 'https://locale.invalid'), { locale: targetLocale });
	if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
		url.pathname = url.pathname.slice(0, -1);
	}
	return `${url.pathname}${url.search}${url.hash}`;
}

export function articlePath(slug: string, lang: Language): string {
	return getLocalizedPath(`/articles/${slug}`, lang);
}

/** Pure navigation policy; undefined translations means a normal UI page. */
export function languageSwitchPath(
	currentUrl: URL,
	targetLocale: Language,
	translations?: ArticleTranslation[],
): string {
	const url = new URL(currentUrl);
	if (translations) {
		const currentLocale = localeFromUrl(url);
		const current = translations.find((entry) => entry.lang === currentLocale);
		const target = translations.find((entry) => entry.lang === targetLocale);
		if (target) {
			url.hash = translatedFragment(
				url.hash,
				current?.metadata.headings ?? [],
				target.metadata.headings ?? [],
			);
		} else {
			url.pathname = '/articles';
			url.hash = '';
		}
	}
	return getLocalizedPath(`${url.pathname}${url.search}${url.hash}`, targetLocale);
}
