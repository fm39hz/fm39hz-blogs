<script lang="ts">
import type { PostMeta } from '$lib/types';

let {
	location,
	pubDatetime,
	lang = 'en',
}: {
	location?: string | null;
	pubDatetime: string;
	lang?: string;
} = $props();

let dateStr = $derived.by(() => {
	const d = new Date(pubDatetime);
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const year = d.getFullYear();
	return `${day}/${month}/${year}`;
});
</script>

<p class="sig">
  {#if lang === 'vi'}
    {location ?? 'Việt Nam'}, {dateStr}
  {:else}
    <strong>{location ?? 'Vietnam'}, {dateStr}</strong>
  {/if}
</p>

<style>
  .sig {
    font-family: var(--font-handwriting);
    font-size: var(--fs-sm);
    color: var(--muted-fg);
    text-align: end;
    margin-block: var(--space-md) 0;
  }
</style>
