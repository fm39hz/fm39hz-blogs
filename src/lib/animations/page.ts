import { animate } from 'motion/mini';
import { AnimEasing } from '$lib/types';

type PageDir = 'book-open' | 'book-close' | 'page-down' | 'page-up';

const CLIP = {
	'book-open': ['inset(0% 50% 0% 50%)', 'inset(0% 0% 0% 0%)'],
	'book-close': ['inset(0% 0% 0% 0%)', 'inset(0% 50% 0% 50%)'],
	'page-down': ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
	'page-up': ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
} as const;

export function pageReveal(
	originEl: HTMLElement,
	dir: PageDir = 'book-open',
	duration = 0.5,
): Promise<void> {
	const rect = originEl.getBoundingClientRect();
	const originX = ((rect.left + rect.width / 2) / innerWidth) * 100;
	const originY = ((rect.top + rect.height / 2) / innerHeight) * 100;
	const clips = CLIP[dir];

	const overlay = document.createElement('div');
	overlay.style.cssText = [
		'position:fixed',
		'inset:0',
		'z-index:9999',
		'pointer-events:none',
		`background:var(--bg)`,
		`clip-path:${clips[1]}`,
		`transform-origin:${originX}% ${originY}%`,
	].join(';');
	document.body.appendChild(overlay);

	const anim = animate(
		overlay,
		{ clipPath: clips[0] },
		{ duration, ease: AnimEasing.EASE_OUT_QUART },
	);
	return anim.finished.then(() => overlay.remove());
}

export function pageConceal(
	originEl: HTMLElement,
	dir: PageDir = 'book-close',
	duration = 0.4,
): Promise<HTMLElement> {
	const rect = originEl.getBoundingClientRect();
	const originX = ((rect.left + rect.width / 2) / innerWidth) * 100;
	const originY = ((rect.top + rect.height / 2) / innerHeight) * 100;
	const clips = CLIP[dir];

	const overlay = document.createElement('div');
	overlay.style.cssText = [
		'position:fixed',
		'inset:0',
		'z-index:9999',
		'pointer-events:none',
		`background:var(--bg)`,
		`clip-path:${clips[0]}`,
		`transform-origin:${originX}% ${originY}%`,
	].join(';');
	document.body.appendChild(overlay);

	const anim = animate(
		overlay,
		{ clipPath: clips[1] },
		{ duration, ease: AnimEasing.EASE_OUT_QUART },
	);
	return anim.finished.then(() => overlay);
}
