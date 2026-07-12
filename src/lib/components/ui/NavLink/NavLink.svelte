<script lang="ts">
import type { Snippet } from 'svelte';
import { page } from '$app/state';
import styles from './NavLink.module.scss';

let {
	href,
	onclick,
	children,
}: {
	href: string;
	onclick?: (e: MouseEvent) => void;
	children?: Snippet;
} = $props();

// Derive active state reactively based on SvelteKit routing pathname
let active = $derived(
	href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href),
);
</script>

<a {href} {onclick} class={`${styles.link} ${active ? styles.active : ''}`}>
  {@render children?.()}
</a>
