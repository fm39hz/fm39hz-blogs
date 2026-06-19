import { animateThemeToggle, applyTheme, getStoredTheme } from '$lib/animations/theme';
import { Theme } from '$lib/constants';
import type { ThemeMode } from '$lib/types';

export function initTheme(): ThemeMode {
	if (typeof document === 'undefined') return Theme.DARK;
	const mode = getStoredTheme();
	applyTheme(mode);
	return mode;
}

export function toggleTheme(current: ThemeMode): ThemeMode {
	const btn = document.getElementById('theme-btn');
	if (!btn) return current;
	const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
	animateThemeToggle(btn, () => applyTheme(next));
	return next;
}
