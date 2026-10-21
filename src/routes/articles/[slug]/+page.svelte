<script lang="ts">
import { afterNavigate } from '$app/navigation';
import { page } from '$app/state';
// checkboxes replaced by build-time rehype plugin
import ButtonLink from '$lib/components/ui/ButtonLink/ButtonLink.svelte';
import Datetime from '$lib/components/ui/Datetime/Datetime.svelte';
import IconButton from '$lib/components/ui/IconButton/IconButton.svelte';
import PostSignature from '$lib/components/ui/PostSignature/PostSignature.svelte';
import TableOfContents from '$lib/components/ui/TableOfContents/TableOfContents.svelte';
import { tocHeadings } from '$lib/components/ui/TableOfContents/toc.svelte';
import TagLine from '$lib/components/ui/TagLine/TagLine.svelte';
import cfg from '$lib/config';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { lightbox } from '$lib/state/lightbox.svelte';
import { slugifyStr } from '$lib/tags';
import { arrivalPath } from '$lib/utils/back-link';
import { copyWithFeedback } from '$lib/utils/clipboard';
import { getLocalizedPath } from '$lib/utils/localized-url';
import { buildCopyMarkdown } from '$lib/utils/markdown';
import { buildPostSeo } from '$lib/utils/seo';
import { articleUrl } from '$lib/utils/site';
import styles from './+page.module.scss';
import type { PageProps } from './$types';

let { data }: PageProps = $props();

let slug = $derived(page.params.slug ?? '');
let entry = $derived(data.article);
let meta = $derived(entry?.metadata ?? { title: '', description: '', pubDatetime: '', tags: [] });
let t = $derived(useTranslations(locale.value));
let seo = $derived(meta.title ? buildPostSeo(meta, slug, entry.lang) : null);

let toc = $derived(tocHeadings(meta.headings));
let tocReady = $derived(toc.length > 0);
let copiedMd = $state(false);
let proseEl = $state<HTMLElement | null>(null);
// In-app page the reader arrived from; null → the article list (direct entry, reload).
let origin = $state<string | null>(null);
// Re-localized so a language switch on the article keeps the back target in that language.
let backHref = $derived(getLocalizedPath(origin ?? '/articles', locale.value));

afterNavigate(({ from, to }) => {
	const path = arrivalPath(from, to?.params?.slug);
	if (path) origin = path;
});

async function onCopyMarkdown() {
	if (!entry?.raw || !meta) return;
	const text = buildCopyMarkdown(
		{
			title: meta.title,
			description: meta.description,
			author: meta.author,
			pubDatetime: meta.pubDatetime,
			tags: meta.tags,
			sourceUrl: seo?.canonical,
			lang: entry.lang,
			headings: meta.headings ?? [],
		},
		entry.raw,
	);
	await copyWithFeedback(text, {
		toast: t.post.copiedMarkdown,
		setCopied: (v) => {
			copiedMd = v;
		},
	});
}

function onArticleClick(event: MouseEvent) {
	if (!(event.target instanceof HTMLImageElement) || !proseEl?.contains(event.target)) return;
	lightbox.src = event.target.currentSrc || event.target.src;
	lightbox.alt = event.target.alt;
	lightbox.dialog.open = true;
}
</script>

<svelte:document onclick={onArticleClick} />

<svelte:head>
  {#if seo}
    <title>{seo.title} | {cfg.site.title}</title>
    <meta name="description" content={seo.description} />
    <meta name="author" content={seo.author} />
    <link rel="canonical" href={seo.canonical} />
	{#each data.translations as translation}
      <link rel="alternate" hreflang={translation.lang} href={articleUrl(slug, translation.lang)} />
    {/each}
    <meta property="og:type" content="article" />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    <meta property="og:url" content={seo.canonical} />
    <meta property="og:image" content={seo.ogImage} />
    <meta property="article:author" content={seo.author} />
    <meta property="article:published_time" content={seo.pubDatetime} />
    {#if seo.modDatetime}<meta property="article:modified_time" content={seo.modDatetime} />{/if}
    {#each seo.tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content={seo.title} />
    <meta property="twitter:description" content={seo.description} />
    <meta property="twitter:image" content={seo.ogImage} />
    {@html `<script type="application/ld+json">${seo.jsonLd}</script>`}
  {/if}
</svelte:head>

{#if entry && seo}
  <div class={styles.page}>
    <header class={styles.contentHeader}>
      <h1 class={styles.title}>{seo.title}</h1>
    </header>

    <div class={styles.toolbar}>
      <nav class={styles.backNav} aria-label={t.post.goBack}>
        <ButtonLink href={backHref}><Icon icon="ph:arrow-left" class={styles.backIcon} /> {t.post.goBack}</ButtonLink>
      </nav>
      <div class={styles.toolbarRight}>
        <Datetime pubDatetime={meta.pubDatetime} modDatetime={meta.modDatetime} size="lg" locale={locale.value} />
        <IconButton
          icon="ph:markdown-logo"
          onclick={onCopyMarkdown}
          ok={copiedMd}
          title={t.a11y.copyMarkdown}
          aria-label={t.a11y.copyMarkdown}
        />
      </div>
    </div>

    <article class={styles.article} lang={entry.lang}>
      <div class="prose" bind:this={proseEl}><entry.component /></div>
      <hr class={styles.hr} />
      <PostSignature author={seo.author} location={meta.location} pubDatetime={meta.pubDatetime} />
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
    <TableOfContents mode="desktop" headings={toc} />
  </aside>

  <!-- Mobile Floating Action Button (FAB) and Drawer -->
  {#if tocReady}
    <TableOfContents mode="mobile" headings={toc} />
  {/if}
{/if}
