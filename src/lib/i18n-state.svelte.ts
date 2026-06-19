import { Lang } from '$lib/constants';

function load(): string {
	if (typeof localStorage === 'undefined') return Lang.EN;
	return localStorage.getItem('locale') ?? Lang.EN;
}

function save(v: string): void {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem('locale', v);
	document.documentElement.lang = v;
}

export const locale = $state({ value: load() });

export function setLocale(v: string): void {
	locale.value = v;
	save(v);
}
