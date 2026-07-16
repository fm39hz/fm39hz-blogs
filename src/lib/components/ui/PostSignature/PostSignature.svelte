<script lang="ts">
import cfg from '$lib/config';

let {
	author: authorProp,
	location,
	pubDatetime,
}: {
	author?: string | null;
	location?: string | null;
	pubDatetime: string;
} = $props();

let dateStr = $derived.by(() => {
	const d = new Date(pubDatetime);
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const year = d.getFullYear();
	return `${day}/${month}/${year}`;
});

let author = $derived(authorProp || cfg.site.author);
</script>

<p class="sig">{author}{location ? `, ${location}` : ''}, {dateStr}</p>

<style>
  .sig {
    font-family: var(--font-handwriting);
    font-size: var(--fs-sm);
    color: var(--muted-fg);
    text-align: end;
    margin-block: var(--space-md) 0;
  }
</style>
