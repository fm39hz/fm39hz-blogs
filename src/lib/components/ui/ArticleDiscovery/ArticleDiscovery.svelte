<script lang="ts">
import { onDestroy } from 'svelte';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import ContentEntry from '$lib/components/ui/ContentEntry/ContentEntry.svelte';
import RoughHighlight from '$lib/components/ui/RoughHighlight/RoughHighlight.svelte';
import {
	filterArticles,
	parseDiscoveryState,
	type TopicFacet,
} from '$lib/content/article-discovery';
import { articleDiscoveryPath } from '$lib/content/discovery-url';
import type { ArticleCard } from '$lib/content/types';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import styles from './ArticleDiscovery.module.scss';

let {
	articles,
	topics,
	initialTags = [],
}: {
	articles: ArticleCard[];
	topics: TopicFacet[];
	initialTags?: string[];
} = $props();

let t = $derived(useTranslations(locale.value));
let searchTimer: ReturnType<typeof setTimeout> | undefined;
let composing = false;
let popularTopics = $derived(topics.slice(0, 6));
let popularTopicSlugs = $derived(new Set(popularTopics.map(({ tag }) => tag)));
let otherTopics = $derived(topics.filter(({ tag }) => !popularTopicSlugs.has(tag)));
let discoveryState = $derived.by(() => {
	const parsed = parseDiscoveryState(page.url.searchParams, initialTags);
	const knownTags = new Set(topics.map(({ tag }) => tag));
	return { ...parsed, tags: parsed.tags.filter((tag) => knownTags.has(tag)) };
});
const initialQuery = page.url.searchParams.get('q')?.trim() ?? '';
let query = $state(initialQuery);
let synchronizedQuery = $state(initialQuery);
let allTopicsOpen = $state(
	[...page.url.searchParams.getAll('tag'), page.params.tag ?? ''].some(
		(tag) => tag && !popularTopicSlugs.has(tag),
	),
);
let results = $derived(filterArticles(articles, { query, tags: discoveryState.tags }));

$effect(() => {
	if (discoveryState.query !== synchronizedQuery) {
		query = discoveryState.query;
		synchronizedQuery = discoveryState.query;
	}
	if (discoveryState.tags.some((tag) => !popularTopicSlugs.has(tag))) allTopicsOpen = true;
});

onDestroy(() => {
	if (searchTimer) clearTimeout(searchTimer);
});

function targetUrl(next: { query: string; tags: string[] }): URL {
	return new URL(articleDiscoveryPath(next, locale.value), page.url);
}

async function applyState(next: { query: string; tags: string[] }, replace = false) {
	if (searchTimer) clearTimeout(searchTimer);
	synchronizedQuery = next.query.trim();
	await goto(targetUrl(next), { replaceState: replace, keepFocus: true, noScroll: true });
}

function onInput(event: Event) {
	if (!(event.currentTarget instanceof HTMLInputElement)) return;
	query = event.currentTarget.value;
	if (searchTimer) clearTimeout(searchTimer);
	if (composing) return;
	searchTimer = setTimeout(() => {
		void applyState({ query, tags: discoveryState.tags }, true);
	}, 250);
}

function onCompositionStart() {
	composing = true;
	if (searchTimer) clearTimeout(searchTimer);
}

function onCompositionEnd(event: CompositionEvent) {
	composing = false;
	onInput(event);
}

function onSubmit(event: SubmitEvent) {
	event.preventDefault();
	void applyState({ query, tags: discoveryState.tags }, true);
}

function toggleTopic(tag: string) {
	const tags = discoveryState.tags.includes(tag)
		? discoveryState.tags.filter((selected) => selected !== tag)
		: [...discoveryState.tags, tag];
	void applyState({ query, tags });
}

function clearFilters() {
	query = '';
	void applyState({ query: '', tags: [] });
}
</script>

<div class={styles.discovery}>
  <form class={styles.searchForm} role="search" onsubmit={onSubmit}>
    <input
      class={styles.searchInput}
      type="search"
      value={query}
      oninput={onInput}
      oncompositionstart={onCompositionStart}
      oncompositionend={onCompositionEnd}
      placeholder={t.a11y.searchPlaceholder}
      aria-label={t.a11y.searchPlaceholder}
    />
    <button class={styles.searchButton} type="submit">{t.pages.searchTitle}</button>
  </form>

  <section class={styles.topicSection} aria-labelledby="discovery-topics-heading">
    <div class={styles.topicHeader}>
      <h2 id="discovery-topics-heading" class={styles.topicHeading}>{t.discovery.topics}</h2>
      {#if discoveryState.query || discoveryState.tags.length > 0}
        <button class={styles.clearButton} type="button" onclick={clearFilters}>
          {t.discovery.clearFilters}
        </button>
      {/if}
    </div>

    <div class={styles.topicList}>
      {#each popularTopics as topic (topic.tag)}
        <button
          class={[styles.topicButton, discoveryState.tags.includes(topic.tag) && styles.selectedTopic]}
          type="button"
          aria-pressed={discoveryState.tags.includes(topic.tag)}
          onclick={() => toggleTopic(topic.tag)}
        >
          {#if discoveryState.tags.includes(topic.tag)}
            <RoughHighlight seed={topic.tag}>#{topic.name}</RoughHighlight>
          {:else}
            #{topic.name}
          {/if}
        </button>
      {/each}
    </div>

    {#if otherTopics.length > 0}
      <details class={styles.allTopics} bind:open={allTopicsOpen}>
        <summary>{t.discovery.allTopics(otherTopics.length)}</summary>
        <div class={styles.topicList}>
          {#each otherTopics as topic (topic.tag)}
            <button
              class={[styles.topicButton, discoveryState.tags.includes(topic.tag) && styles.selectedTopic]}
              type="button"
              aria-pressed={discoveryState.tags.includes(topic.tag)}
              onclick={() => toggleTopic(topic.tag)}
            >
              {#if discoveryState.tags.includes(topic.tag)}
                <RoughHighlight seed={topic.tag}>#{topic.name}</RoughHighlight>
              {:else}
                #{topic.name}
              {/if}
            </button>
          {/each}
        </div>
      </details>
    {/if}
  </section>

  <p class={styles.resultCount} aria-live="polite">{t.discovery.resultCount(results.length)}</p>
  <div class={styles.results}>
    {#each results as post (post.slug)}
      <ContentEntry {post} activeTags={discoveryState.tags} onTopicToggle={toggleTopic} />
    {:else}
      <p class={styles.emptyState}>{t.a11y.noResults}</p>
    {/each}
  </div>
</div>
