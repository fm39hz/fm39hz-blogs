<script lang="ts">
import cfg from '$lib/config';
import { loadContentPages } from '$lib/server';
import LanguageToggle from '$lib/components/LanguageToggle.svelte';
import { animate } from 'motion';

const pages = loadContentPages();
const matching = pages.filter((p) => p.slug === 'about');
const defaultEntry = matching.find((e) => e.lang === 'en') ?? matching[0];
const langToTitle = Object.fromEntries(matching.map((e) => [e.lang, e.metadata.title]));
const fullLangTitles = Object.fromEntries(
	Object.entries(langToTitle).map(([l, t]) => [l, `${t} | ${cfg.site.title}`] as const),
);

let lang = $state('en');

function onToggle(next: string) {
	lang = next;
}

let prevLang = $state('en');

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
	<title>{fullLangTitles[lang] ?? defaultEntry.metadata.title} | {cfg.site.title}</title>
	<meta name="description" content={defaultEntry.metadata.description} />
</svelte:head>

<section class="py-8">
	<div class="flex items-start justify-between gap-4">
		<div>
			{#each matching as { lang: l }}
				<h1 data-lang={l} hidden={l !== lang} class="text-2xl font-semibold sm:text-3xl">{langToTitle[l]}</h1>
			{/each}
		</div>
		<LanguageToggle {lang} {onToggle} />
	</div>
	{#each matching as { lang: l, component: Component }}
		<div data-lang={l} hidden={l !== lang} class="app-prose mt-8">
			<Component></Component>
		</div>
	{/each}
</section>
