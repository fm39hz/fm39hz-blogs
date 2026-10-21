<script lang="ts">
import cfg from '$lib/config';
import { resolveAuthor } from '$lib/utils/author';
import { formatNumericDate } from '$lib/utils/date';

let {
	author: authorProp,
	location,
	pubDatetime,
}: {
	author?: string | null;
	location?: string | null;
	pubDatetime: string;
} = $props();

let dateStr = $derived(formatNumericDate(pubDatetime, cfg.site.timezone));

let author = $derived(resolveAuthor({ author: authorProp ?? undefined }));
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
