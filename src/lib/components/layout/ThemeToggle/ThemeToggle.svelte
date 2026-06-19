<script lang="ts">
import Icon from '@iconify/svelte';
import { useTranslations } from '$lib/i18n';
import { initTheme, toggleTheme as toggleThemeFn } from './ThemeToggle';
import styles from './ThemeToggle.module.scss';

let { locale = 'en' }: { locale?: string } = $props();
let i18n = $derived(useTranslations(locale));
let currentTheme = $state(initTheme());

function handleToggle() {
	currentTheme = toggleThemeFn(currentTheme);
}
</script>

<button id="theme-btn" class={styles.btn} onclick={handleToggle} aria-label={i18n.a11y.toggleTheme} title={i18n.a11y.toggleTheme}>
  <Icon icon="ph:moon" class={styles.moon} />
  <Icon icon="ph:sun" class={styles.sun} />
</button>
