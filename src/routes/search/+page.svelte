<script lang="ts">
import { page } from '$app/state';
import ContentEntry from '$lib/components/ui/ContentEntry/ContentEntry.svelte';
import cfg from '$lib/config';
import { searchArticles } from '$lib/content/search';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import styles from './+page.module.scss';

let t = $derived(useTranslations(locale.value));
let { data }: { data: { articles: import('$lib/content/types').ArticleCard[] } } = $props();
let query = $state('');
$effect(() => {
	query = page.url.searchParams.get('q') ?? '';
});
let results = $derived(searchArticles(data.articles, query));
</script>

<svelte:head><title>{t.pages.searchTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.searchDesc} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.searchTitle}</h1>
  <p class={styles.desc}>{t.pages.searchDesc}</p>
  <input class={styles.searchInput} type="search" bind:value={query} placeholder={t.a11y.searchPlaceholder} aria-label={t.a11y.searchPlaceholder} />
  {#each results as post}
    <ContentEntry {post} />
  {:else}
    <p>{t.a11y.noResults}</p>
  {/each}
</section>
