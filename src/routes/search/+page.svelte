<script lang="ts">
import ArticleDiscovery from '$lib/components/ui/ArticleDiscovery/ArticleDiscovery.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import styles from './+page.module.scss';
import type { PageProps } from './$types';

let t = $derived(useTranslations(locale.value));
let { data }: PageProps = $props();
</script>

<svelte:head><title>{t.pages.searchTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.searchDesc} /><meta name="robots" content="noindex, follow" /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.searchTitle}</h1>
  <p class={styles.desc}>{t.pages.searchDesc}</p>
  <ArticleDiscovery articles={data.articles} topics={data.topics} />
</section>
