<script lang="ts">
import { page } from '$app/state';
import CopyButton from '$lib/components/ui/CopyButton/CopyButton.svelte';
import { imageToPng } from '$lib/scrap/model';
import type { ArticleImageProps } from '../contract';
import styles from './ArticleImage.module.scss';

/** Prose image emitted by `rehypeImages` (see contract.ts). */
let { src, alt = '', title }: ArticleImageProps = $props();

// Same resolution the browser uses for the rendered <img>, so the copied link
// points at the asset the reader is looking at (page URL, not the site root).
let absolute = $derived(new URL(src, page.url).href);
let markdown = $derived(
	`![${alt.replaceAll(']', '\\]')}](${/[\s()]/.test(absolute) ? `<${absolute}>` : absolute}${title ? ` "${title}"` : ''})`,
);
</script>

<span class={styles.image} data-image>
  <img {src} {alt} {title} />
  <CopyButton kind="image" pinned payload={{ text: markdown, image: () => imageToPng(absolute) }} />
</span>
