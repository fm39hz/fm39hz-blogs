<script lang="ts">
import { page } from '$app/state';
import { styleCheckboxes } from '$lib/actions/checkboxes';
import { copyCode } from '$lib/actions/copyCode';
import { figureSurfaces } from '$lib/actions/figureSurface';
import { lightboxAction } from '$lib/actions/lightbox';
import { pencilEdge } from '$lib/actions/pencilEdge';
import { renderMermaid } from '$lib/actions/renderMermaid';
import { renderVegaLite } from '$lib/actions/renderVegaLite';
import { responsiveTables } from '$lib/actions/responsiveTables';
import { roughNotation } from '$lib/actions/roughNotation';
import ButtonLink from '$lib/components/ui/ButtonLink/ButtonLink.svelte';
import Datetime from '$lib/components/ui/Datetime/Datetime.svelte';
import PostSignature from '$lib/components/ui/PostSignature/PostSignature.svelte';
import TableOfContents from '$lib/components/ui/TableOfContents/TableOfContents.svelte';
import TagLine from '$lib/components/ui/TagLine/TagLine.svelte';
import cfg from '$lib/config';
import type { PageEntry } from '$lib/data/server';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { slugifyStr } from '$lib/tags';
import styles from './+page.module.scss';

let { data }: { data: { posts: PageEntry[] } } = $props();

let slug = $derived(page.params.slug ?? '');
let matching = $derived(data.posts);
let defaultEntry = $derived(matching.find((e) => e.lang === 'en') ?? matching[0]);
let entry = $derived(matching.find((e) => (e.lang ?? 'en') === locale.value) ?? defaultEntry);
let meta = $derived(entry?.metadata ?? { title: '', description: '', pubDatetime: '', tags: [] });
let t = $derived(useTranslations(locale.value));

let tocReady = $state(false);
</script>

<svelte:head>
  {#if meta.title}
    <title>{meta.title} | {cfg.site.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:url" content="{cfg.site.url}/articles/{slug}" />
    <meta property="article:published_time" content={meta.pubDatetime} />
    {#if meta.modDatetime}<meta property="article:modified_time" content={meta.modDatetime} />{/if}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content={meta.title} />
    <meta property="twitter:description" content={meta.description} />
  {/if}
</svelte:head>

{#if entry}
  <div class={styles.page}>
    <header class={styles.contentHeader}>
      <h1 class={styles.title}>{meta.title}</h1>
    </header>

    <div class={styles.toolbar}>
      <nav class={styles.backNav} aria-label={t.post.goBack}>
        <ButtonLink href="/articles">&larr; {t.post.goBack}</ButtonLink>
      </nav>
      <div class={styles.toolbarRight}>
        <Datetime pubDatetime={meta.pubDatetime} modDatetime={meta.modDatetime} size="lg" locale={locale.value} />
      </div>
    </div>

    <article
      class={styles.article}
      use:pencilEdge
      use:copyCode
      use:styleCheckboxes
      use:renderMermaid
      use:renderVegaLite
      use:figureSurfaces
      use:roughNotation
      use:lightboxAction
      use:responsiveTables
    >
      <div class="prose"><entry.component /></div>
      <hr class={styles.hr} />
      <PostSignature location={meta.location} pubDatetime={meta.pubDatetime} />
      <ul class={styles.tags}>
        {#each meta.tags ?? [] as tag}
          <TagLine tag={slugifyStr(tag)} tagName={tag} size="sm" />
        {/each}
      </ul>
    </article>
  </div>

  <!-- Fixed rail, out of flow. Geometry is static CSS (equal insets). -->
  <aside
    class={styles.tocRail}
    data-ready={tocReady ? 'true' : undefined}
    aria-hidden={!tocReady}
  >
    <p class={styles.tocLabel}>{t.post.onThisPage}</p>
    <TableOfContents mode="desktop" onReady={(has) => (tocReady = has)} />
  </aside>

  <!-- Mobile Floating Action Button (FAB) and Drawer -->
  {#if tocReady}
    <TableOfContents mode="mobile" />
  {/if}
{/if}
