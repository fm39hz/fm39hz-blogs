<script lang="ts">
import Icon from '@iconify/svelte';
import { Popover } from 'melt/builders';
import { animate } from 'motion/mini';
import { animateThemeToggle } from '$lib/animations/theme';
import { Lang } from '$lib/constants';
import { useTranslations } from '$lib/i18n';
import { AnimEasing } from '$lib/types';
import styles from './GearMenu.module.scss';

let { locale = 'en' }: { locale?: string } = $props();
let i18n = $derived(useTranslations(locale));

let currentTheme = $state<'light' | 'dark'>('dark');
let currentLang = $state<string>(locale ?? Lang.EN);
let gearEl = $state<HTMLElement | null>(null);

const DURATION = 0.3;
function gearRotate(deg: number) {
	if (!gearEl) return;
	animate(
		gearEl,
		{ rotate: `${deg}deg` },
		{ duration: DURATION, ease: AnimEasing.EASE_OUT_QUART },
	);
}

$effect(() => {
	if (typeof document === 'undefined') return;
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') currentTheme = stored;
});

const popover = new Popover({
	onOpenChange: (open) => gearRotate(open ? 180 : 0),
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
	const next = currentLang === Lang.EN ? Lang.VI : Lang.EN;
	currentLang = next;
}
</script>

<div class={styles.root}>
  <button
    {...popover.trigger}
    id="gear-btn"
    class={styles.gear}
    bind:this={gearEl}
    aria-label={i18n.a11y.openMenu}
    title={i18n.a11y.openMenu}
  >
    <Icon icon="ph:gear" class={styles.icon} />
  </button>

  <div {...popover.content} class={styles.dropdown}>
    <button class={styles.item} onclick={toggleTheme}>
      <Icon icon={currentTheme === 'dark' ? 'ph:moon' : 'ph:sun'} class={styles.itemIcon} />
      <span>{currentTheme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>

    <button class={styles.item} onclick={toggleLang}>
      <Icon icon="ph:translate" class={styles.itemIcon} />
      <span>{currentLang === Lang.EN ? 'EN' : 'VI'}</span>
    </button>
  </div>
</div>

