<script lang="ts">
import Icon, { loadIcons } from '@iconify/svelte';
import { Collapsible } from 'melt/builders';
import { browser } from '$app/environment';
import IconButton from '$lib/components/ui/IconButton/IconButton.svelte';
import NavLink from '$lib/components/ui/NavLink/NavLink.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import GearMenu from '../GearMenu/GearMenu.svelte';
import styles from './Header.module.scss';

if (browser) {
	loadIcons([
		'ph:gear',
		'ph:x',
		'ph:list',
		'ph:magnifying-glass',
		'ph:moon',
		'ph:sun',
		'ph:translate',
	]);
}

let { locale = 'en' }: { locale?: string } = $props();
let t = $derived(useTranslations(locale));
const menu = new Collapsible();

// Scroll tracking for smart sticky header
let y = $state(0);
let lastY = 0;
let visible = $state(true);
let scrolled = $state(false);

$effect(() => {
	const currentY = y;
	scrolled = currentY > 20;

	if (currentY <= 0) {
		visible = true;
	} else if (currentY > lastY && currentY > 80) {
		// Scrolling down: hide header
		visible = false;
	} else if (currentY < lastY) {
		// Scrolling up: reveal header
		visible = true;
	}

	lastY = currentY;
});

// Lock body scrolling when mobile menu is open
$effect(() => {
	if (menu.open) {
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = '';
		document.documentElement.style.overflow = '';
	}
	return () => {
		document.body.style.overflow = '';
		document.documentElement.style.overflow = '';
	};
});

let headerClass = $derived(
	`${styles.root} ${!visible && !menu.open ? styles.hidden : ''} ${scrolled ? styles.scrolled : ''}`,
);
</script>

<svelte:window bind:scrollY={y} />

<header class={headerClass}>
  <div class={styles.container}>
    <a id="skip-link" href="#main-content" class={styles.skipLink}>{t.a11y.skipToContent}</a>
    <div class={styles.inner}>
      <a href="/" class={styles.title}>{cfg.site.title}</a>
      <nav>
        <IconButton
          {...menu.trigger}
          class={styles.menuBtn}
          icon={menu.open ? 'ph:x' : 'ph:list'}
          aria-label={menu.open ? t.a11y.closeMenu : t.a11y.openMenu}
        />
        <div class={`${styles.menu} ${menu.open ? styles.menuOpen : ''}`} role="presentation" onclick={(e) => { if (e.target === e.currentTarget) menu.open = false; }} onkeydown={() => {}}>
          <ul {...menu.content} class={styles.navUl}>
            <li class={styles.navLi}><NavLink href="/articles" onclick={() => menu.open = false}>{t.nav.posts}</NavLink></li>
            <li class={styles.navLi}><NavLink href="/topics" onclick={() => menu.open = false}>{t.nav.tags}</NavLink></li>
            {#if cfg.features.showArchives}
              <li class={styles.navLi}><NavLink href="/archives" onclick={() => menu.open = false}>{t.nav.archives}</NavLink></li>
            {/if}
            <li class={styles.navLi}><NavLink href="/author" onclick={() => menu.open = false}>{t.nav.about}</NavLink></li>
            <li class={styles.navUtil}>
              {#if cfg.features.search !== false}
                <IconButton
                  href="/search"
                  icon="ph:magnifying-glass"
                  title={t.nav.search}
                  onclick={() => menu.open = false}
                />
              {/if}
              <GearMenu />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</header>
