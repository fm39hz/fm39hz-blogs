import { animate } from 'motion';
import { ANIM_DURATION, Lang, AnimEasing } from '$lib/constants';

export function animateLangSwitch(container: HTMLElement, currentLang: string): void {
	const clipFrom = currentLang === Lang.EN
		? 'inset(0 100% 0 0)'
		: 'inset(0 0 0 100%)';
	const easing = AnimEasing.EASE_OUT_QUART;
	for (let idx = 0; idx < container.children.length; idx++) {
		const element = container.children[idx] as HTMLElement;
		if (element.getAttribute('data-lang') === currentLang) {
			element.style.display = '';
			element.style.clipPath = clipFrom;
			requestAnimationFrame(() => {
				animate(element, { clipPath: 'inset(0)' }, { duration: ANIM_DURATION, ease: easing });
			});
		} else {
			element.style.display = 'none';
			element.style.clipPath = '';
		}
	}
}
