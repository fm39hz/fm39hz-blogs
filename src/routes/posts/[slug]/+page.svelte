<script lang="ts">
import { page } from '$app/state';
import Datetime from '$lib/components/Datetime.svelte';
import LanguageToggle from '$lib/components/LanguageToggle.svelte';
import Tag from '$lib/components/Tag.svelte';
import cfg from '$lib/config';
import { loadPageEntries } from '$lib/server';
import { slugifyStr } from '$lib/tags';
import { copyCode } from '$lib/actions/copyCode';

const slug = page.params.slug;
const matching = loadPageEntries(slug);
const hasMultiLang = matching.length > 1;
const defaultEntry = matching.find((e) => e.lang === 'en') ?? matching[0];
const meta = defaultEntry.metadata;
const langToTitle = Object.fromEntries(matching.map((e) => [e.lang, e.metadata.title]));
const fullLangTitles = Object.fromEntries(
	Object.entries(langToTitle).map(([l, t]) => [l, `${t} | ${cfg.site.title}`] as const),
);

let preferredLang = $state('en');
</script>

<svelte:head>
	<title>{meta.title} | {cfg.site.title}</title>
	<meta name="title" content="{meta.title} | {cfg.site.title}" />
	<meta name="description" content={meta.description} />
	<meta name="author" content={cfg.site.author} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content={cfg.site.title} />
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

<article class="py-8" data-pagefind-body use:copyCode>
	{#each matching as { lang }}
		<h1 data-lang={lang} hidden={lang !== preferredLang} class="text-accent inline-block text-2xl font-bold sm:text-3xl">{langToTitle[lang]}</h1>
	{/each}

	<div class="my-2 flex items-center gap-2">
		<Datetime pubDatetime={meta.pubDatetime} modDatetime={meta.modDatetime} size="lg" />
		{#if hasMultiLang}
			<LanguageToggle entries={matching} titles={fullLangTitles} bind:preferredLang />
		{/if}
	</div>

	{#each matching as { lang, component: Component }}
		<div data-lang={lang} hidden={lang !== preferredLang} class="mt-8 w-full app-prose max-w-app">
			<Component></Component>
		</div>
	{/each}

	<hr class="my-8 border-dashed" />
	<ul class="mt-4 mb-8 flex flex-wrap gap-4 sm:my-8">
		{#each meta.tags ?? [] as tag}
			<Tag tag={slugifyStr(tag)} tagName={tag} size="sm" />
		{/each}
	</ul>
</article>
