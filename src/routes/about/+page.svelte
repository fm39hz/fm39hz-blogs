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
	Object.entries(langToTitle).map(([l, t]) => [l, `${t} | ${cfg.site.title}`] as const),
);

let lang = $state('en');
function onToggle(next: string) { lang = next; }
</script>

<svelte:head>
	<title>{fullLangTitles[lang] ?? defaultEntry.metadata.title} | {cfg.site.title}</title>
	<meta name="description" content={defaultEntry.metadata.description} />
</svelte:head>

<section class="py-8">
	<div class="flex items-start justify-between gap-4">
		<LanguageContent {lang}>
			{#each matching as { lang: l }}
				<h1 data-lang={l} style={l !== lang ? 'display:none' : ''} class="text-2xl font-semibold sm:text-3xl">{langToTitle[l]}</h1>
			{/each}
		</LanguageContent>
		<LanguageToggle {lang} {onToggle} />
	</div>
	<LanguageContent {lang}>
		{#each matching as { lang: l, component: Component }}
			<div data-lang={l} style={l !== lang ? 'display:none' : ''} class="app-prose mt-8">
				<Component></Component>
			</div>
		{/each}
	</LanguageContent>
</section>
