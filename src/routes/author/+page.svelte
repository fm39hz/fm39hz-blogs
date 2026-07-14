<script lang="ts">
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import type { AuthorPageEntry } from './+page';
import styles from './+page.module.scss';

let { data }: { data: { entries: AuthorPageEntry[] } } = $props();

let matching = $derived(data.entries);
let defaultEntry = $derived(matching.find((e) => e.lang === 'en') ?? matching[0]);
let langToTitle = $derived(Object.fromEntries(matching.map((e) => [e.lang, e.metadata.title])));
let fullLangTitles = $derived(
	Object.fromEntries(
		Object.entries(langToTitle).map(([l, t]) => [l, `${t} | ${cfg.site.title}`]),
	),
);
let t = $derived(useTranslations(locale.value));
let entry = $derived(matching.find((e) => (e.lang ?? 'en') === locale.value) ?? defaultEntry);
</script>

<svelte:head>
  <title>{fullLangTitles[locale.value] ?? defaultEntry.metadata.title} | {cfg.site.title}</title>
  <meta name="description" content={entry.metadata.description} />
</svelte:head>

<div class={styles.root}>
  <div class={styles.header}>
    <h1 class={styles.title}>{langToTitle[locale.value] ?? defaultEntry.metadata.title}</h1>
  </div>
  <div class="prose"><entry.component /></div>
</div>
