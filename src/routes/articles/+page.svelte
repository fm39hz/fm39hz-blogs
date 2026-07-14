<script lang="ts">
import ContentEntry from '$lib/components/ui/ContentEntry/ContentEntry.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { getDisplaySortedPosts } from '$lib/utils';
import styles from './+page.module.scss';

let t = $derived(useTranslations(locale.value));
const sorted = getDisplaySortedPosts();
const perPage = cfg.posts.perPage;
</script>

<svelte:head><title>{t.pages.postsTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.postsDesc} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.postsTitle}</h1>
  <p class={styles.desc}>{t.pages.postsDesc}</p>
  {#each sorted.slice(0, perPage) as post}
    <ContentEntry {post} />
  {/each}
</section>
