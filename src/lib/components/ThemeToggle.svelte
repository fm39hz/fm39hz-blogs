<script lang="ts">
import Icon from '@iconify/svelte';
import { getStoredTheme, applyTheme, animateThemeToggle } from '$lib/utils/theme';

let theme = $state<'light' | 'dark'>('dark');

function init() {
	if (typeof document === 'undefined') return;
	theme = getStoredTheme();
	applyTheme(theme);
}

function toggle() {
	const btn = document.getElementById('theme-btn');
	if (!btn) return;
	const next = theme === 'dark' ? 'light' : 'dark';
	animateThemeToggle(btn, next, () => { theme = next; applyTheme(next); });
}

$effect(init);
</script>

<button id="theme-btn" onclick={toggle} aria-label="Toggle theme" class="focus-outline relative size-12 p-4 sm:size-8" title="Toggle theme">
	<Icon icon="ph:moon-fill" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	<Icon icon="ph:sun-fill" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
</button>
