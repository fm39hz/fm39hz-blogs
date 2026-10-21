import { prefersReducedMotion } from 'svelte/motion';
import { setRootTheme } from '$lib/document/root';
import type { ThemeMode } from '$lib/types';

/** Apply and persist; app.html reads the stored value on the next load. */
export function applyTheme(mode: ThemeMode): void {
	setRootTheme(mode);
	localStorage.setItem('theme', mode);
}

export function animateThemeToggle(callback: () => void): void {
	if (
		typeof document === 'undefined' ||
		!document.startViewTransition ||
		prefersReducedMotion.current
	) {
		callback();
		return;
	}
	void document.startViewTransition(callback);
}
