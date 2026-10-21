<script lang="ts">
import { browser } from '$app/env';
import type { ContentHeading } from '$lib/content/types';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import styles from './TableOfContents.module.scss';
import { activeHeadingId, centerActiveInList } from './toc.svelte';

let t = $derived(useTranslations(locale.value));

/** `headings`: TOC-level headings from build metadata (see `tocHeadings`). */
let {
	mode = 'desktop',
	headings,
}: {
	mode?: 'desktop' | 'mobile';
	headings: ContentHeading[];
} = $props();

let scrollY = $state(0);
let innerHeight = $state(0);
let drawerOpen = $state(false);
let listEl = $state<HTMLElement>();
const itemEls = $state<Record<string, HTMLElement>>({});

let activeId = $derived(
	browser && innerHeight ? activeHeadingId(headings, scrollY, innerHeight) : '',
);

let scrollProgress = $derived.by(() => {
	if (!browser || !innerHeight) return 0;
	const total = document.documentElement.scrollHeight - innerHeight;
	return total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0;
});

// Center the active item when possible (clamped — ends can't balance)
$effect(() => {
	const active = itemEls[activeId];
	if (listEl && active) centerActiveInList(listEl, active, true);
});

function recenter() {
	const active = itemEls[activeId];
	if (listEl && active) centerActiveInList(listEl, active, false);
}
</script>

<svelte:window bind:scrollY bind:innerHeight onresize={recenter} />

{#if browser && headings.length > 0}
  {#if mode === 'desktop'}
    <!-- Desktop Table of Contents Sidebar -->
    <nav class={styles.nav} aria-label={t.post.tableOfContents}>
      <ul bind:this={listEl} class={styles.list}>
        {#each headings as { id, text, depth } (id)}
          <li class={`${styles.item} ${styles[`level-${depth}`]}`} bind:this={itemEls[id]}>
            <a href="#{id}" class={`${styles.link} ${activeId === id ? styles.active : ''}`}>
              {text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {:else if mode === 'mobile'}
    <!-- Mobile Floating Action Button with Reading Progress -->
    <button
      class={styles.mobileBtn}
      aria-label={t.post.tableOfContents}
      onclick={() => drawerOpen = true}
    >
      <svg class={styles.progressSvg} width="48" height="48" viewBox="0 0 48 48">
        <circle class={styles.progressBg} cx="24" cy="24" r="21" />
        <circle
          class={styles.progressFill}
          cx="24"
          cy="24"
          r="21"
          stroke-dasharray="131.95"
          stroke-dashoffset={131.95 - (scrollProgress * 131.95)}
        />
      </svg>
      <div class={styles.mobileBtnIcon}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </div>
    </button>

    <!-- Mobile Drawer Bottom Sheet; data-scroll-lock pins the page (global.scss) -->
    {#if drawerOpen}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div
        class={styles.drawerOverlay}
        onclick={() => drawerOpen = false}
        role="presentation"
      ></div>

      <div
        class={styles.drawerContent}
        role="dialog"
        aria-modal="true"
        aria-label={t.post.tableOfContentsMenu}
        data-scroll-lock
      >
        <div class={styles.drawerHeader}>
          <span class={styles.drawerTitle}>{t.post.tableOfContents}</span>
          <button
            class={styles.drawerClose}
            onclick={() => drawerOpen = false}
            aria-label={t.post.closeMenu}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <ul class={styles.drawerList}>
          {#each headings as { id, text, depth } (id)}
            <li class={`${styles.drawerItem} ${styles[`drawerLevel-${depth}`]}`}>
              <a
                href="#{id}"
                class={`${styles.drawerLink} ${activeId === id ? styles.drawerActive : ''}`}
                onclick={() => drawerOpen = false}
              >
                {text}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  {/if}
{/if}
