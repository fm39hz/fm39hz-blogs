<script lang="ts">
import cfg from '$lib/config';
import { locale } from '$lib/i18n-state.svelte';
import { BASE_LANGUAGE } from '$lib/locale';
import styles from './+page.module.scss';
import type { PageProps } from './$types';

let { data }: PageProps = $props();

let entry = $derived(
	data.entries.find((e) => e.lang === locale.value) ??
		data.entries.find((e) => e.lang === BASE_LANGUAGE) ??
		data.entries[0],
);
</script>

<svelte:head>
  <title>{entry.metadata.title} | {cfg.site.title}</title>
  <meta name="description" content={entry.metadata.description} />
</svelte:head>

<div class={styles.root}>
  <div class={styles.header}>
    <h1 class={styles.title}>{entry.metadata.title}</h1>
  </div>
  <div class="prose"><entry.component /></div>
</div>
