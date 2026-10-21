import { Theme } from '$lib/constants';
import type { ThemeMode } from '$lib/types';

/**
 * The only module that writes to <html>. That element sits outside the Svelte
 * tree and Svelte has no `<svelte:html>`, so its attributes cannot be rendered
 * from a template:
 *   - lang / dir: the server renders them; client-side locale switches update them here.
 *   - data-theme: app.html sets it before hydration (no flash); toggles update it here.
 */

const root = () => document.documentElement;

export function setRootLocale(lang: string, dir: 'ltr' | 'rtl'): void {
	root().lang = lang;
	root().dir = dir;
}

/** Theme app.html applied before hydration — the single source for the initial value. */
export function rootTheme(): ThemeMode {
	return root().dataset.theme === Theme.LIGHT ? Theme.LIGHT : Theme.DARK;
}

export function setRootTheme(mode: ThemeMode): void {
	root().dataset.theme = mode;
}
