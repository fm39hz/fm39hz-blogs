<script lang="ts">
import { onMount } from 'svelte';
import { animateThemeToggle, applyTheme } from '$lib/animations/theme';
import IconButton from '$lib/components/ui/IconButton/IconButton.svelte';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { rootTheme } from '$lib/document/root';
import { useTranslations } from '$lib/i18n';
import { locale, setLocale } from '$lib/i18n-state.svelte';
import { LANGUAGES } from '$lib/locale';
import { THEMES, type ThemeMode } from '$lib/types';
import { DismissibleCollapsible } from '$lib/ui/dismissibleCollapsible.svelte';
import { cycle } from '$lib/utils/cycle';
import styles from './GearMenu.module.scss';

let i18n = $derived(useTranslations(locale.value));
let currentTheme = $state<ThemeMode>('dark');

const panel = new DismissibleCollapsible({
	outsideClick: true,
	scrollLock: false,
});

onMount(() => {
	currentTheme = rootTheme();
});

function toggleTheme() {
	const next = cycle(THEMES, currentTheme);
	animateThemeToggle(() => {
		currentTheme = next;
		applyTheme(next);
	});
}

function toggleLang() {
	setLocale(cycle(LANGUAGES, locale.value));
}
</script>

<svelte:document onclick={panel.handleDocumentClick} />
<svelte:window onkeydown={panel.handleKeydown} />

<div class={styles.root} bind:this={panel.rootEl}>
  <IconButton
    {...panel.menu.trigger}
    id="gear-btn"
    class={styles.gearBtn}
    iconClass={styles.gearIcon}
    icon="ph:gear"
    aria-label={i18n.a11y.openMenu}
    title={i18n.a11y.openMenu}
  />

  {#if panel.open}
    <div {...panel.menu.content} class={styles.dropdown} role="menu">
      <button class={styles.item} onclick={toggleTheme} role="menuitem">
        <Icon icon={currentTheme === 'dark' ? 'ph:moon' : 'ph:sun'} class={styles.itemIcon} />
        <span>{i18n.theme[currentTheme]}</span>
      </button>

      <button class={styles.item} onclick={toggleLang} role="menuitem">
        <Icon icon="ph:translate" class={styles.itemIcon} />
        <span class={styles.langCode}>{locale.value}</span>
      </button>
    </div>
  {/if}
</div>
