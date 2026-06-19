<script lang="ts">
import Icon from '@iconify/svelte';
import { Theme } from '$lib/constants';
import { useTranslations } from '$lib/i18n';
import { getStoredTheme, applyTheme, animateThemeToggle } from '$lib/utils/theme';

let { locale = 'en' }: { locale?: string } = $props();
let i18n = $derived(useTranslations(locale));
let currentTheme = $state<Theme>(Theme.DARK);

function init() {
	if (typeof document === 'undefined') return;
	currentTheme = getStoredTheme();
	applyTheme(currentTheme);
}

function toggleTheme() {
	const button = document.getElementById('theme-btn');
	if (!button) return;
	const nextTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
	animateThemeToggle(button, () => { currentTheme = nextTheme; applyTheme(nextTheme); });
}

$effect(init);
</script>

<button id="theme-btn" onclick={toggleTheme} aria-label={i18n.a11y.toggleTheme} class="focus-outline relative size-12 p-4 sm:size-8" title={i18n.a11y.toggleTheme}>
	<Icon icon="ph:moon-fill" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	<Icon icon="ph:sun-fill" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
</button>
