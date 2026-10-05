import { translatedFragment } from '../content/policy';
import type { ArticleTranslation } from '../content/types';
import { extractLocaleFromUrl, localizeUrl } from '../paraglide/runtime';

export function getLocalizedPath(path: string, targetLocale: string): string {
	const url = localizeUrl(new URL(path, 'https://locale.invalid'), {
		locale: targetLocale === 'vi' ? 'vi' : 'en',
	});
	return `${url.pathname}${url.search}${url.hash}`;
}

export function articlePath(slug: string, lang: string): string {
	return getLocalizedPath(`/articles/${slug}`, lang);
}

/** Pure navigation policy; undefined translations means a normal UI page. */
export function languageSwitchPath(
	currentUrl: URL,
	targetLocale: string,
	translations?: ArticleTranslation[],
): string {
	const url = new URL(currentUrl);
	if (translations) {
		const currentLocale = extractLocaleFromUrl(url) ?? 'en';
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
