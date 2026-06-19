<script lang="ts">
import type { Post } from '$lib/types';
import { formatDate } from '$lib/utils/date';

let { post }: { post: Post } = $props();
</script>

<article class="group border-b border-border py-6 last:border-0">
	<a href="/posts/{post.slug}" class="block">
		<h2 class="text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
			{post.metadata.title}
		</h2>
		<p class="mt-1 text-sm text-muted-foreground">{post.metadata.description}</p>
		<div class="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
			<time datetime={post.metadata.pubDatetime}>{formatDate(post.metadata.pubDatetime)}</time>
			{#if post.metadata.tags}
				<span class="flex gap-2">
					{#each post.metadata.tags as tag}
						<span class="rounded-full bg-muted px-2 py-0.5">#{tag}</span>
					{/each}
				</span>
			{/if}
		</div>
	</a>
</article>
