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
      <div class={`${styles.menu} ${menu.open ? styles.menuOpen : ''}`} onclick={() => { if (menu.open) menu.open = false; }}>
        <ul {...menu.content} class={styles.navUl} onclick={(e) => e.stopPropagation()}>
          <li class={styles.navLi}><a href="/logs" class={styles.navA}>{t.nav.posts}</a></li>
          <li class={styles.navLi}><a href="/topics" class={styles.navA}>{t.nav.tags}</a></li>
          <li class={styles.navLi}><a href="/author" class={styles.navA}>{t.nav.about}</a></li>
          <li class={styles.navUtil}>
            {#if cfg.features.showArchives}
              <a href="/archives" class={styles.navA}>{t.nav.archives}</a>
            {/if}
            {#if cfg.features.search !== false}
              <a href="/search" class={styles.navA} title={t.nav.search}><Icon icon="ph:magnifying-glass" /></a>
            {/if}
            <GearMenu />
          </li>
        </ul>
      </div>
    </nav>
  </div>
</header>
