<script lang="ts">
import cfg from '$lib/config';
import { loadContentPages } from '$lib/server';
import LanguageToggle from '$lib/components/LanguageToggle.svelte';
import LanguageContent from '$lib/components/LanguageContent.svelte';

const pages = loadContentPages();
const matching = pages.filter((p) => p.slug === 'about');
const defaultEntry = matching.find((e) => e.lang === 'en') ?? matching[0];
const langToTitle = Object.fromEntries(matching.map((e) => [e.lang, e.metadata.title]));
const fullLangTitles = Object.fromEntries(
  Object.entries(langToTitle).map(([l, t]) => [l, `${t} | ${cfg.site.title}`]),
);

let lang = $state('en');
function onToggle(next: string) { lang = next; }
</script>

<svelte:head>
  <title>{fullLangTitles[lang] ?? defaultEntry.metadata.title} | {cfg.site.title}</title>
  <meta name="description" content={defaultEntry.metadata.description} />
</svelte:head>

<section>
  <div class="header">
    <LanguageContent {lang}>
      {#each matching as { lang: l }}
        <h1 data-lang={l} class="title">{langToTitle[l]}</h1>
      {/each}
    </LanguageContent>
    <LanguageToggle {lang} {onToggle} />
  </div>
  <LanguageContent {lang}>
    {#each matching as { lang: l, component: Component }}
      <div data-lang={l} class="prose">
        <Component></Component>
      </div>
    {/each}
  </LanguageContent>
</section>

<style>
  section { padding: 2rem 0; }
  .header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
  .title { font-size: 1.5rem; font-weight: 600; margin: 0; }
  .prose { margin-top: 2rem; }

  @media (width >= 640px) {
    .title { font-size: 1.875rem; }
  }
</style>
