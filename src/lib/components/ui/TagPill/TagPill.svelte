<script lang="ts">
import RoughHighlight from '$lib/components/ui/RoughHighlight/RoughHighlight.svelte';
import { locale } from '$lib/i18n-state.svelte';
import { getLocalizedPath } from '$lib/utils/localized-url';
import styles from './TagPill.module.scss';

let {
	tag,
	tagName,
	size = 'lg',
}: {
	tag: string;
	tagName: string;
	size?: 'sm' | 'lg';
} = $props();
</script>

<li class={styles.tag}>
  <a href={getLocalizedPath(`/topics/${tag}/`, locale.value)} class={styles[size]}>
    <RoughHighlight seed={tag}>#{tagName}</RoughHighlight>
  </a>
</li>
