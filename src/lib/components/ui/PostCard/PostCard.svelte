<script lang="ts">
import { formatDate } from '$lib/utils/date';
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
  <a href="/logs/{post.slug}">
    <h2>{post.metadata.title}</h2>
    <p>{post.metadata.description}</p>
    <div class={styles.meta}>
      <time datetime={post.metadata.pubDatetime}>{formatDate(post.metadata.pubDatetime)}</time>
      {#if post.metadata.tags}
        <span class={styles.tags}>
          {#each post.metadata.tags as tag}
            <span>#{tag}</span>
          {/each}
        </span>
      {/if}
    </div>
  </a>
</article>
