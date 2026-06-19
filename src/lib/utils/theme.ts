import { animate } from 'motion';

export function getStoredTheme(): 'light' | 'dark' {
	if (typeof localStorage === 'undefined') return 'dark';
	const stored = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return stored === 'light' ? 'light' : stored === 'dark' ? 'dark' : prefersDark ? 'dark' : 'light';
}

export function applyTheme(t: string) {
	document.firstElementChild?.setAttribute('data-theme', t);
	localStorage.setItem('theme', t);
}

export function animateThemeToggle(btn: HTMLElement, next: string, callback: () => void) {
	const r = btn.getBoundingClientRect();
	const x = ((r.left + r.width / 2) / innerWidth) * 100;
	const y = ((r.top + r.height / 2) / innerHeight) * 100;

	const oldBg = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
	callback();

	const overlay = document.createElement('div');
	overlay.style.cssText = `position:fixed;inset:0;z-index:9999;pointer-events:none;background:${oldBg};clip-path:circle(150% at ${x}% ${y}%)`;
	document.body.appendChild(overlay);

	animate(overlay, { clipPath: `circle(0% at ${x}% ${y}%)` }, { duration: 0.7, ease: [0.22, 1, 0.36, 1] })
		.finished.then(() => overlay.remove());
}
