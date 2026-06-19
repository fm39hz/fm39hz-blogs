import { animate } from 'motion/mini';
import { AnimEasing } from '$lib/types';

export function animatePageReveal(originEl: HTMLElement) {
	const rect = originEl.getBoundingClientRect();
	const originX = ((rect.left + rect.width / 2) / innerWidth) * 100;
	const originY = ((rect.top + rect.height / 2) / innerHeight) * 100;
	const easing = AnimEasing.EASE_OUT_QUART;

	const overlay = document.createElement('div');
	overlay.style.cssText = `position:fixed;inset:0;z-index:9999;pointer-events:none;background:var(--bg);clip-path:circle(0% at ${originX}% ${originY}%)`;
	document.body.appendChild(overlay);

	void animate(
		overlay,
		{ clipPath: `circle(150% at ${originX}% ${originY}%)` },
		{ duration: 0.5, ease: easing },
	).finished.then(() => overlay.remove());
}
