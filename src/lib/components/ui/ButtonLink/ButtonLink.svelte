<script lang="ts">
import type { Snippet } from 'svelte';
import styles from './ButtonLink.module.scss';

let { href, children }: { href: string; children?: Snippet } = $props();
</script>

<a {href} class={styles.link}>{@render children?.()}</a>
