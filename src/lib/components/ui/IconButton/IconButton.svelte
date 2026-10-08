<script lang="ts">
import Icon from '$lib/design-system/primitives/Icon.svelte';
import styles from './IconButton.module.scss';

let {
	icon,
	href,
	onclick,
	id,
	style,
	class: className = '',
	iconClass = '',
	ok = false,
	...rest
}: {
	icon: string;
	href?: string;
	onclick?: (e: MouseEvent) => void;
	id?: string;
	style?: string;
	class?: string;
	iconClass?: string;
	/** Success flash (copy grammar). */
	ok?: boolean;
	[key: string]: unknown;
} = $props();
</script>

{#if href}
  <a {href} {onclick} {id} {style} class={`${styles.btn} ${ok ? styles.ok : ''} ${className}`} data-ok={ok ? 'true' : undefined} {...rest}>
    <Icon icon={ok ? 'ph:check' : icon} class={iconClass ? `${styles.icon} ${iconClass}` : styles.icon} />
  </a>
{:else}
  <button type="button" {onclick} {id} {style} class={`${styles.btn} ${ok ? styles.ok : ''} ${className}`} data-ok={ok ? 'true' : undefined} {...rest}>
    <Icon icon={ok ? 'ph:check' : icon} class={iconClass ? `${styles.icon} ${iconClass}` : styles.icon} />
  </button>
{/if}
