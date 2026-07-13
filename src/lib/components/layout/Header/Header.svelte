<script lang="ts">
import { resizeHeight } from '$lib/actions/resizeHeight';
import IconButton from '$lib/components/ui/IconButton/IconButton.svelte';
import NavLink from '$lib/components/ui/NavLink/NavLink.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import GearMenu from '../GearMenu/GearMenu.svelte';
import styles from './Header.module.scss';
import { SiteHeader } from './header.svelte';

let { locale = 'en' }: { locale?: string } = $props();
let t = $derived(useTranslations(locale));
const header = new SiteHeader();
</script>

<header
  bind:this={header.nav.rootEl}
  class={styles.root}
  data-hidden={header.hidden ? 'true' : undefined}
  data-elevated={header.elevated ? 'true' : undefined}
  data-open={header.nav.open ? 'true' : undefined}
  style:--header-bar-h={header.barHeightStyle}
>
  <div class={styles.shell}>
    <div class={styles.bar} use:resizeHeight={header.setBarH}>
      <a id="skip-link" href="#main-content" class={styles.skipLink}>{t.a11y.skipToContent}</a>
      <a href="/" class={styles.title}>{cfg.site.title}</a>
      <IconButton
        {...header.nav.menu.trigger}
        class={styles.menuBtn}
        icon={header.nav.open ? 'ph:x' : 'ph:list'}
        aria-label={header.nav.open ? t.a11y.closeMenu : t.a11y.openMenu}
      />
    </div>

    <nav class={styles.panel} aria-label="Primary">
      <ul {...header.nav.menu.content} class={styles.list}>
        <li>
          <NavLink href="/articles" onclick={header.close}>{t.nav.posts}</NavLink>
        </li>
        <li>
          <NavLink href="/topics" onclick={header.close}>{t.nav.tags}</NavLink>
        </li>
        {#if cfg.features.showArchives}
          <li>
            <NavLink href="/archives" onclick={header.close}>{t.nav.archives}</NavLink>
          </li>
        {/if}
        <li>
          <NavLink href="/author" onclick={header.close}>{t.nav.about}</NavLink>
        </li>
        <li class={styles.utils}>
          {#if cfg.features.search !== false}
            <IconButton
              href="/search"
              icon="ph:magnifying-glass"
              title={t.nav.search}
              onclick={header.close}
            />
          {/if}
          <GearMenu />
        </li>
      </ul>
    </nav>
  </div>
</header>

<!-- Visual dim only — dismiss via DismissibleCollapsible outside-click / Escape -->
{#if header.nav.open}
  <div class={styles.scrim} aria-hidden="true"></div>
{/if}

<div class={styles.spacer} aria-hidden="true"></div>
