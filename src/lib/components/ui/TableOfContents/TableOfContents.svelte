<script lang="ts">
import { onMount } from 'svelte';
import { browser } from '$app/env';
import styles from './TableOfContents.module.scss';
import {
	centerActiveInList,
	collectHeadings,
	observeActiveHeading,
	type TocHeading,
} from './toc.svelte';

let {
	onReady,
}: {
	onReady?: (hasHeadings: boolean) => void;
} = $props();

let headings = $state<TocHeading[]>([]);
let activeId = $state('');
let listEl = $state<HTMLElement | null>(null);

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
	};
});
</script>

{#if browser && headings.length > 0}
  <nav class={styles.nav} aria-label="Table of contents">
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
{/if}
