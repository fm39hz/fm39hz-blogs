<script lang="ts">
import cfg from '$lib/config';
import { resolveAuthor } from '$lib/utils/author';
import { formatNumericDate } from '$lib/utils/date';
import styles from './PostSignature.module.scss';

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

<p class={styles.sig}>{author}{location ? `, ${location}` : ''}, {dateStr}</p>
