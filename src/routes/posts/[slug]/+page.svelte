<script lang="ts">
import { page } from '$app/state';
import { styleCheckboxes } from '$lib/actions/checkboxes';
import { copyCode } from '$lib/actions/copyCode';
import ButtonLink from '$lib/components/ui/ButtonLink/ButtonLink.svelte';
import Datetime from '$lib/components/ui/Datetime/Datetime.svelte';
import Tag from '$lib/components/ui/Tag/Tag.svelte';
import cfg from '$lib/config';
import { loadPageEntries } from '$lib/data/server';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { slugifyStr } from '$lib/tags';
import styles from './+page.module.scss';

const slug = page.params.slug ?? '';
const matching = loadPageEntries(slug);
const defaultEntry = matching.find((e) => e.lang === 'en') ?? matching[0];
let entry = $derived(matching.find((e) => (e.lang ?? 'en') === locale.value) ?? defaultEntry);
let meta = $derived(entry.metadata);
let t = $derived(useTranslations(locale.value));
</script>

<svelte:head>
  <title>{meta.title} | {cfg.site.title}</title>
  <meta name="description" content={meta.description} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content="{cfg.site.url}/posts/{slug}" />
  <meta property="article:published_time" content={meta.pubDatetime} />
  {#if meta.modDatetime}<meta property="article:modified_time" content={meta.modDatetime} />{/if}
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={meta.title} />
  <meta property="twitter:description" content={meta.description} />
</svelte:head>

<nav class={styles.backNav}><ButtonLink href="/posts">&larr; {t.post.goBack}</ButtonLink></nav>

<article use:copyCode use:styleCheckboxes>
  <h1 class={styles.title}>{meta.title}</h1>
  <div class={styles.meta}>
    <Datetime pubDatetime={meta.pubDatetime} modDatetime={meta.modDatetime} size="lg" />
  </div>
  <div class="prose"><entry.component /></div>
  <hr class={styles.hr} />
  <ul class={styles.tags}>{#each meta.tags ?? [] as tag}<Tag tag={slugifyStr(tag)} tagName={tag} size="sm" />{/each}</ul>
</article>
