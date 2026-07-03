<script lang="ts">
import { page } from '$app/state';
import { styleCheckboxes } from '$lib/actions/checkboxes';
import { copyCode } from '$lib/actions/copyCode';
import { roughNotation } from '$lib/actions/roughNotation';
import ButtonLink from '$lib/components/ui/ButtonLink/ButtonLink.svelte';
import Datetime from '$lib/components/ui/Datetime/Datetime.svelte';
import Tag from '$lib/components/ui/Tag/Tag.svelte';
import cfg from '$lib/config';
import { loadPageEntries } from '$lib/data/server';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { slugifyStr } from '$lib/tags';
import styles from './+page.module.scss';

let slug = $derived(page.params.slug ?? '');
let matching = $derived(loadPageEntries(slug));
let defaultEntry = $derived(matching.find((e) => e.lang === 'en') ?? matching[0]);
let entry = $derived(matching.find((e) => (e.lang ?? 'en') === locale.value) ?? defaultEntry);
let meta = $derived(entry?.metadata ?? { title: '', description: '', pubDatetime: '', tags: [] });
let t = $derived(useTranslations(locale.value));
</script>

<svelte:head>
  {#if meta.title}
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
  {/if}
</svelte:head>

<nav class={styles.backNav}><ButtonLink href="/posts">&larr; {t.post.goBack}</ButtonLink></nav>

{#if entry}
  <article class={styles.articleContainer} use:copyCode use:styleCheckboxes use:roughNotation>
    <h1 class={styles.title}>{meta.title}</h1>
    <div class={styles.meta}>
      <Datetime pubDatetime={meta.pubDatetime} modDatetime={meta.modDatetime} size="lg" />
    </div>
    <div class="prose"><entry.component /></div>
    <hr class={styles.hr} />
    <ul class={styles.tags}>{#each meta.tags ?? [] as tag}<Tag tag={slugifyStr(tag)} tagName={tag} size="sm" />{/each}</ul>
  </article>
{/if}
