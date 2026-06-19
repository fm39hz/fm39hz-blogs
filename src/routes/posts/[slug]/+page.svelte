<script lang="ts">
import { page } from '$app/state';
import { copyCode } from '$lib/actions/copyCode';
import Datetime from '$lib/components/ui/Datetime/Datetime.svelte';
import LanguageContent from '$lib/components/ui/LanguageContent/LanguageContent.svelte';
import LanguageToggle from '$lib/components/ui/LanguageToggle/LanguageToggle.svelte';
import Tag from '$lib/components/ui/Tag/Tag.svelte';
import cfg from '$lib/config';
import { loadPageEntries } from '$lib/server';
import { slugifyStr } from '$lib/tags';
import styles from './+page.module.scss';

const slug = page.params.slug;
const matching = loadPageEntries(slug);
const hasMultiLang = matching.length > 1;
const defaultEntry = matching.find((e) => e.lang === 'en') ?? matching[0];
const meta = defaultEntry.metadata;
const langToTitle = Object.fromEntries(matching.map((e) => [e.lang, e.metadata.title]));
let lang = $state('en');
function onToggle(next: string) {
	lang = next;
}
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

<article use:copyCode>
  <LanguageContent {lang}>
    {#each matching as { lang: l }}<h1 data-lang={l} class={styles.title}>{langToTitle[l]}</h1>{/each}
  </LanguageContent>
  <div class={styles.meta}>
    <Datetime pubDatetime={meta.pubDatetime} modDatetime={meta.modDatetime} size="lg" />
    {#if hasMultiLang}<LanguageToggle {lang} {onToggle} />{/if}
  </div>
  <LanguageContent {lang}>
    {#each matching as { lang: l, component: Component }}<div data-lang={l} class="prose"><Component /></div>{/each}
  </LanguageContent>
  <hr class={styles.hr} />
  <ul class={styles.tags}>{#each meta.tags ?? [] as tag}<Tag tag={slugifyStr(tag)} tagName={tag} size="sm" />{/each}</ul>
</article>
