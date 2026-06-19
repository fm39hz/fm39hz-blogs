<script lang="ts">
import Icon from '@iconify/svelte';
import { Theme } from '$lib/constants';
import { useTranslations } from '$lib/i18n';
import { animateThemeToggle, applyTheme, getStoredTheme } from '$lib/utils/theme';
import styles from './ThemeToggle.module.scss';

let { locale = 'en' }: { locale?: string } = $props();
let i18n = $derived(useTranslations(locale));
let currentTheme = $state<Theme>(Theme.DARK);

function init() {
	if (typeof document === 'undefined') return;
	currentTheme = getStoredTheme();
	applyTheme(currentTheme);
}

function toggleTheme() {
	const btn = document.getElementById('theme-btn');
	if (!btn) return;
	const next = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
	animateThemeToggle(btn, () => {
		currentTheme = next;
		applyTheme(next);
	});
}

$effect(init);
</script>

<button id="theme-btn" class={styles.btn} onclick={toggleTheme} aria-label={i18n.a11y.toggleTheme} title={i18n.a11y.toggleTheme}>
  <Icon icon="ph:moon-fill" class={styles.moon} />
  <Icon icon="ph:sun-fill" class={styles.sun} />
</button>
