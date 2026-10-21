<script module lang="ts">
/**
 * mdsvex layout for every Markdown file. Named exports are the Svelte
 * components content renders through: mdsvex swaps matching elements for
 * `Components.<name>`, and the highlighter emits `Components.Figure` /
 * `Components.CodeBlock` directly. Content stays Svelte-owned — no post-mount
 * DOM enhancement.
 */

export { default as TableCardStack } from '../ui/TableCardStack/TableCardStack.svelte';
export { default as blockquote } from './Blockquote.svelte';
export { default as CodeBlock } from './CodeBlock/CodeBlock.svelte';
export { default as Figure } from './Figure/Figure.svelte';
</script>

<script lang="ts">
import type { Snippet } from 'svelte';

let { children }: { children?: Snippet } = $props();
</script>

{@render children?.()}
