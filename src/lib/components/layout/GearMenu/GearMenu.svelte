<script lang="ts">
import Icon from '@iconify/svelte';
import { animateThemeToggle } from '$lib/animations/theme';
import IconButton from '$lib/components/ui/IconButton/IconButton.svelte';
import { Lang } from '$lib/constants';
import { useTranslations } from '$lib/i18n';
import { locale, setLocale } from '$lib/i18n-state.svelte';
import { DismissibleCollapsible } from '$lib/ui/dismissibleCollapsible.svelte';
import styles from './GearMenu.module.scss';

let i18n = $derived(useTranslations(locale.value));
let currentTheme = $state<'light' | 'dark'>('dark');

const panel = new DismissibleCollapsible({
	outsideClick: true,
	scrollLock: false,
});

$effect(() => {
	if (typeof document === 'undefined') return;
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') currentTheme = stored;
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

<div class={styles.root} bind:this={panel.rootEl}>
  <IconButton
    {...panel.menu.trigger}
    id="gear-btn"
    class={styles.gearBtn}
    icon="ph:gear"
    aria-label={i18n.a11y.openMenu}
    title={i18n.a11y.openMenu}
  />

  {#if panel.open}
    <div {...panel.menu.content} class={styles.dropdown} role="menu">
      <button class={styles.item} onclick={toggleTheme} role="menuitem">
        <Icon icon={currentTheme === 'dark' ? 'ph:moon' : 'ph:sun'} class={styles.itemIcon} />
        <span>{currentTheme === 'dark' ? i18n.theme.dark : i18n.theme.light}</span>
      </button>

      <button class={styles.item} onclick={toggleLang} role="menuitem">
        <Icon icon="ph:translate" class={styles.itemIcon} />
        <span>{locale.value === Lang.EN ? 'EN' : 'VI'}</span>
      </button>
    </div>
  {/if}
</div>
