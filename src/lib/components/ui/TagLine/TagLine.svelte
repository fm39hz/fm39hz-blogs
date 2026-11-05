<script lang="ts">
import { articleDiscoveryPath } from '$lib/content/discovery-url';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { locale } from '$lib/i18n-state.svelte';
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
  <a href={articleDiscoveryPath({ query: '', tags: [tag] }, locale.value)} class={styles[size]}>
    <Icon icon="ph:tag" class={`${styles.icon} ${styles[size]}`} />
    {tagName}
  </a>
</li>
