<script lang="ts">
import { page } from '$app/state';
import ContentEntry from '$lib/components/ui/ContentEntry/ContentEntry.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { slugifyAll } from '$lib/tags';
import { getDisplaySortedPosts } from '$lib/utils';
import styles from './+page.module.scss';

let t = $derived(useTranslations(locale.value));
const displayPosts = getDisplaySortedPosts();
const tagParam = $derived(decodeURIComponent(page.params.tag ?? ''));
const tagPosts = $derived(
	displayPosts.filter((p) => slugifyAll(p.metadata.tags).includes(tagParam)),
);
</script>

<svelte:head><title>{t.pages.tagTitle}: {tagParam} | {cfg.site.title}</title><meta name="description" content={`${t.pages.tagDesc} "${tagParam}".`} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.tagTitle}: {tagParam}</h1>
  <p class={styles.desc}>{t.pages.tagDesc} "{tagParam}".</p>
  {#each tagPosts as post}
    <ContentEntry {post} />
  {/each}
</section>
