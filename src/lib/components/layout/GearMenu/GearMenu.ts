import { pageReveal } from '$lib/animations/page';

export function animatePageReveal(originEl: HTMLElement) {
	void pageReveal(originEl, 'page-down');
}
