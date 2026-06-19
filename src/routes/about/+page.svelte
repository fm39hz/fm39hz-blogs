<script lang="ts">
import LanguageToggle from '$lib/components/LanguageToggle.svelte';
import cfg from '$lib/config';
import { loadContentPages } from '$lib/server';
const pages = loadContentPages();
const matching = pages.filter((p) => p.slug === 'about');
const defaultEntry = matching.find((e) => e.lang === 'en') ?? matching[0];
const hasMultiLang = matching.length > 1;
const langToTitle = Object.fromEntries(matching.map((e) => [e.lang, e.metadata.title]));
const fullLangTitles = Object.fromEntries(
	Object.entries(langToTitle).map(([l, t]) => [l, `${t} | ${cfg.site.title}`] as const),
);

let preferredLang = $state('en');
</script>

<svelte:head>
	<title>{langToTitle['en'] ?? defaultEntry.metadata.title} | {cfg.site.title}</title>
	<meta name="description" content={defaultEntry.metadata.description} />
</svelte:head>

<section class="py-8">
	<div class="flex items-start justify-between gap-4">
		<div>
			{#each matching as { lang }}
				<h1 data-lang={lang} hidden={lang !== preferredLang} class="text-2xl font-semibold sm:text-3xl">{langToTitle[lang]}</h1>
			{/each}
		</div>
		{#if hasMultiLang}
			<LanguageToggle entries={matching} titles={fullLangTitles} bind:preferredLang />
		{/if}
	</div>
	{#each matching as { lang, component: Component, metadata: m }}
		<div data-lang={lang} hidden={lang !== preferredLang} class="app-prose mt-8">
			<Component></Component>
		</div>
	{/each}
</section>
