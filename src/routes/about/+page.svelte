<script lang="ts">
import LanguageContent from '$lib/components/ui/LanguageContent/LanguageContent.svelte';
import LanguageToggle from '$lib/components/ui/LanguageToggle/LanguageToggle.svelte';
import cfg from '$lib/config';
import { loadContentPages } from '$lib/data/server';
import styles from './+page.module.scss';

const pages = loadContentPages();
const matching = pages.filter((p) => p.slug === 'about');
const defaultEntry = matching.find((e) => e.lang === 'en') ?? matching[0];
const langToTitle = Object.fromEntries(matching.map((e) => [e.lang, e.metadata.title]));
const fullLangTitles = Object.fromEntries(
	Object.entries(langToTitle).map(([l, t]) => [l, `${t} | ${cfg.site.title}`]),
);

let lang = $state('en');
function onToggle(next: string) {
	lang = next;
}
</script>

<svelte:head><title>{fullLangTitles[lang] ?? defaultEntry.metadata.title} | {cfg.site.title}</title><meta name="description" content={defaultEntry.metadata.description} /></svelte:head>

<section>
  <div class={styles.header}>
    <LanguageContent {lang}>
      {#each matching as { lang: l }}<h1 data-lang={l} class={styles.title}>{langToTitle[l]}</h1>{/each}
    </LanguageContent>
    <LanguageToggle {lang} {onToggle} />
  </div>
  <LanguageContent {lang}>
    {#each matching as { lang: l, component: Component }}<div data-lang={l} class="prose"><Component /></div>{/each}
  </LanguageContent>
</section>
