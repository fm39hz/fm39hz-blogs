import { Theme } from '$lib/constants';
import type { ThemeMode } from '$lib/types';
import { prefersReducedMotion } from './reduce';

export function getStoredTheme(): ThemeMode {
	if (typeof localStorage === 'undefined') return Theme.DARK;
	const stored = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	if (stored === Theme.LIGHT) return Theme.LIGHT;
	if (stored === Theme.DARK) return Theme.DARK;
	return prefersDark ? Theme.DARK : Theme.LIGHT;
}

export function applyTheme(mode: ThemeMode): void {
	document.firstElementChild?.setAttribute('data-theme', mode);
	localStorage.setItem('theme', mode);
}

export function animateThemeToggle(callback: () => void): void {
	if (
		typeof document === 'undefined' ||
		!document.startViewTransition ||
		prefersReducedMotion()
	) {
		callback();
		return;
	}
	void document.startViewTransition(callback);
}
