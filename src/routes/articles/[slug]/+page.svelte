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
import IconButton from '$lib/components/ui/IconButton/IconButton.svelte';
import PostSignature from '$lib/components/ui/PostSignature/PostSignature.svelte';
import TableOfContents from '$lib/components/ui/TableOfContents/TableOfContents.svelte';
import TagLine from '$lib/components/ui/TagLine/TagLine.svelte';
import cfg from '$lib/config';
import type { PageEntry } from '$lib/data/server';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { globalToaster } from '$lib/state/toast.svelte';
import { slugifyStr } from '$lib/tags';
import { absoluteUrl, stripFrontmatter } from '$lib/utils/markdown';
import styles from './+page.module.scss';

let { data }: { data: { posts: PageEntry[] } } = $props();

let slug = $derived(page.params.slug ?? '');
let matching = $derived(data.posts);
let defaultEntry = $derived(matching.find((e) => e.lang === 'en') ?? matching[0]);
let entry = $derived(matching.find((e) => (e.lang ?? 'en') === locale.value) ?? defaultEntry);
let meta = $derived(entry?.metadata ?? { title: '', description: '', pubDatetime: '', tags: [] });
let t = $derived(useTranslations(locale.value));

let author = $derived(meta.author || cfg.site.author);
let canonical = $derived(
	meta.canonicalURL
		? absoluteUrl(cfg.site.url, meta.canonicalURL)
		: `${cfg.site.url}/articles/${slug}`,
);
let ogImage = $derived(
	absoluteUrl(cfg.site.url, meta.ogImage || cfg.site.ogImage || '/favicon.png'),
);
let jsonLd = $derived(
	JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: meta.title,
		description: meta.description,
		datePublished: meta.pubDatetime,
		...(meta.modDatetime ? { dateModified: meta.modDatetime } : {}),
		author: {
			'@type': 'Person',
			name: author,
			...(cfg.site.profile ? { url: cfg.site.profile } : {}),
		},
		image: [ogImage],
		mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
		url: canonical,
	}),
);

let tocReady = $state(false);

async function copyMarkdown() {
	if (!entry?.raw) return;
	try {
		await navigator.clipboard.writeText(stripFrontmatter(entry.raw));
		globalToaster.addToast({ data: t.post.copiedMarkdown });
	} catch {
		/* clipboard denied — silent */
	}
}
</script>

<svelte:head>
  {#if meta.title}
    <title>{meta.title} | {cfg.site.title}</title>
    <meta name="description" content={meta.description} />
    <meta name="author" content={author} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta property="article:author" content={author} />
    <meta property="article:published_time" content={meta.pubDatetime} />
    {#if meta.modDatetime}<meta property="article:modified_time" content={meta.modDatetime} />{/if}
    {#each meta.tags ?? [] as tag}
      <meta property="article:tag" content={tag} />
    {/each}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content={meta.title} />
    <meta property="twitter:description" content={meta.description} />
    <meta property="twitter:image" content={ogImage} />
    {@html `<script type="application/ld+json">${jsonLd}</script>`}
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
        <IconButton
          icon="ph:markdown-logo"
          onclick={copyMarkdown}
          title={t.a11y.copyMarkdown}
          aria-label={t.a11y.copyMarkdown}
        />
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
      <PostSignature author={author} location={meta.location} pubDatetime={meta.pubDatetime} />
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
