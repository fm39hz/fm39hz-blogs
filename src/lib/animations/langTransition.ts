import { animate } from 'motion/mini';
import { ANIM_DURATION, AnimEasing } from '$lib/constants';

export function animateLangSwitch(container: HTMLElement, currentLang: string): void {
	const entering: HTMLElement[] = [];
	const leaving: HTMLElement[] = [];

	for (let idx = 0; idx < container.children.length; idx++) {
		const el = container.children[idx] as HTMLElement;
		if (el.getAttribute('data-lang') === currentLang) {
			entering.push(el);
		} else {
			leaving.push(el);
		}
	}

	if (entering.length === 0) return;

	// Pages slide: leaving slides left, entering slides in from right
	const fadeOut = leaving.map(
		(el) =>
			animate(
				el,
				{ x: [0, -10], opacity: [1, 0] },
				{ duration: ANIM_DURATION / 2, ease: AnimEasing.EASE_OUT_QUART },
			).finished,
	);

	void Promise.all(fadeOut).then(() => {
		for (const el of leaving) el.style.display = 'none';
		for (const el of entering) {
			el.style.display = 'block';
			el.style.opacity = '0';
			el.style.transform = 'translateX(10px)';
		}
		for (const el of entering) {
			animate(
				el,
				{ x: [10, 0], opacity: [0, 1] },
				{ duration: ANIM_DURATION, ease: AnimEasing.EASE_OUT_QUART },
			);
		}
	});
}
