<script lang="ts">
import Icon from '@iconify/svelte';
import { animate } from 'motion';

let theme = $state<'light' | 'dark'>('dark');

function init() {
	if (typeof document === 'undefined') return;
	const stored = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	theme = stored === 'light' ? 'light' : stored === 'dark' ? 'dark' : prefersDark ? 'dark' : 'light';
	apply(theme);
}

function apply(t: string) {
	document.firstElementChild?.setAttribute('data-theme', t);
	localStorage.setItem('theme', t);
}

async function toggle() {
	const btn = document.getElementById('theme-btn');
	const cx = btn ? ((btn.getBoundingClientRect().left + btn.getBoundingClientRect().width / 2) / innerWidth) * 100 : 50;
	const cy = btn ? ((btn.getBoundingClientRect().top + btn.getBoundingClientRect().height / 2) / innerHeight) * 100 : 50;

	const old = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
	const next = theme === 'dark' ? 'light' : 'dark';

	// switch theme underneath
	theme = next;
	apply(next);

	// overlay with old bg, full coverage
	const overlay = document.createElement('div');
	overlay.style.cssText = `position:fixed;inset:0;z-index:9999;pointer-events:none;background:${old};clip-path:circle(150% at ${cx}% ${cy}%)`;
	document.body.appendChild(overlay);

	// animate clip-path closing to reveal new theme
	await animate(overlay, { clipPath: `circle(0% at ${cx}% ${cy}%)` }, { duration: 0.7, ease: [0.22, 1, 0.36, 1] }).finished;

	overlay.remove();
}

$effect(init);
</script>

<button id="theme-btn" onclick={toggle} aria-label="Toggle theme" class="focus-outline relative size-12 p-4 sm:size-8" title="Toggle theme">
	<Icon icon="ph:moon-fill" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	<Icon icon="ph:sun-fill" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
</button>
