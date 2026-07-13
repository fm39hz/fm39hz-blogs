import { animate } from 'motion/mini';
import { AnimDuration, AnimEasing } from '$lib/constants';
import { prefersReducedMotion } from './reduce';

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
	duration = AnimDuration.scene,
): Promise<void> {
	if (prefersReducedMotion()) return Promise.resolve();

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

	const anim = animate(overlay, { clipPath: clips[0] }, { duration, ease: AnimEasing.out });
	return anim.finished.then(() => overlay.remove());
}

export function pageConceal(
	originEl: HTMLElement,
	dir: PageDir = 'book-close',
	duration = AnimDuration.page,
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

	if (prefersReducedMotion()) return Promise.resolve(overlay);

	const anim = animate(overlay, { clipPath: clips[1] }, { duration, ease: AnimEasing.out });
	return anim.finished.then(() => overlay);
}
