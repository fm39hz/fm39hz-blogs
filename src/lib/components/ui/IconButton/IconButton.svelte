<script lang="ts">
import Icon from '@iconify/svelte';
import styles from './IconButton.module.scss';

let {
	icon,
	href,
	onclick,
	id,
	style,
	class: className = '',
	ok = false,
	...rest
}: {
	icon: string;
	href?: string;
	onclick?: (e: MouseEvent) => void;
	id?: string;
	style?: string;
	class?: string;
	/** Success flash (copy grammar). */
	ok?: boolean;
	[key: string]: unknown;
} = $props();
</script>

{#if href}
  <a {href} {onclick} {id} {style} class={`${styles.btn} ${ok ? styles.ok : ''} ${className}`} data-ok={ok ? 'true' : undefined} {...rest}>
    <Icon icon={ok ? 'ph:check' : icon} />
  </a>
{:else}
  <button type="button" {onclick} {id} {style} class={`${styles.btn} ${ok ? styles.ok : ''} ${className}`} data-ok={ok ? 'true' : undefined} {...rest}>
    <Icon icon={ok ? 'ph:check' : icon} />
  </button>
{/if}
