import { goto } from '$app/navigation';
import { page } from '$app/state';
import { getLocale } from '$lib/paraglide/runtime';

export const locale = {
	get value(): string {
		// Accessing page.url reactively binds this getter to page navigation
		return page.url ? getLocale() : 'en';
	},
};

export function getLocalizedPath(path: string, targetLocale: string): string {
	const isVi = path === '/vi' || path.startsWith('/vi/');
	const cleanPath = isVi ? path.substring(3) || '/' : path;
	if (targetLocale === 'vi') {
		return cleanPath === '/' ? '/vi' : `/vi${cleanPath}`;
	}
	return cleanPath;
}

export function setLocale(v: string): void {
	if (typeof window === 'undefined') return;
	const targetPath = getLocalizedPath(window.location.pathname, v);
	goto(targetPath);
}
