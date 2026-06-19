<script lang="ts">
import Icon from '@iconify/svelte';
import { Theme } from '$lib/constants';
import { useTranslations } from '$lib/i18n';
import { animateThemeToggle, applyTheme, getStoredTheme } from '$lib/utils/theme';

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

<button id="theme-btn" onclick={toggleTheme} aria-label={i18n.a11y.toggleTheme} title={i18n.a11y.toggleTheme}>
  <Icon icon="ph:moon-fill" class="moon" />
  <Icon icon="ph:sun-fill" class="sun" />
</button>

<style>
  button { position: relative; width: 3rem; height: 3rem; padding: 1rem; background: none; border: none; color: var(--fg); }
  :global(.moon), :global(.sun) { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 1.25rem; height: 1.25rem; transition: all 0.3s; }
  :global(.moon) { scale: 1; rotate: 0deg; }
  :global(.sun) { scale: 0; rotate: 90deg; }
  :global([data-theme="dark"]) .moon { scale: 0; rotate: -90deg; }
  :global([data-theme="dark"]) .sun { scale: 1; rotate: 0deg; }
  @media (width >= 640px) { button { width: 2rem; height: 2rem; padding: 0; } }
</style>
