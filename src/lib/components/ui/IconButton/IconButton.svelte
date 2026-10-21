<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import styles from './IconButton.module.scss';

/** Icon-only control: a link when `href` is set, otherwise a button. */
let {
	icon,
	href,
	class: className,
	iconClass,
	ok = false,
	...rest
}: HTMLAttributes<HTMLElement> & {
	icon: string;
	href?: string;
	iconClass?: string;
	/** Success flash (copy grammar). */
	ok?: boolean;
} = $props();
</script>

{#if href}
  <a {href} class={[styles.btn, ok && styles.ok, className]} data-ok={ok || undefined} {...rest}>
    <Icon icon={ok ? 'ph:check' : icon} class={iconClass ? `${styles.icon} ${iconClass}` : styles.icon} />
  </a>
{:else}
  <button type="button" class={[styles.btn, ok && styles.ok, className]} data-ok={ok || undefined} {...rest}>
    <Icon icon={ok ? 'ph:check' : icon} class={iconClass ? `${styles.icon} ${iconClass}` : styles.icon} />
  </button>
{/if}
