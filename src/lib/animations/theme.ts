import { AnimDuration, AnimDurationMs, AnimEasing, Theme } from '$lib/constants';
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

const VT_ID = 'fm-vt';
const CURVE = `cubic-bezier(${AnimEasing.out.join(', ')})`;

function injectVT(darkToLight: boolean): void {
	const old = document.getElementById(VT_ID);
	if (old) old.remove();

	const s = document.createElement('style');
	s.id = VT_ID;

	// Override UA defaults: disable crossfade, set mix-blend-mode to normal
	// so old snapshot fully blocks new where it's visible.
	// The clip-path on old determines the reveal: where old is clipped,
	// new shows through underneath.
	const base = `
		::view-transition-old(root), ::view-transition-new(root) {
			mix-blend-mode: normal !important;
		}
		::view-transition-old(root) {
			animation-duration: ${AnimDuration.theme}s !important;
			animation-timing-function: ${CURVE} !important;
			animation-fill-mode: forwards !important;
		}
	`;

	if (darkToLight) {
		s.textContent = `
			${base}
			::view-transition-old(root) {
				animation-name: vt-open !important;
			}
			@keyframes vt-open {
				from { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
				to   { clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%); }
			}
		`;
	} else {
		s.textContent = `
			${base}
			::view-transition-old(root) {
				animation-name: vt-close !important;
			}
			@keyframes vt-close {
				from { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
				to   { clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%); }
			}
		`;
	}
	document.head.appendChild(s);
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
	injectVT(isDark);
	void document.startViewTransition(() => {
		callback();
		setTimeout(() => document.getElementById(VT_ID)?.remove(), AnimDurationMs.theme);
	});
}
