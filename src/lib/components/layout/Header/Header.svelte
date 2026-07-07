<script lang="ts">
import Icon from '@iconify/svelte';
import { Collapsible } from 'melt/builders';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import GearMenu from '../GearMenu/GearMenu.svelte';
import styles from './Header.module.scss';

let { locale = 'en' }: { locale?: string } = $props();
let t = $derived(useTranslations(locale));
const menu = new Collapsible();
</script>

<header class={styles.root}>
  <a id="skip-link" href="#main-content" class={styles.skipLink}>{t.a11y.skipToContent}</a>
  <div class={styles.inner}>
    <a href="/" class={styles.title}>{cfg.site.title}</a>
    <nav>
      <button {...menu.trigger} class={styles.menuBtn} aria-label={menu.open ? t.a11y.closeMenu : t.a11y.openMenu}>
        <Icon icon={menu.open ? 'ph:x' : 'ph:list'} />
      </button>
      <div class={`${styles.menu} ${menu.open ? styles.menuOpen : ''}`}>
        <ul {...menu.content} class={styles.navUl}>
          <li class={styles.navLi}><a href="/logs" class={styles.navA}>{t.nav.posts}</a></li>
          <li class={styles.navLi}><a href="/index" class={styles.navA}>{t.nav.tags}</a></li>
          <li class={styles.navLi}><a href="/author" class={styles.navA}>{t.nav.about}</a></li>
          {#if cfg.features.showArchives}
            <li class={styles.navLi}><a href="/archives" class={styles.navA} title={t.nav.archives}><Icon icon="ph:archive-box" /></a></li>
          {/if}
          {#if cfg.features.search !== false}
            <li class={styles.navLi}><a href="/search" class={styles.navA} title={t.nav.search}><Icon icon="ph:magnifying-glass" /></a></li>
          {/if}
            <li class={styles.navLi}><GearMenu /></li>
        </ul>
      </div>
    </nav>
  </div>
</header>
