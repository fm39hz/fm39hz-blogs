<script lang="ts">
import { formatDate } from '$lib/utils/date';

let { post }: { post: { slug: string; metadata: { title: string; description: string; pubDatetime: string; tags?: string[] } } } = $props();
</script>

<article class="post-card">
  <a href="/posts/{post.slug}">
    <h2>{post.metadata.title}</h2>
    <p>{post.metadata.description}</p>
    <div class="meta">
      <time datetime={post.metadata.pubDatetime}>{formatDate(post.metadata.pubDatetime)}</time>
      {#if post.metadata.tags}
        <span class="tags">
          {#each post.metadata.tags as tag}
            <span>#{tag}</span>
          {/each}
        </span>
      {/if}
    </div>
  </a>
</article>

<style>
  .post-card { border-bottom: 1px solid var(--border); padding: 1.5rem 0; }
  .post-card:last-child { border: none; }
  .post-card a { text-decoration: none; color: var(--fg); display: block; }
  .post-card h2 { font-size: 1.25rem; font-weight: 600; margin: 0; }
  .post-card a:hover h2 { color: var(--accent); }
  .post-card p { margin: 0.25rem 0; font-size: 0.875rem; color: var(--muted-fg); }
  .post-card .meta { margin-top: 0.5rem; display: flex; align-items: center; gap: 0.75rem; font-size: 0.75rem; color: var(--muted-fg); }
  .post-card .tags { display: flex; gap: 0.5rem; }
  .post-card .tags span { background: var(--muted); padding: 0.125rem 0.5rem; border-radius: 999px; }
</style>
