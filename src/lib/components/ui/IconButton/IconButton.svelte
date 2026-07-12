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
	...rest
}: {
	icon: string;
	href?: string;
	onclick?: (e: MouseEvent) => void;
	id?: string;
	style?: string;
	class?: string;
	[key: string]: unknown;
} = $props();
</script>

{#if href}
  <a {href} {onclick} {id} {style} class={`${styles.btn} ${className}`} {...rest}>
    <Icon {icon} />
  </a>
{:else}
  <button type="button" {onclick} {id} {style} class={`${styles.btn} ${className}`} {...rest}>
    <Icon {icon} />
  </button>
{/if}
