<script lang="ts">
import Icon from '@iconify/svelte';
import { Collapsible } from 'melt/builders';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import ThemeToggle from './ThemeToggle.svelte';

let { locale = 'en' }: { locale?: string } = $props();
let t = $derived(useTranslations(locale));
const menu = new Collapsible();
</script>

<a id="skip-link" href="#main-content">{t.a11y.skipToContent}</a>

<header>
  <div class="inner">
    <a href="/" class="title">{cfg.site.title}</a>
    <nav>
      <button
        {...menu.trigger}
        class="menu-btn"
        aria-label={menu.open ? t.a11y.closeMenu : t.a11y.openMenu}
      >
        <Icon icon={menu.open ? 'ph:x' : 'ph:list'} />
      </button>
      <div class="menu {menu.open ? 'open' : ''}">
        <ul {...menu.content}>
          <li><a href="/posts">{t.nav.posts}</a></li>
          <li><a href="/tags">{t.nav.tags}</a></li>
          <li><a href="/about">{t.nav.about}</a></li>
          {#if cfg.features.showArchives}
            <li><a href="/archives" title={t.nav.archives}><Icon icon="ph:archive-box" /></a></li>
          {/if}
          {#if cfg.features.search !== false}
            <li><a href="/search" title={t.nav.search}><Icon icon="ph:magnifying-glass" /></a></li>
          {/if}
          {#if cfg.features.lightAndDarkMode}
            <li><ThemeToggle /></li>
          {/if}
        </ul>
      </div>
    </nav>
  </div>
</header>

<style>
  header { max-width: 48rem; margin: 0 auto; width: 100%; padding: 0 1rem; }

  #skip-link {
    position: absolute; inset-inline-start: 4rem; top: -100%; z-index: 50;
    background: var(--bg); color: var(--accent); padding: 0.5rem 0.75rem;
    transition: top 0.2s;
  }
  #skip-link:focus { top: 1rem; }

  .inner {
    display: flex; align-items: baseline; justify-content: space-between;
    border-bottom: 1px solid var(--border); padding: 1rem 0;
  }

  .title {
    position: absolute;
    font-size: 1.25rem; font-weight: 600; white-space: nowrap;
    text-decoration: none; color: var(--fg);
  }

  .menu-btn { align-self: flex-end; padding: 0.5rem; background: none; border: none; color: var(--fg); }
  .menu { display: none; }
  .menu.open { display: block; }

  nav ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; width: 11rem; margin-top: 1rem; }
  nav li { display: flex; align-items: center; justify-content: center; }
  nav a { display: block; text-align: center; padding: 0.75rem 1rem; text-decoration: none; color: var(--fg); font-weight: 500; }
  nav a:hover { color: var(--accent); }

  @media (width >= 640px) {
    .inner { align-items: center; padding-top: 1.5rem; padding-bottom: 1.5rem; }
    .title { position: static; font-size: 1.5rem; line-height: 1; }
    .menu-btn { display: none; }
    .menu, .menu.open { display: block; }
    nav ul { display: flex; width: auto; gap: 1.25rem; margin-top: 0; }
    nav a { padding: 0.25rem 0.5rem; }
  }
</style>
