<script lang="ts">
import { page } from '$app/state';
import cfg from '$lib/config';
import { loadPageEntries } from '$lib/server';
import Datetime from '$lib/components/Datetime.svelte';
import Tag from '$lib/components/Tag.svelte';
import LanguageToggle from '$lib/components/LanguageToggle.svelte';
import { slugifyStr } from '$lib/tags';
import { animate } from 'motion';

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

$effect(() => {
	for (const el of document.querySelectorAll<HTMLElement>('[data-lang]')) {
		const isEnter = el.getAttribute('data-lang') === lang;
		if (isEnter) {
			el.removeAttribute('hidden');
			const from = lang === 'en' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
			requestAnimationFrame(() => {
				el.style.clipPath = from;
				requestAnimationFrame(() => {
					animate(el, { clipPath: 'inset(0)' }, { duration: 0.4, ease: [0.22, 1, 0.36, 1] });
				});
			});
		} else {
			el.setAttribute('hidden', '');
			el.style.clipPath = '';
		}
	}
});
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

<article class="py-8" data-pagefind-body>
	{#each matching as { lang: l }}
		<h1 data-lang={l} hidden={l !== lang} class="text-accent inline-block text-2xl font-bold sm:text-3xl">{langToTitle[l]}</h1>
	{/each}

	<div class="my-2 flex items-center gap-2">
		<Datetime pubDatetime={meta.pubDatetime} modDatetime={meta.modDatetime} size="lg" />
		{#if hasMultiLang}
			<LanguageToggle {lang} {onToggle} />
		{/if}
	</div>

	{#each matching as { lang: l, component: Component }}
		<div data-lang={l} hidden={l !== lang} class="mt-8 w-full app-prose max-w-app">
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
