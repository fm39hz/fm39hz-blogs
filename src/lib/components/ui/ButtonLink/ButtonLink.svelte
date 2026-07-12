<script lang="ts">
import type { Snippet } from 'svelte';
import styles from './ButtonLink.module.scss';

let {
	href,
	children,
	class: className = '',
}: { href: string; children?: Snippet; class?: string } = $props();
</script>

<a {href} class={`${styles.link} ${className}`}>{@render children?.()}</a>
