import { goto } from '$app/navigation';
import { page } from '$app/state';
import type { Language } from '$lib/locale';
import { languageSwitchPath, localeFromUrl } from '$lib/utils/localized-url';

export const locale = {
	get value(): Language {
		return localeFromUrl(page.url);
	},
};

export function setLocale(v: Language): void {
	if (typeof window === 'undefined') return;
	// Article pages expose their translations (App.PageData) for heading-aware switching.
	void goto(languageSwitchPath(page.url, v, page.data.translations));
}
