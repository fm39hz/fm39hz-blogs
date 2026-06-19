<script lang="ts">
import { page } from '$app/state';
import cfg from '$lib/config';
import { loadPageEntries } from '$lib/server';
import Datetime from '$lib/components/Datetime.svelte';
import Tag from '$lib/components/Tag.svelte';
import LanguageToggle from '$lib/components/LanguageToggle.svelte';
import LanguageContent from '$lib/components/LanguageContent.svelte';
import { slugifyStr } from '$lib/tags';
import { copyCode } from '$lib/actions/copyCode';

const slug = page.params.slug;
const matching = loadPageEntries(slug);
const hasMultiLang = matching.length > 1;
const defaultEntry = matching.find((e) => e.lang === 'en') ?? matching[0];
const meta = defaultEntry.metadata;
const langToTitle = Object.fromEntries(matching.map((e) => [e.lang, e.metadata.title]));

let lang = $state('en');
function onToggle(next: string) { lang = next; }
</script>

<svelte:head>
  <title>{meta.title} | {cfg.site.title}</title>
  <meta name="description" content={meta.description} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content="{cfg.site.url}/posts/{slug}" />
  <meta property="article:published_time" content={meta.pubDatetime} />
  {#if meta.modDatetime}
    <meta property="article:modified_time" content={meta.modDatetime} />
  {/if}
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={meta.title} />
  <meta property="twitter:description" content={meta.description} />
</svelte:head>

<article use:copyCode>
  <LanguageContent {lang}>
    {#each matching as { lang: l }}
      <h1 data-lang={l} class="title">{langToTitle[l]}</h1>
    {/each}
  </LanguageContent>

  <div class="meta">
    <Datetime pubDatetime={meta.pubDatetime} modDatetime={meta.modDatetime} size="lg" />
    {#if hasMultiLang}
      <LanguageToggle {lang} {onToggle} />
    {/if}
  </div>

  <LanguageContent {lang}>
    {#each matching as { lang: l, component: Component }}
      <div data-lang={l} class="prose">
        <Component></Component>
      </div>
    {/each}
  </LanguageContent>

  <hr />
  <ul class="tags">
    {#each meta.tags ?? [] as tag}
      <Tag tag={slugifyStr(tag)} tagName={tag} size="sm" />
    {/each}
  </ul>
</article>

<style>
  article { padding: 2rem 0; }
  .title { color: var(--accent); display: inline-block; font-size: 1.5rem; font-weight: 700; }
  .meta { margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem; }
  .prose { margin-top: 2rem; width: 100%; }
  hr { margin: 2rem 0; border: none; border-top: 1px dashed var(--border); }
  .tags { list-style: none; padding: 0; margin: 1rem 0 2rem; display: flex; flex-wrap: wrap; gap: 1rem; }

  @media (width >= 640px) {
    .title { font-size: 1.875rem; }
    .tags { margin: 2rem 0; }
  }
</style>
