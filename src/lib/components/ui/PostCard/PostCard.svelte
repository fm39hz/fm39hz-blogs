<script lang="ts">
import cfg from '$lib/config';
import { locale } from '$lib/i18n-state.svelte';
import { slugifyStr } from '$lib/tags';
import { formatDate } from '$lib/utils/date';
import ButtonLink from '../ButtonLink/ButtonLink.svelte';
import TagPill from '../TagPill/TagPill.svelte';
import styles from './PostCard.module.scss';

let {
	post,
}: {
	post: {
		slug: string;
		metadata: { title: string; description: string; pubDatetime: string; tags?: string[] };
	};
} = $props();
</script>

<article class={styles.card}>
  <h2>
    <ButtonLink href="/articles/{post.slug}">
      {post.metadata.title}
    </ButtonLink>
  </h2>
  <p>{post.metadata.description}</p>
  <div class={styles.meta}>
    <time datetime={post.metadata.pubDatetime}>{formatDate(post.metadata.pubDatetime, cfg.site.timezone, locale.value)}</time>
    {#if post.metadata.tags}
      <ul class={styles.tags}>
        {#each post.metadata.tags as tag}
          <TagPill tag={slugifyStr(tag)} tagName={tag} size="sm" />
        {/each}
      </ul>
    {/if}
  </div>
</article>
