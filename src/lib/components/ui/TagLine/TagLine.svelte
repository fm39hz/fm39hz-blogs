<script lang="ts">
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { locale } from '$lib/i18n-state.svelte';
import { getLocalizedPath } from '$lib/utils/localized-url';
import styles from './TagLine.module.scss';

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
    <Icon icon="ph:tag" class={styles[size]} />
    {tagName}
  </a>
</li>
