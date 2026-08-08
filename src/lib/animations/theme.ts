import { AnimDuration, AnimDurationMs, AnimEasing, Theme } from '$lib/constants';
import type { ThemeMode } from '$lib/types';
import { prefersReducedMotion } from './reduce';

const VT_ID = 'fm-vt-stylesheet';
const CURVE = `cubic-bezier(${AnimEasing.out.join(', ')})`;

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

function injectVT(darkToLight: boolean): void {
	const css = `
		::view-transition-old(root), ::view-transition-new(root) {
			mix-blend-mode: normal !important;
		}
		::view-transition-old(root) {
			animation-duration: ${AnimDuration.theme}s !important;
			animation-timing-function: ${CURVE} !important;
			animation-fill-mode: forwards !important;
		}
		::view-transition-old(root) {
			animation-name: ${darkToLight ? 'vt-open' : 'vt-close'} !important;
		}
		@keyframes vt-open {
			from { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
			to   { clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%); }
		}
		@keyframes vt-close {
			from { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
			to   { clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%); }
		}
	`;

	const sheet = new CSSStyleSheet();
	sheet.replaceSync(css);
	(sheet as { id?: string }).id = VT_ID;

	// Remove previous dynamic stylesheet; adopt new one.
	document.adoptedStyleSheets = [
		...document.adoptedStyleSheets.filter((s) => (s as { id?: string }).id !== VT_ID),
		sheet,
	];
}

export function animateThemeToggle(_button: HTMLElement, callback: () => void): void {
	if (
		typeof document === 'undefined' ||
		!document.startViewTransition ||
		prefersReducedMotion()
	) {
		callback();
		return;
	}
	const isDark = document.firstElementChild?.getAttribute('data-theme') === 'dark';
	try {
		injectVT(isDark);
	} catch {
		// Older browsers may not support adoptedStyleSheets
		callback();
		return;
	}

	void document.startViewTransition(() => {
		callback();
		setTimeout(() => {
			document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
				(s) => (s as { id?: string }).id !== VT_ID,
			);
		}, AnimDurationMs.theme);
	});
}
