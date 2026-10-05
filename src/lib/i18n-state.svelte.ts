import { goto } from '$app/navigation';
import { page } from '$app/state';
import type { ArticleTranslation } from '$lib/content/types';
import { extractLocaleFromUrl } from '$lib/paraglide/runtime';
import { languageSwitchPath } from '$lib/utils/localized-url';

export const locale = {
	get value(): string {
		return extractLocaleFromUrl(page.url) ?? 'en';
	},
};

export function setLocale(v: string): void {
	if (typeof window === 'undefined') return;
	const translations =
		page.route.id === '/articles/[slug]'
			? (page.data as { translations?: ArticleTranslation[] }).translations
			: undefined;
	void goto(languageSwitchPath(new URL(window.location.href), v, translations));
}
