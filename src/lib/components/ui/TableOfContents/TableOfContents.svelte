<script lang="ts">
import { onMount } from 'svelte';
import { browser } from '$app/env';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { lockPageScroll, type ScrollLockHandle } from '$lib/utils/scrollLock';
import styles from './TableOfContents.module.scss';

import {
	centerActiveInList,
	collectHeadings,
	observeActiveHeading,
	type TocHeading,
} from './toc.svelte';

let t = $derived(useTranslations(locale.value));

let {
	mode = 'desktop',
	onReady,
}: {
	mode?: 'desktop' | 'mobile';
	onReady?: (hasHeadings: boolean) => void;
} = $props();

let headings = $state<TocHeading[]>([]);
let activeId = $state('');
let listEl = $state<HTMLElement | null>(null);

// Mobile drawer and progress states
let drawerOpen = $state(false);
let scrollProgress = $state(0);

$effect(() => {
	onReady?.(headings.length > 0);
});

// Center active when possible (clamped — ends can't balance)
$effect(() => {
	if (!browser || !activeId || !listEl) return;
	const active = listEl.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`);
	if (!active) return;
	centerActiveInList(listEl, active, true);
});

// Prevent body scroll when mobile drawer is open using lockPageScroll helper
let lock: ScrollLockHandle | null = null;
$effect(() => {
	if (!browser) return;
	if (drawerOpen) {
		lock = lockPageScroll();
	}
	return () => {
		lock?.release();
		lock = null;
	};
});

function updateScrollProgress() {
	const doc = document.documentElement;
	const total = doc.scrollHeight - doc.clientHeight;
	if (total <= 0) {
		scrollProgress = 0;
	} else {
		scrollProgress = Math.min(1, Math.max(0, window.scrollY / total));
	}
}

onMount(() => {
	const prose = document.querySelector('.prose');
	if (!prose) {
		onReady?.(false);
		return;
	}

	const items = collectHeadings(prose);
	headings = items;
	onReady?.(items.length > 0);
	if (items.length === 0) return;

	// Listen to scroll to update progress circle (mobile only)
	if (mode === 'mobile') {
		window.addEventListener('scroll', updateScrollProgress, { passive: true });
		updateScrollProgress();
	}

	const onResize = () => {
		if (!listEl || !activeId) return;
		const active = listEl.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`);
		if (active) centerActiveInList(listEl, active, false);
	};
	window.addEventListener('resize', onResize);

	const stop = observeActiveHeading(items, (id) => {
		activeId = id;
	});

	return () => {
		stop();
		window.removeEventListener('resize', onResize);
		window.removeEventListener('scroll', updateScrollProgress);
	};
});
</script>

{#if browser && headings.length > 0}
  {#if mode === 'desktop'}
    <!-- Desktop Table of Contents Sidebar -->
    <nav class={styles.nav} aria-label={t.post.tableOfContents}>
      <ul bind:this={listEl} class={styles.list}>
        {#each headings as { id, text, level } (id)}
          <li class={`${styles.item} ${styles[`level-${level}`]}`} data-toc-id={id}>
            <a
              href="#{id}"
              class={`${styles.link} ${activeId === id ? styles.active : ''}`}
              onclick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, '', `#${id}`);
                activeId = id;
              }}
            >
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

    <!-- Mobile Drawer Bottom Sheet -->
    {#if drawerOpen}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div
        class={styles.drawerOverlay}
        onclick={() => drawerOpen = false}
        role="presentation"
      ></div>

      <div class={styles.drawerContent} role="dialog" aria-modal="true" aria-label={t.post.tableOfContentsMenu}>
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
          {#each headings as { id, text, level } (id)}
            <li class={`${styles.drawerItem} ${styles[`drawerLevel-${level}`]}`}>
              <a
                href="#{id}"
                class={`${styles.drawerLink} ${activeId === id ? styles.drawerActive : ''}`}
                onclick={(e) => {
                  e.preventDefault();
                  drawerOpen = false;
                  
                  // Release scroll lock synchronously so scrollIntoView is not blocked
                  if (lock) {
                    lock.release();
                    lock = null;
                  }

                  setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }, 0);
                  
                  history.pushState(null, '', `#${id}`);
                  activeId = id;
                }}
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
