<script lang="ts">
import ArticleDiscovery from '$lib/components/ui/ArticleDiscovery/ArticleDiscovery.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import styles from './+page.module.scss';
import type { PageProps } from './$types';

let t = $derived(useTranslations(locale.value));
let { data }: PageProps = $props();
let tagParam = $derived(data.tag);
</script>

<svelte:head><title>{t.pages.tagTitle}: {data.tagName} | {cfg.site.title}</title><meta name="description" content={`${t.pages.tagDesc} "${data.tagName}".`} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.tagTitle}: {data.tagName}</h1>
  <p class={styles.desc}>{t.pages.tagDesc} "{data.tagName}".</p>
  <ArticleDiscovery articles={data.articles} topics={data.topics} initialTags={[tagParam]} />
</section>
