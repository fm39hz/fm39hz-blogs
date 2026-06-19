import { animate } from 'motion';
import { AnimEasing, THEME_TRANSITION_DURATION, Theme } from '$lib/constants';
import type { ThemeMode } from '$lib/types';

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

export function animateThemeToggle(button: HTMLElement, callback: () => void): void {
	const rect = button.getBoundingClientRect();
	const originX = ((rect.left + rect.width / 2) / innerWidth) * 100;
	const originY = ((rect.top + rect.height / 2) / innerHeight) * 100;
	const easing = AnimEasing.EASE_OUT_QUART;

	const oldBackground = getComputedStyle(document.documentElement)
		.getPropertyValue('--bg')
		.trim();
	callback();

	const overlay = document.createElement('div');
	overlay.style.cssText = `position:fixed;inset:0;z-index:9999;pointer-events:none;background:${oldBackground};clip-path:circle(150% at ${originX}% ${originY}%)`;
	document.body.appendChild(overlay);

	animate(
		overlay,
		{ clipPath: `circle(0% at ${originX}% ${originY}%)` },
		{ duration: THEME_TRANSITION_DURATION, ease: easing },
	).finished.then(() => overlay.remove());
}
