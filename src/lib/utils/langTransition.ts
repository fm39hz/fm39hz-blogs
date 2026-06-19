import { animate } from 'motion';

export function animateLangSwitch(container: HTMLElement, lang: string) {
	const from = `inset(0 ${lang === 'en' ? 100 : 0}% 0 ${lang === 'en' ? 0 : 100}%)`;
	for (const el of container.children as any) {
		const e = el as HTMLElement;
		if (e.getAttribute('data-lang') === lang) {
			e.style.display = '';
			e.style.clipPath = from;
			requestAnimationFrame(() => {
				animate(e, { clipPath: 'inset(0)' }, { duration: 0.3, ease: [0.22, 1, 0.36, 1] });
			});
		} else {
			e.style.display = 'none';
			e.style.clipPath = '';
		}
	}
}
