<script lang="ts">
import RoughHighlight from '$lib/components/ui/RoughHighlight/RoughHighlight.svelte';
import type { ArticleCard } from '$lib/content/types';
import { locale } from '$lib/i18n-state.svelte';
import { slugifyStr } from '$lib/tags';
import { articlePath } from '$lib/utils/localized-url';
import ButtonLink from '../ButtonLink/ButtonLink.svelte';
import styles from './ContentEntry.module.scss';

let {
	post,
	activeTags = [],
	onTopicToggle,
}: {
	post: ArticleCard;
	activeTags?: string[];
	onTopicToggle?: (tag: string) => void;
} = $props();
</script>

<article class={styles.entry} lang={post.metadata.lang}>
  <h2 class={styles.titleWrap}>
    <ButtonLink href={articlePath(post.slug, post.metadata.lang)}>{post.metadata.title}</ButtonLink>
    {#if onTopicToggle && post.metadata.tags.length > 0}
      <span class={styles.topics}>
        {#each post.metadata.tags as tagName (tagName)}
          {@const tag = slugifyStr(tagName)}
          <button
            class={styles.topic}
            type="button"
            aria-pressed={activeTags.includes(tag)}
            onclick={() => onTopicToggle(tag)}
          >
            {#if activeTags.includes(tag)}
              <RoughHighlight seed={tag}>#{tagName}</RoughHighlight>
            {:else}
              #{tagName}
            {/if}
          </button>
        {/each}
      </span>
    {/if}
  </h2>
  <p class={styles.desc}>{post.metadata.description}</p>
</article>
