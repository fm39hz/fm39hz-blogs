<script lang="ts">
import Icon from '@iconify/svelte';
import { Toggle } from 'melt/builders';

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

function onValueChange(v: boolean) {
	theme = v ? 'dark' : 'light';
	apply(theme);
}

const toggle = new Toggle({
	value: () => theme === 'dark',
	onValueChange,
});

$effect(init);
</script>

<button {...toggle.trigger} aria-label="Toggle theme" class="focus-outline relative size-12 p-4 sm:size-8" title="Toggle theme">
	<Icon icon="mdi:moon-waning-crescent" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	<Icon icon="mdi:white-balance-sunny" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
</button>
