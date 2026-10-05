<script lang="ts">
import { page } from '$app/state';
import ContentEntry from '$lib/components/ui/ContentEntry/ContentEntry.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { getDisplaySortedPosts } from '$lib/utils';
import { searchPosts } from '$lib/utils/search';
import styles from './+page.module.scss';

let t = $derived(useTranslations(locale.value));
let query = $state('');
$effect(() => {
	query = page.url.searchParams.get('q') ?? '';
});
let posts = $derived(getDisplaySortedPosts(locale.value));
let results = $derived(searchPosts(posts, query));
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
