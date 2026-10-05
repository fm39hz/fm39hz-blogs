<script lang="ts">
import ContentEntry from '$lib/components/ui/ContentEntry/ContentEntry.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import styles from './+page.module.scss';

let t = $derived(useTranslations(locale.value));
let { data }: { data: { tag: string; articles: import('$lib/content/types').ArticleCard[] } } =
	$props();
let tagParam = $derived(data.tag);
</script>

<svelte:head><title>{t.pages.tagTitle}: {tagParam} | {cfg.site.title}</title><meta name="description" content={`${t.pages.tagDesc} "${tagParam}".`} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.tagTitle}: {tagParam}</h1>
  <p class={styles.desc}>{t.pages.tagDesc} "{tagParam}".</p>
  {#each data.articles as post}
    <ContentEntry {post} />
  {/each}
</section>
