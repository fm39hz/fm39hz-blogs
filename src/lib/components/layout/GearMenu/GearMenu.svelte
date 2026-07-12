<script lang="ts">
import Icon from '@iconify/svelte';
import { Collapsible } from 'melt/builders';
import { animateThemeToggle } from '$lib/animations/theme';
import IconButton from '$lib/components/ui/IconButton/IconButton.svelte';
import { Lang } from '$lib/constants';
import { useTranslations } from '$lib/i18n';
import { locale, setLocale } from '$lib/i18n-state.svelte';
import styles from './GearMenu.module.scss';

let i18n = $derived(useTranslations(locale.value));

let currentTheme = $state<'light' | 'dark'>('dark');
let rootEl = $state<HTMLElement | null>(null);

$effect(() => {
	if (typeof document === 'undefined') return;
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') currentTheme = stored;
});

const menu = new Collapsible();

// Register listeners once on mount to avoid event bubbling race conditions
$effect(() => {
	const handleClick = (e: MouseEvent) => {
		if (!menu.open) return;
		const target = e.target as HTMLElement;
		// If the target element was detached from the DOM during Svelte's reactive render cycle, ignore it
		if (!target || !target.isConnected) return;
		if (rootEl && !rootEl.contains(target)) {
			menu.open = false;
		}
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && menu.open) {
			menu.open = false;
		}
	};

	document.addEventListener('click', handleClick);
	document.addEventListener('keydown', handleKeydown);
	return () => {
		document.removeEventListener('click', handleClick);
		document.removeEventListener('keydown', handleKeydown);
	};
});

function toggleTheme() {
	const next = currentTheme === 'dark' ? 'light' : 'dark';
	const btn = document.getElementById('gear-btn');
	animateThemeToggle(btn ?? document.documentElement, () => {
		currentTheme = next;
		localStorage.setItem('theme', next);
		document.firstElementChild?.setAttribute('data-theme', next);
	});
}

function toggleLang() {
	setLocale(locale.value === Lang.EN ? Lang.VI : Lang.EN);
}
</script>

<div class={styles.root} bind:this={rootEl}>
  <IconButton
    {...menu.trigger}
    id="gear-btn"
    class={styles.gearBtn}
    icon="ph:gear"
    aria-label={i18n.a11y.openMenu}
    title={i18n.a11y.openMenu}
  />

  {#if menu.open}
    <div {...menu.content} class={styles.dropdown} role="menu">
      <button class={styles.item} onclick={toggleTheme} role="menuitem">
        <Icon icon={currentTheme === 'dark' ? 'ph:moon' : 'ph:sun'} class={styles.itemIcon} />
        <span>{currentTheme === 'dark' ? 'Dark' : 'Light'}</span>
      </button>

      <button class={styles.item} onclick={toggleLang} role="menuitem">
        <Icon icon="ph:translate" class={styles.itemIcon} />
        <span>{locale.value === Lang.EN ? 'EN' : 'VI'}</span>
      </button>
    </div>
  {/if}
</div>
